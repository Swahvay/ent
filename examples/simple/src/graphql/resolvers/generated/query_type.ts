// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { GraphQLObjectType } from "graphql";
import { NodeQueryType, ViewerQueryType } from "../internal";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: NodeQueryType,
    viewer: ViewerQueryType,
  }),
});
