// Code generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

package action

import (
	"context"
	"errors"

	"github.com/lolopinto/ent/ent"
	"github.com/lolopinto/ent/ent/actions"
	"github.com/lolopinto/ent/ent/viewer"
	"github.com/lolopinto/ent/internal/test_schema/models"
	builder "github.com/lolopinto/ent/internal/test_schema/models/user"
)

type AddFriendsAction struct {
	builder *builder.UserMutationBuilder
}

// AddFriendsFromContext is the factory method to get an ...
func AddFriendsFromContext(ctx context.Context, user *models.User) *AddFriendsAction {
	v, err := viewer.ForContext(ctx)
	if err != nil {
		panic("tried to perform mutation without a viewer")
	}
	return AddFriends(v, user)
}

// AddFriends is the factory method to get an ...
func AddFriends(viewer viewer.ViewerContext, user *models.User) *AddFriendsAction {
	action := &AddFriendsAction{}
	builder := builder.NewMutationBuilder(
		viewer,
		ent.EditOperation,
		action.getFieldMap(),
		actions.ExistingEnt(user),
	)
	action.builder = builder
	return action
}

func (action *AddFriendsAction) GetBuilder() *builder.UserMutationBuilder {
	return action.builder
}

func (action *AddFriendsAction) GetViewer() viewer.ViewerContext {
	return action.builder.GetViewer()
}

func (action *AddFriendsAction) SetBuilderOnTriggers(triggers []actions.Trigger) error {
	action.builder.SetTriggers(triggers)
	for _, t := range triggers {
		trigger, ok := t.(builder.UserTrigger)
		if !ok {
			return errors.New("invalid trigger")
		}
		trigger.SetBuilder(action.builder)
	}
	return nil
}

func (action *AddFriendsAction) GetChangeset() (ent.Changeset, error) {
	return action.builder.GetChangeset(nil)
}

func (action *AddFriendsAction) Entity() ent.Entity {
	return action.builder.GetUser()
}

// AddFriends adds an instance of User to the Friends edge while editing the User ent
func (action *AddFriendsAction) AddFriends(user *models.User) *AddFriendsAction {
	action.builder.AddFriends(user)
	return action
}

// AddFriends adds an instance of UserId to the Friends edge while editing the User ent
func (action *AddFriendsAction) AddFriendsID(userID string) *AddFriendsAction {
	action.builder.AddFriendsID(userID)
	return action
}

// getFieldMap returns the fields that could be edited in this mutation
func (action *AddFriendsAction) getFieldMap() ent.ActionFieldMap {
	return ent.ActionFieldMap{}
}

// Validate returns an error if the current state of the action is not valid
func (action *AddFriendsAction) Validate() error {
	return action.builder.Validate()
}

// Save is the method called to execute this action and save change
func (action *AddFriendsAction) Save() (*models.User, error) {
	err := actions.Save(action)
	return action.builder.GetUser(), err
}

var _ actions.Action = &AddFriendsAction{}
