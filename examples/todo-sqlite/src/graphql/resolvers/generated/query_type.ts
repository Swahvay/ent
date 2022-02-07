// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { GraphQLObjectType } from "graphql";
import {
  AccountQueryType,
  OpenTodosPluralQueryType,
  OpenTodosQueryType,
  TagQueryType,
  TodoQueryType,
} from "src/graphql/resolvers/internal";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  // @ts-ignore graphql-js TS #2152 2829
  fields: () => ({
    account: AccountQueryType,
    openTodos: OpenTodosQueryType,
    openTodosPlural: OpenTodosPluralQueryType,
    tag: TagQueryType,
    todo: TodoQueryType,
  }),
});
