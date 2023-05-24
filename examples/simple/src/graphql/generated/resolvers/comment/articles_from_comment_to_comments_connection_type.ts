/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import { GraphQLObjectType } from "graphql";
import { Data } from "@snowtop/ent";
import { GraphQLConnectionType } from "@snowtop/ent/graphql";
import { CommentType } from "../../../resolvers/internal";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

var connType: GraphQLConnectionType<
  GraphQLObjectType,
  Data,
  ExampleViewerAlias
>;

export const ArticlesFromCommentToCommentsConnectionType = () => {
  if (connType === undefined) {
    connType = new GraphQLConnectionType(
      "ArticlesFromCommentToComments",
      CommentType,
    );
  }
  return connType;
};
