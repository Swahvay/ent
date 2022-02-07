/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

export enum NodeType {
  // Address is the node type for the Address object. Used to identify this node in edges and other places.
  Address = "address",
  // AuthCode is the node type for the AuthCode object. Used to identify this node in edges and other places.
  AuthCode = "authCode",
  // Comment is the node type for the Comment object. Used to identify this node in edges and other places.
  Comment = "comment",
  // Contact is the node type for the Contact object. Used to identify this node in edges and other places.
  Contact = "contact",
  // ContactEmail is the node type for the ContactEmail object. Used to identify this node in edges and other places.
  ContactEmail = "contactEmail",
  // ContactPhoneNumber is the node type for the ContactPhoneNumber object. Used to identify this node in edges and other places.
  ContactPhoneNumber = "contactPhoneNumber",
  // Event is the node type for the Event object. Used to identify this node in edges and other places.
  Event = "event",
  // Holiday is the node type for the Holiday object. Used to identify this node in edges and other places.
  Holiday = "holiday",
  // HoursOfOperation is the node type for the HoursOfOperation object. Used to identify this node in edges and other places.
  HoursOfOperation = "hoursOfOperation",
  // User is the node type for the User object. Used to identify this node in edges and other places.
  User = "user",
}

export enum EdgeType {
  // AddressToHostedEvents is the edgeType for the address to hostedevents edge.
  AddressToHostedEvents = "d1979d4b-d033-4562-b078-cc528fec25bb",
  // CommentToPost is the edgeType for the comment to post edge.
  CommentToPost = "f430af94-d38a-4aaa-a92f-cfc56b6f811b",
  // EventToAttending is the edgeType for the event to attending edge.
  EventToAttending = "6ebc0c47-ea29-4635-b991-95e44162174d",
  // EventToDeclined is the edgeType for the event to declined edge.
  EventToDeclined = "db8d2454-f7b2-4147-aae1-e666daf3f3c3",
  // EventToHosts is the edgeType for the event to hosts edge.
  EventToHosts = "ebe3e709-845c-4723-ac9c-29f983f2b8ea",
  // EventToInvited is the edgeType for the event to invited edge.
  EventToInvited = "a72f5f64-3580-44fd-9bd0-d1335b803a46",
  // EventToMaybe is the edgeType for the event to maybe edge.
  EventToMaybe = "b0f6311b-fdab-4c26-b6bf-b751e0997735",
  // ObjectToComments is the edgeType for the object to comments edge.
  ObjectToComments = "8caba9c4-8035-447f-9eb1-4dd09a2d250c",
  // ObjectToLikers is the edgeType for the object to likers edge.
  ObjectToLikers = "c9ccdad9-7aff-40e4-9a69-2c29cfa19763",
  // UserToCreatedEvents is the edgeType for the user to createdevents edge.
  UserToCreatedEvents = "daa3b2a3-8245-40ca-ae77-25bfb82578a7",
  // UserToDeclinedEvents is the edgeType for the user to declinedevents edge.
  UserToDeclinedEvents = "1c7c173b-63ce-4002-b121-4a87f82047dd",
  // UserToEventsAttending is the edgeType for the user to eventsattending edge.
  UserToEventsAttending = "2a98ba02-e342-4bb4-93f6-5d7ed02f5c48",
  // UserToFriends is the edgeType for the user to friends edge.
  UserToFriends = "d1a9316d-090f-4b02-b393-fd9372e2c905",
  // UserToHostedEvents is the edgeType for the user to usertohostedevents edge.
  UserToHostedEvents = "cf6542a4-8bae-427f-8a1f-01194047afb3",
  // UserToInvitedEvents is the edgeType for the user to invitedevents edge.
  UserToInvitedEvents = "e439f2b2-d93a-4d1a-83f0-865bda5c8337",
  // UserToLikes is the edgeType for the user to likes edge.
  UserToLikes = "745a20bf-4fdc-4862-b39f-569c4451db8f",
  // UserToMaybeEvents is the edgeType for the user to maybeevents edge.
  UserToMaybeEvents = "8d5b1dee-ce65-452e-9f8d-78eca1993800",
  // UserToSelfContact is the edgeType for the user to selfcontact edge.
  UserToSelfContact = "d504201d-cf3f-4eef-b6a0-0b46a7ae186b",
}
