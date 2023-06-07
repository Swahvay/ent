// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { GraphQLSchema } from "graphql";
import {
  AddressCreateInputType,
  AddressCreatePayloadType,
} from "src/graphql/generated/mutations/address/address_create_type";
import {
  AddressDeleteInputType,
  AddressDeletePayloadType,
} from "src/graphql/generated/mutations/address/address_delete_type";
import {
  AddressEditInputType,
  AddressEditPayloadType,
} from "src/graphql/generated/mutations/address/address_edit_type";
import {
  AuthGuestInputType,
  AuthGuestPayloadType,
} from "src/graphql/generated/mutations/auth_guest_type";
import {
  AuthUserInputType,
  AuthUserPayloadType,
} from "src/graphql/generated/mutations/auth_user_type";
import {
  ActivityEventCreateInput,
  EventCreateInputType,
  EventCreatePayloadType,
} from "src/graphql/generated/mutations/event/event_create_type";
import {
  EventActivityAddInviteInputType,
  EventActivityAddInvitePayloadType,
} from "src/graphql/generated/mutations/event_activity/event_activity_add_invite_type";
import {
  AddressEventActivityCreateInput,
  EventActivityCreateInputType,
  EventActivityCreatePayloadType,
} from "src/graphql/generated/mutations/event_activity/event_activity_create_type";
import {
  EventActivityDeleteInputType,
  EventActivityDeletePayloadType,
} from "src/graphql/generated/mutations/event_activity/event_activity_delete_type";
import {
  EventActivityEditInputType,
  EventActivityEditPayloadType,
} from "src/graphql/generated/mutations/event_activity/event_activity_edit_type";
import {
  EventActivityRemoveInviteInputType,
  EventActivityRemoveInvitePayloadType,
} from "src/graphql/generated/mutations/event_activity/event_activity_remove_invite_type";
import {
  EventActivityRsvpStatusEditInputType,
  EventActivityRsvpStatusEditPayloadType,
} from "src/graphql/generated/mutations/event_activity/event_activity_rsvp_status_edit_type";
import {
  GuestCreateInputType,
  GuestCreatePayloadType,
} from "src/graphql/generated/mutations/guest/guest_create_type";
import {
  GuestDeleteInputType,
  GuestDeletePayloadType,
} from "src/graphql/generated/mutations/guest/guest_delete_type";
import {
  GuestEditInputType,
  GuestEditPayloadType,
} from "src/graphql/generated/mutations/guest/guest_edit_type";
import {
  GuestGroupCreateInputType,
  GuestGroupCreatePayloadType,
  GuestGuestGroupCreateInput,
} from "src/graphql/generated/mutations/guest_group/guest_group_create_type";
import {
  GuestGroupDeleteInputType,
  GuestGroupDeletePayloadType,
} from "src/graphql/generated/mutations/guest_group/guest_group_delete_type";
import {
  GuestGroupEditInputType,
  GuestGroupEditPayloadType,
} from "src/graphql/generated/mutations/guest_group/guest_group_edit_type";
import { EventActivityRsvpStatusInputType } from "src/graphql/generated/mutations/input_enums_type";
import { MutationType } from "src/graphql/generated/mutations/mutation_type";
import {
  UserCreateInputType,
  UserCreatePayloadType,
} from "src/graphql/generated/mutations/user/user_create_type";
import { QueryType } from "src/graphql/generated/resolvers/query_type";
import {
  AddressToLocatedAtConnectionType,
  AddressType,
  EventActivityCanViewerDoType,
  EventActivityRsvpStatusType,
  EventActivityToAttendingConnectionType,
  EventActivityToDeclinedConnectionType,
  EventActivityToInvitesConnectionType,
  EventActivityType,
  EventToEventActivitiesConnectionType,
  EventToGuestGroupsConnectionType,
  EventToGuestsConnectionType,
  EventType,
  GuestGroupToGuestsConnectionType,
  GuestGroupToInvitedEventsConnectionType,
  GuestGroupType,
  GuestToAttendingEventsConnectionType,
  GuestToDeclinedEventsConnectionType,
  GuestType,
  UserToEventsConnectionType,
  UserType,
  ViewerTypeType,
} from "src/graphql/resolvers";

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  types: [
    EventActivityRsvpStatusType,
    AddressType,
    EventActivityCanViewerDoType,
    EventActivityType,
    EventType,
    GuestGroupType,
    GuestType,
    UserType,
    AddressToLocatedAtConnectionType(),
    EventActivityToAttendingConnectionType(),
    EventActivityToDeclinedConnectionType(),
    EventActivityToInvitesConnectionType(),
    EventToEventActivitiesConnectionType(),
    EventToGuestGroupsConnectionType(),
    EventToGuestsConnectionType(),
    GuestGroupToGuestsConnectionType(),
    GuestGroupToInvitedEventsConnectionType(),
    GuestToAttendingEventsConnectionType(),
    GuestToDeclinedEventsConnectionType(),
    UserToEventsConnectionType(),
    ViewerTypeType,
    AuthGuestInputType,
    AuthGuestPayloadType,
    AuthUserInputType,
    AuthUserPayloadType,
    ActivityEventCreateInput,
    AddressCreateInputType,
    AddressCreatePayloadType,
    AddressDeleteInputType,
    AddressDeletePayloadType,
    AddressEditInputType,
    AddressEditPayloadType,
    AddressEventActivityCreateInput,
    EventActivityAddInviteInputType,
    EventActivityAddInvitePayloadType,
    EventActivityCreateInputType,
    EventActivityCreatePayloadType,
    EventActivityDeleteInputType,
    EventActivityDeletePayloadType,
    EventActivityEditInputType,
    EventActivityEditPayloadType,
    EventActivityRemoveInviteInputType,
    EventActivityRemoveInvitePayloadType,
    EventActivityRsvpStatusEditInputType,
    EventActivityRsvpStatusEditPayloadType,
    EventActivityRsvpStatusInputType,
    EventCreateInputType,
    EventCreatePayloadType,
    GuestCreateInputType,
    GuestCreatePayloadType,
    GuestDeleteInputType,
    GuestDeletePayloadType,
    GuestEditInputType,
    GuestEditPayloadType,
    GuestGroupCreateInputType,
    GuestGroupCreatePayloadType,
    GuestGroupDeleteInputType,
    GuestGroupDeletePayloadType,
    GuestGroupEditInputType,
    GuestGroupEditPayloadType,
    GuestGuestGroupCreateInput,
    UserCreateInputType,
    UserCreatePayloadType,
  ],
});
