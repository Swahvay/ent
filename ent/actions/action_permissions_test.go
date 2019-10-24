package actions_test

import (
	"testing"

	"github.com/iancoleman/strcase"
	"github.com/lolopinto/ent/ent"
	"github.com/lolopinto/ent/ent/actions"
	"github.com/lolopinto/ent/ent/privacy"
	"github.com/lolopinto/ent/internal/test_schema/models"
	"github.com/lolopinto/ent/internal/test_schema/models/configs"
	"github.com/lolopinto/ent/ent/viewer"
	"github.com/lolopinto/ent/ent/viewertesting"
	"github.com/lolopinto/ent/internal/testingutils"
	"github.com/lolopinto/ent/internal/util"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type userAction struct {
	viewer       viewer.ViewerContext
	emailAddress string
	firstName    string
	lastName     string
	user         models.User
}

func (a *userAction) GetViewer() viewer.ViewerContext {
	return a.viewer
}

func (a *userAction) getFields() map[string]interface{} {
	m := make(map[string]interface{})
	m["EmailAddress"] = a.emailAddress
	m["FirstName"] = a.firstName
	m["LastName"] = a.lastName
	return m
}

func (a *userAction) Entity() ent.Entity {
	return &a.user
}

func (a *userAction) getChangeset(operation ent.WriteOperation, existingEnt ent.Entity) (ent.Changeset, error) {
	builder := a.GetBuilder(operation, existingEnt)
	for k, v := range a.getFields() {
		builder.SetField(k, v)
	}
	builder.FieldMap = getFieldMapFromFields(builder.Operation, a.getFields())
	return builder.GetChangeset(&a.user)
}

func (a *userAction) GetBuilder(
	operation ent.WriteOperation,
	existingEnt ent.Entity,
) actions.EntMutationBuilder {
	return actions.EntMutationBuilder{
		Viewer:         a.viewer,
		ExistingEntity: existingEnt,
		Operation:      operation,
		EntConfig:      &configs.UserConfig{},
	}
}

type createUserAction struct {
	userAction
}

func (a *createUserAction) GetChangeset() (ent.Changeset, error) {
	return a.getChangeset(ent.InsertOperation, nil)
}

func (a *createUserAction) GetPrivacyPolicy() ent.PrivacyPolicy {
	return privacy.InlinePrivacyPolicy{
		privacy.Rules(
			privacy.AlwaysAllowRule{},
		),
		&a.user,
	}
}

var _ actions.ActionWithPermissions = &createUserAction{}

type editUserAction struct {
	userAction
	existingEnt models.User
}

func (a *editUserAction) GetChangeset() (ent.Changeset, error) {
	return a.getChangeset(ent.EditOperation, &a.existingEnt)
}

func (a *editUserAction) GetPrivacyPolicy() ent.PrivacyPolicy {
	return privacy.InlinePrivacyPolicy{
		privacy.Rules(
			privacy.AllowIfViewerIsOwnerRule{a.existingEnt.ID},
			privacy.AlwaysDenyRule{},
		),
		&a.user,
	}
}

var _ actions.ActionWithPermissions = &editUserAction{}

type actionsPermissionsSuite struct {
	testingutils.Suite
}

func (suite *actionsPermissionsSuite) SetupSuite() {
	suite.Tables = []string{
		"users",
	}
	suite.Suite.SetupSuite()
}

func createUser(v viewer.ViewerContext) (createUserAction, error) {
	action := createUserAction{}
	action.viewer = v
	action.firstName = "Ola"
	action.lastName = "Okelola"
	action.emailAddress = util.GenerateRandEmail()

	err := actions.Save(&action)
	return action, err
}

func (suite *actionsPermissionsSuite) TestCreatePrivacy() {
	var testCases = []struct {
		viewer   viewer.ViewerContext
		allowed  bool
		testCase string
	}{
		{
			viewertesting.OmniViewerContext{},
			true,
			"omni viewer context",
		},
		{
			viewertesting.LoggedinViewerContext{},
			true,
			"logged in viewer context",
		},
		{
			viewer.LoggedOutViewer(),
			true,
			"logged out viewer context",
		},
	}

	for _, tt := range testCases {
		action, err := createUser(tt.viewer)
		if tt.allowed {
			assert.Nil(suite.T(), err)
			assert.NotZero(suite.T(), action.user)
		} else {
			assert.NotNil(suite.T(), err)
			assert.Zero(suite.T(), action.user)
		}
	}
}

func (suite *actionsPermissionsSuite) TestEditPrivacy() {
	action, err := createUser(viewer.LoggedOutViewer())
	assert.Nil(suite.T(), err)
	user := action.user
	assert.NotZero(suite.T(), user)

	var testCases = []struct {
		viewer   viewer.ViewerContext
		allowed  bool
		testCase string
	}{
		{
			viewertesting.OmniViewerContext{},
			false,
			"omni viewer context",
		},
		{
			viewertesting.LoggedinViewerContext{ViewerID: user.ID},
			true,
			"logged in viewer context with user",
		},
		{
			viewertesting.LoggedinViewerContext{ViewerID: "1"},
			false,
			"logged in viewer context with different user",
		},
		{
			viewer.LoggedOutViewer(),
			false,
			"logged out viewer context",
		},
	}

	for _, tt := range testCases {
		action := editUserAction{}
		action.existingEnt = user
		action.viewer = tt.viewer
		action.firstName = "Ola2"
		err := actions.Save(&action)
		if tt.allowed {
			assert.Nil(suite.T(), err, tt.testCase)
			assert.NotZero(suite.T(), action.user, tt.testCase)
			assert.Equal(suite.T(), action.user.FirstName, "Ola2", tt.testCase)
		} else {
			assert.NotNil(suite.T(), err, tt.testCase)
			assert.IsType(suite.T(), &actions.ActionPermissionsError{}, err, tt.testCase)
			assert.Zero(suite.T(), action.user, tt.testCase)
		}
	}
}

func TestActionPermissions(t *testing.T) {
	suite.Run(t, new(actionsPermissionsSuite))
}

func getFieldMapFromFields(op ent.WriteOperation, fields map[string]interface{}) ent.MutationFieldMap {
	// copied from testingutils/ent.go
	ret := make(ent.MutationFieldMap)
	for k := range fields {
		ret[k] = &ent.MutatingFieldInfo{
			DB:       strcase.ToSnake(k),
			Required: op == ent.InsertOperation,
		}
	}
	return ret
}
