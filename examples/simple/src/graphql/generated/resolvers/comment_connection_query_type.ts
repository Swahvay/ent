/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLString,
} from "graphql";
import { CustomClauseQuery, RequestContext, query } from "@snowtop/ent";
import {
  GraphQLEdgeConnection,
  mustDecodeIDFromGQLID,
} from "@snowtop/ent/graphql";
import { Comment } from "../../../ent";
import { CommentSortColumnType } from "./enums_type";
import { RootToCommentConnectionType } from "../../resolvers/internal";
import { ExampleViewer as ExampleViewerAlias } from "../../../viewer/viewer";

interface CommentConnectionArgs {
  ids: any;
  sortCol: any;
  first: number | null;
  after: string | null;
  last: number | null;
  before: string | null;
}

export const CommentConnectionQueryType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  CommentConnectionArgs
> = {
  type: new GraphQLNonNull(RootToCommentConnectionType()),
  args: {
    ids: {
      description: "",
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
    },
    sortCol: {
      description: "",
      type: CommentSortColumnType,
    },
    first: {
      description: "",
      type: GraphQLInt,
    },
    after: {
      description: "",
      type: GraphQLString,
    },
    last: {
      description: "",
      type: GraphQLInt,
    },
    before: {
      description: "",
      type: GraphQLString,
    },
  },
  resolve: async (
    _source,
    args,
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ) => {
    args.ids = args.ids
      ? args.ids.map((i: any) => mustDecodeIDFromGQLID(i))
      : undefined;
    return new GraphQLEdgeConnection(
      context.getViewer(),
      (v) => {
        return new CustomClauseQuery(context.getViewer(), {
          loadEntOptions: Comment.loaderOptions(),
          clause: query.UuidIn("id", args.ids),
          name: "Comment",
          orderby: [
            {
              // use sortCol value or created_at (not sorted)
              column: args.sortCol ?? "created_at",
              direction: "DESC",
            },
          ],
        });
      },
      args,
    );
  },
};
