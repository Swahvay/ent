/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLString,
} from "graphql";
import { GraphQLJSON } from "graphql-type-json";
import { RequestContext } from "@snowtop/ent";
import { GraphQLTime } from "@snowtop/ent/graphql";
import { ExampleViewer as ExampleViewerAlias } from "../../../viewer/viewer";
import { ViewerResolver } from "../../resolvers/viewer";

interface timeDiffArgs {
  time: any;
  log: any;
}

export const TimeDiffQueryType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  timeDiffArgs
> = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    time: {
      description: "",
      type: new GraphQLNonNull(GraphQLTime),
    },
    log: {
      description: "",
      type: new GraphQLNonNull(GraphQLJSON),
    },
  },
  resolve: async (
    _source,
    args,
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ) => {
    const r = new ViewerResolver();
    return r.timeDiff(args.time, args.log);
  },
};
