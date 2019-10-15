// Code generated by github.com/lolopinto/ent/ent, DO NOT edit.

package models

import (
	"context"
	"sync"

	"github.com/lolopinto/ent/ent"
	"github.com/lolopinto/ent/ent/cast"
	"github.com/lolopinto/ent/ent/viewer"

	"github.com/lolopinto/ent/ent/test_schema/models/configs"
)

const (
	// UserType is the node type for the User object. Used to identify this node in edges and other places.
	UserType ent.NodeType = "user"

	// UserToEventsEdge is the edgeType for the user to events edge.
	UserToEventsEdge ent.EdgeType = "41bddf81-0c26-432c-9133-2f093af2c07c"
	// UserToFamilyMembersEdge is the edgeType for the user to familymembers edge.
	UserToFamilyMembersEdge ent.EdgeType = "38176101-6adc-4e0d-bd36-08cdc45f5ed2"
)

// User represents the `User` model
type User struct {
	ent.Node
	EmailAddress string `db:"email_address"`
	FirstName    string `db:"first_name"`
	LastName     string `db:"last_name"`
	Viewer       viewer.ViewerContext
}

// UserResult stores the result of loading a User. It's a tuple type which has 2 fields:
// a User and an error
type UserResult struct {
	User  *User
	Error error
}

// UsersResult stores the result of loading a slice of Users. It's a tuple type which has 2 fields:
// a []*User and an error
type UsersResult struct {
	Users []*User
	Error error
}

// IsNode is needed by gqlgen to indicate that this implements the Node interface in GraphQL
func (user User) IsNode() {}

// GetType returns the NodeType of this entity. In this case: ContactType
func (user *User) GetType() ent.NodeType {
	return UserType
}

func (user *User) GetViewer() viewer.ViewerContext {
	return user.Viewer
}

// GetPrivacyPolicy returns the PrivacyPolicy of this entity.
func (user *User) GetPrivacyPolicy() ent.PrivacyPolicy {
	return UserPrivacyPolicy{
		User: user,
	}
}

// LoadUserFromContext loads the given User given the context and id
func LoadUserFromContext(ctx context.Context, id string) (*User, error) {
	v, err := viewer.ForContext(ctx)
	if err != nil {
		return nil, err
	}
	return LoadUser(v, id)
}

// LoadUser loads the given User given the viewer and id
func LoadUser(viewer viewer.ViewerContext, id string) (*User, error) {
	var user User
	err := ent.LoadNode(viewer, id, &user, &configs.UserConfig{})
	return &user, err
}

// GenLoadUser loads the given User given the id
func GenLoadUser(viewer viewer.ViewerContext, id string, result *UserResult, wg *sync.WaitGroup) {
	defer wg.Done()
	var user User
	chanErr := make(chan error)
	go ent.GenLoadNode(viewer, id, &user, &configs.UserConfig{}, chanErr)
	err := <-chanErr
	result.User = &user
	result.Error = err
}

// GenContacts returns the Contacts associated with the User instance
func (user *User) GenContacts(result *ContactsResult, wg *sync.WaitGroup) {
	defer wg.Done()
	var contacts []*Contact
	chanErr := make(chan error)
	go ent.GenLoadForeignKeyNodes(user.Viewer, user.ID, &contacts, "user_id", &configs.ContactConfig{}, chanErr)
	err := <-chanErr
	result.Contacts = contacts
	result.Error = err
}

// LoadContacts returns the Contacts associated with the User instance
func (user *User) LoadContacts() ([]*Contact, error) {
	var contacts []*Contact
	err := ent.LoadForeignKeyNodes(user.Viewer, user.ID, &contacts, "user_id", &configs.ContactConfig{})
	return contacts, err
}

// LoadEventsEdges returns the Event edges associated with the User instance
func (user *User) LoadEventsEdges() ([]*ent.Edge, error) {
	return ent.LoadEdgesByType(user.ID, UserToEventsEdge)
}

// GenEventsEdges returns the Event edges associated with the User instance
func (user *User) GenEventsEdges(result *ent.EdgesResult, wg *sync.WaitGroup) {
	defer wg.Done()
	edgesResultChan := make(chan ent.EdgesResult)
	go ent.GenLoadEdgesByType(user.ID, UserToEventsEdge, edgesResultChan)
	*result = <-edgesResultChan
}

func (user *User) LoadEventsByType(id2 string) (*ent.Edge, error) {
	return ent.LoadEdgeByType(user.ID, UserToEventsEdge, id2)
}

// GenEvents returns the Events associated with the User instance
func (user *User) GenEvents(result *EventsResult, wg *sync.WaitGroup) {
	defer wg.Done()
	var events []*Event
	chanErr := make(chan error)
	go ent.GenLoadNodesByType(user.Viewer, user.ID, UserToEventsEdge, &events, &configs.EventConfig{}, chanErr)
	err := <-chanErr
	result.Events = events
	result.Error = err
}

// LoadEvents returns the Events associated with the User instance
func (user *User) LoadEvents() ([]*Event, error) {
	var events []*Event
	err := ent.LoadNodesByType(user.Viewer, user.ID, UserToEventsEdge, &events, &configs.EventConfig{})
	return events, err
}

// LoadFamilyMembersEdges returns the User edges associated with the User instance
func (user *User) LoadFamilyMembersEdges() ([]*ent.Edge, error) {
	return ent.LoadEdgesByType(user.ID, UserToFamilyMembersEdge)
}

// GenFamilyMembersEdges returns the User edges associated with the User instance
func (user *User) GenFamilyMembersEdges(result *ent.EdgesResult, wg *sync.WaitGroup) {
	defer wg.Done()
	edgesResultChan := make(chan ent.EdgesResult)
	go ent.GenLoadEdgesByType(user.ID, UserToFamilyMembersEdge, edgesResultChan)
	*result = <-edgesResultChan
}

func (user *User) LoadFamilyMembersByType(id2 string) (*ent.Edge, error) {
	return ent.LoadEdgeByType(user.ID, UserToFamilyMembersEdge, id2)
}

// GenFamilyMembers returns the Users associated with the User instance
func (user *User) GenFamilyMembers(result *UsersResult, wg *sync.WaitGroup) {
	defer wg.Done()
	var users []*User
	chanErr := make(chan error)
	go ent.GenLoadNodesByType(user.Viewer, user.ID, UserToFamilyMembersEdge, &users, &configs.UserConfig{}, chanErr)
	err := <-chanErr
	result.Users = users
	result.Error = err
}

// LoadFamilyMembers returns the Users associated with the User instance
func (user *User) LoadFamilyMembers() ([]*User, error) {
	var users []*User
	err := ent.LoadNodesByType(user.Viewer, user.ID, UserToFamilyMembersEdge, &users, &configs.UserConfig{})
	return users, err
}

func (user *User) DBFields() ent.DBFields {
	return ent.DBFields{
		"id": func(v interface{}) error {
			var err error
			user.ID, err = cast.ToUUIDString(v)
			return err
		},
		"email_address": func(v interface{}) error {
			var err error
			user.EmailAddress, err = cast.ToString(v)
			return err
		},
		"first_name": func(v interface{}) error {
			var err error
			user.FirstName, err = cast.ToString(v)
			return err
		},
		"last_name": func(v interface{}) error {
			var err error
			user.LastName, err = cast.ToString(v)
			return err
		},
	}
}

var _ ent.Entity = &User{}
