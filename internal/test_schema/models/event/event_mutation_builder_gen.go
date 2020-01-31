// Code generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

package event

import (
	"time"

	"github.com/lolopinto/ent/ent"
	"github.com/lolopinto/ent/ent/actions"
	"github.com/lolopinto/ent/ent/field"
	"github.com/lolopinto/ent/ent/viewer"
	"github.com/lolopinto/ent/internal/test_schema/models"
	"github.com/lolopinto/ent/internal/test_schema/models/configs"
)

type EventMutationBuilder struct {
	requiredFields []string
	builder        *actions.EdgeGroupMutationBuilder
	event          *models.Event
	name           *string
	userID         *string
	userIDBuilder  ent.MutationBuilder
	startTime      *time.Time
	endTime        *time.Time
	clearendTime   bool
	location       *string
}

func NewMutationBuilder(
	v viewer.ViewerContext,
	operation ent.WriteOperation,
	requiredFields []string,
	opts ...func(*actions.EntMutationBuilder),
) *EventMutationBuilder {
	var event models.Event

	ret := &EventMutationBuilder{
		requiredFields: requiredFields,
		event:          &event,
	}
	opts = append(opts, actions.BuildFields(ret.buildFields))
	b := actions.NewMutationBuilder(
		v,
		operation,
		&event,
		&configs.EventConfig{},
		opts...,
	)
	b2 := actions.NewEdgeGroupMutationBuilder(
		b,
		event.RsvpStatusMap(),
	)
	ret.builder = b2
	return ret
}

func (b *EventMutationBuilder) SetName(name string) *EventMutationBuilder {
	b.name = &name
	return b
}

func (b *EventMutationBuilder) SetUserID(userID string) *EventMutationBuilder {
	b.userID = &userID
	b.builder.AddInboundEdge(models.UserToEventsEdge, userID, models.EventType)
	return b
}

func (b *EventMutationBuilder) SetUserIDBuilder(builder ent.MutationBuilder) *EventMutationBuilder {
	b.userIDBuilder = builder
	b.builder.AddInboundEdge(models.UserToEventsEdge, builder, models.EventType)
	return b
}

func (b *EventMutationBuilder) SetStartTime(startTime time.Time) *EventMutationBuilder {
	b.startTime = &startTime
	return b
}

func (b *EventMutationBuilder) SetEndTime(endTime time.Time) *EventMutationBuilder {
	b.endTime = &endTime
	return b
}

func (b *EventMutationBuilder) SetNilableEndTime(endTime *time.Time) *EventMutationBuilder {
	b.endTime = endTime
	b.clearendTime = (endTime == nil)
	return b
}

func (b *EventMutationBuilder) SetLocation(location string) *EventMutationBuilder {
	b.location = &location
	return b
}

func (b *EventMutationBuilder) GetName() string {
	if b.name == nil {
		return ""
	}
	return *b.name
}

func (b *EventMutationBuilder) GetUserID() string {
	if b.userID == nil {
		return ""
	}

	if b.userIDBuilder != nil {
		return b.userIDBuilder.GetPlaceholderID()
	}
	return *b.userID
}

func (b *EventMutationBuilder) GetUserIDBuilder() ent.MutationBuilder {
	return b.userIDBuilder
}

func (b *EventMutationBuilder) GetStartTime() time.Time {
	if b.startTime == nil {
		return time.Time{}
	}
	return *b.startTime
}

func (b *EventMutationBuilder) GetEndTime() *time.Time {
	if b.endTime == nil {
		return nil
	}
	return b.endTime
}

func (b *EventMutationBuilder) GetLocation() string {
	if b.location == nil {
		return ""
	}
	return *b.location
}

// AddHosts adds one or more instances of User to the Hosts edge while editing the User ent
func (b *EventMutationBuilder) AddHosts(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.AddHostID(user.ID)
	}
	return b
}

// AddHostIDs adds an instance of User to the Hosts edge while editing the User ent
func (b *EventMutationBuilder) AddHostIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.AddHostID(userID)
	}
	return b
}

// AddHostID adds an instance of User to the Hosts edge while editing the User ent
func (b *EventMutationBuilder) AddHostID(userID string, options ...func(*ent.EdgeOperation)) *EventMutationBuilder {
	b.builder.AddOutboundEdge(models.EventToHostsEdge, userID, models.UserType, options...)
	return b
}

// AddCreator adds one or more instances of User to the Creator edge while editing the User ent
func (b *EventMutationBuilder) AddCreator(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.AddCreatorID(user.ID)
	}
	return b
}

// AddCreatorIDs adds an instance of User to the Creator edge while editing the User ent
func (b *EventMutationBuilder) AddCreatorIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.AddCreatorID(userID)
	}
	return b
}

// AddCreatorID adds an instance of User to the Creator edge while editing the User ent
func (b *EventMutationBuilder) AddCreatorID(userID string, options ...func(*ent.EdgeOperation)) *EventMutationBuilder {
	b.builder.AddOutboundEdge(models.EventToCreatorEdge, userID, models.UserType, options...)
	return b
}

// AddInvited adds one or more instances of User to the Invited edge while editing the User ent
func (b *EventMutationBuilder) AddInvited(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.AddInvitedID(user.ID)
	}
	return b
}

// AddInvitedIDs adds an instance of User to the Invited edge while editing the User ent
func (b *EventMutationBuilder) AddInvitedIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.AddInvitedID(userID)
	}
	return b
}

// AddInvitedID adds an instance of User to the Invited edge while editing the User ent
func (b *EventMutationBuilder) AddInvitedID(userID string, options ...func(*ent.EdgeOperation)) *EventMutationBuilder {
	b.builder.AddOutboundEdge(models.EventToInvitedEdge, userID, models.UserType, options...)
	return b
}

// AddAttending adds one or more instances of User to the Attending edge while editing the User ent
func (b *EventMutationBuilder) AddAttending(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.AddAttendingID(user.ID)
	}
	return b
}

// AddAttendingIDs adds an instance of User to the Attending edge while editing the User ent
func (b *EventMutationBuilder) AddAttendingIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.AddAttendingID(userID)
	}
	return b
}

// AddAttendingID adds an instance of User to the Attending edge while editing the User ent
func (b *EventMutationBuilder) AddAttendingID(userID string, options ...func(*ent.EdgeOperation)) *EventMutationBuilder {
	b.builder.AddOutboundEdge(models.EventToAttendingEdge, userID, models.UserType, options...)
	return b
}

// AddDeclined adds one or more instances of User to the Declined edge while editing the User ent
func (b *EventMutationBuilder) AddDeclined(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.AddDeclinedID(user.ID)
	}
	return b
}

// AddDeclinedIDs adds an instance of User to the Declined edge while editing the User ent
func (b *EventMutationBuilder) AddDeclinedIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.AddDeclinedID(userID)
	}
	return b
}

// AddDeclinedID adds an instance of User to the Declined edge while editing the User ent
func (b *EventMutationBuilder) AddDeclinedID(userID string, options ...func(*ent.EdgeOperation)) *EventMutationBuilder {
	b.builder.AddOutboundEdge(models.EventToDeclinedEdge, userID, models.UserType, options...)
	return b
}

// RemoveHosts removes an instance of User from the Hosts edge while editing the User ent
func (b *EventMutationBuilder) RemoveHosts(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.RemoveHostID(user.ID)
	}
	return b
}

// RemoveHostIDs removes an instance of User from the Hosts edge while editing the User ent
func (b *EventMutationBuilder) RemoveHostIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.RemoveHostID(userID)
	}
	return b
}

// RemoveHostID removes an instance of User from the Hosts edge while editing the User ent
func (b *EventMutationBuilder) RemoveHostID(userID string) *EventMutationBuilder {
	b.builder.RemoveOutboundEdge(models.EventToHostsEdge, userID, models.UserType)
	return b
}

// RemoveCreator removes an instance of User from the Creator edge while editing the User ent
func (b *EventMutationBuilder) RemoveCreator(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.RemoveCreatorID(user.ID)
	}
	return b
}

// RemoveCreatorIDs removes an instance of User from the Creator edge while editing the User ent
func (b *EventMutationBuilder) RemoveCreatorIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.RemoveCreatorID(userID)
	}
	return b
}

// RemoveCreatorID removes an instance of User from the Creator edge while editing the User ent
func (b *EventMutationBuilder) RemoveCreatorID(userID string) *EventMutationBuilder {
	b.builder.RemoveOutboundEdge(models.EventToCreatorEdge, userID, models.UserType)
	return b
}

// RemoveInvited removes an instance of User from the Invited edge while editing the User ent
func (b *EventMutationBuilder) RemoveInvited(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.RemoveInvitedID(user.ID)
	}
	return b
}

// RemoveInvitedIDs removes an instance of User from the Invited edge while editing the User ent
func (b *EventMutationBuilder) RemoveInvitedIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.RemoveInvitedID(userID)
	}
	return b
}

// RemoveInvitedID removes an instance of User from the Invited edge while editing the User ent
func (b *EventMutationBuilder) RemoveInvitedID(userID string) *EventMutationBuilder {
	b.builder.RemoveOutboundEdge(models.EventToInvitedEdge, userID, models.UserType)
	return b
}

// RemoveAttending removes an instance of User from the Attending edge while editing the User ent
func (b *EventMutationBuilder) RemoveAttending(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.RemoveAttendingID(user.ID)
	}
	return b
}

// RemoveAttendingIDs removes an instance of User from the Attending edge while editing the User ent
func (b *EventMutationBuilder) RemoveAttendingIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.RemoveAttendingID(userID)
	}
	return b
}

// RemoveAttendingID removes an instance of User from the Attending edge while editing the User ent
func (b *EventMutationBuilder) RemoveAttendingID(userID string) *EventMutationBuilder {
	b.builder.RemoveOutboundEdge(models.EventToAttendingEdge, userID, models.UserType)
	return b
}

// RemoveDeclined removes an instance of User from the Declined edge while editing the User ent
func (b *EventMutationBuilder) RemoveDeclined(users ...*models.User) *EventMutationBuilder {
	for _, user := range users {
		b.RemoveDeclinedID(user.ID)
	}
	return b
}

// RemoveDeclinedIDs removes an instance of User from the Declined edge while editing the User ent
func (b *EventMutationBuilder) RemoveDeclinedIDs(userIDs ...string) *EventMutationBuilder {
	for _, userID := range userIDs {
		b.RemoveDeclinedID(userID)
	}
	return b
}

// RemoveDeclinedID removes an instance of User from the Declined edge while editing the User ent
func (b *EventMutationBuilder) RemoveDeclinedID(userID string) *EventMutationBuilder {
	b.builder.RemoveOutboundEdge(models.EventToDeclinedEdge, userID, models.UserType)
	return b
}

func (b *EventMutationBuilder) SetEnumValue(enumValue string) *EventMutationBuilder {
	b.builder.SetEnumValue(enumValue)
	return b
}

func (b *EventMutationBuilder) SetIDValue(idValue string, nodeType ent.NodeType) *EventMutationBuilder {
	b.builder.SetIDValue(idValue, nodeType)
	return b
}
func (b *EventMutationBuilder) GetViewer() viewer.ViewerContext {
	return b.builder.GetViewer()
}

func (b *EventMutationBuilder) GetEvent() *models.Event {
	return b.event
}

// TODO rename from GetChangeset to Build()
// A Builder builds.
func (b *EventMutationBuilder) GetChangeset() (ent.Changeset, error) {
	return b.builder.GetChangeset()
}

// Call Validate (should be Valid) at any point to validate that builder is valid
func (b *EventMutationBuilder) Validate() error {
	return b.builder.Validate()
}

func (b *EventMutationBuilder) buildFields() ent.ActionFieldMap {
	m := make(map[string]bool)
	for _, f := range b.requiredFields {
		m[f] = true
	}

	fieldMap := b.GetFields()
	fields := make(ent.ActionFieldMap)
	addField := func(key string, val interface{}) {
		fields[key] = &ent.FieldInfo{
			Field: fieldMap[key],
			Value: val,
		}
	}

	// Need to have Id fields be fine with Builder

	// if required, field is not nil or field explicitly set to nil, add the field
	if b.name != nil {
		addField("Name", *b.name)
	} else if m["Name"] { // nil but required
		addField("Name", nil)
	}
	if b.userID != nil {
		addField("UserID", *b.userID)
	} else if m["UserID"] { // nil but required
		addField("UserID", nil)
	}
	if b.userIDBuilder != nil { // builder not nil, override userID
		addField("UserID", b.userIDBuilder)
	}
	if b.startTime != nil {
		addField("StartTime", *b.startTime)
	} else if m["StartTime"] { // nil but required
		addField("StartTime", nil)
	}
	if b.endTime != nil {
		addField("EndTime", *b.endTime)
	} else if m["EndTime"] || b.clearendTime { // required or value cleared
		addField("EndTime", nil)
	}
	if b.location != nil {
		addField("Location", *b.location)
	} else if m["Location"] { // nil but required
		addField("Location", nil)
	}
	return fields
}

func (b *EventMutationBuilder) ExistingEnt() ent.Entity {
	return b.builder.ExistingEnt()
}

func (b *EventMutationBuilder) Entity() ent.Entity {
	return b.builder.Entity()
}

func (b *EventMutationBuilder) GetOperation() ent.WriteOperation {
	return b.builder.GetOperation()
}

func (b *EventMutationBuilder) GetPlaceholderID() string {
	return b.builder.GetPlaceholderID()
}

// GetFields returns the field configuration for this mutation builder
func (b *EventMutationBuilder) GetFields() ent.FieldMap {
	return ent.FieldMap{
		"Name":      field.F(field.NoopType(), field.DB("name")),
		"UserID":    field.F(field.NoopType(), field.DB("user_id")),
		"StartTime": field.F(field.NoopType(), field.DB("start_time")),
		"EndTime":   field.F(field.NoopType(), field.DB("end_time"), field.Nullable()),
		"Location":  field.F(field.NoopType(), field.DB("location")),
	}
}

var _ ent.MutationBuilder = &EventMutationBuilder{}

func (b *EventMutationBuilder) setBuilder(v interface{}) {
	callback, ok := v.(EventCallbackWithBuilder)
	if ok {
		callback.SetBuilder(b)
	}
}

// SetTriggers sets the builder on the triggers.
func (b *EventMutationBuilder) SetTriggers(triggers []actions.Trigger) {
	b.builder.SetTriggers(triggers)
	for _, t := range triggers {
		b.setBuilder(t)
	}
}

// SetObservers sets the builder on the observers.
func (b *EventMutationBuilder) SetObservers(observers []actions.Observer) {
	b.builder.SetObservers(observers)
	for _, o := range observers {
		b.setBuilder(o)
	}
}

// SetValidators sets the builder on validators.
func (b *EventMutationBuilder) SetValidators(validators []actions.Validator) {
	b.builder.SetValidators(validators)
	for _, v := range validators {
		b.setBuilder(v)
	}
}

type EventCallbackWithBuilder interface {
	SetBuilder(*EventMutationBuilder)
}

type EventMutationCallback struct {
	Builder *EventMutationBuilder
}

func (callback *EventMutationCallback) SetBuilder(b *EventMutationBuilder) {
	callback.Builder = b
}
