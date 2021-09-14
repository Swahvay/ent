/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import { GraphQLObjectType } from "graphql";
import { GraphQLConnectionType } from "@snowtop/ent/graphql";
import { UserToHostedEventsEdge } from "../../../../ent";
import { EventType } from "../../internal";

var connType: GraphQLConnectionType<GraphQLObjectType, UserToHostedEventsEdge>;

export const UserToHostedEventsConnectionType = () => {
  if (connType === undefined) {
    connType = new GraphQLConnectionType("UserToHostedEvents", EventType);
  }
  return connType;
};
