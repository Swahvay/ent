// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { GraphQLObjectType } from "graphql";
import { GraphQLConnectionType } from "@snowtop/ent/graphql";
import { EventToDeclinedEdge } from "../../../../ent";
import { UserType } from "../../internal";

var connType: GraphQLConnectionType<GraphQLObjectType, EventToDeclinedEdge>;

export const EventToDeclinedConnectionType = () => {
  if (connType === undefined) {
    connType = new GraphQLConnectionType("EventToDeclined", UserType);
  }
  return connType;
};
