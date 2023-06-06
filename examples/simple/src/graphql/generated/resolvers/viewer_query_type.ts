/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from "graphql";
import { RequestContext } from "@snowtop/ent";
import { UserPrefsStructType, UserType } from "../../resolvers/internal";
import { ExampleViewer as ExampleViewerAlias } from "../../../viewer/viewer";
import { GQLViewer } from "../../resolvers/gql_viewer";
import { ViewerResolver } from "../../resolvers/viewer";

export const GQLViewerType = new GraphQLObjectType({
  name: "Viewer",
  fields: (): GraphQLFieldConfigMap<
    GQLViewer,
    RequestContext<ExampleViewerAlias>
  > => ({
    viewerID: {
      type: GraphQLID,
      resolve: async (
        obj: GQLViewer,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return obj.viewerID();
      },
    },
    user: {
      type: UserType,
      resolve: async (
        obj: GQLViewer,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return obj.user();
      },
    },
    defaultUserPrefs: {
      type: new GraphQLNonNull(UserPrefsStructType),
      resolve: (
        obj: GQLViewer,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return obj.defaultUserPrefs();
      },
    },
  }),
});

export const ViewerQueryType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  {}
> = {
  type: new GraphQLNonNull(GQLViewerType),
  resolve: async (
    _source,
    {},
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ) => {
    const r = new ViewerResolver();
    return r.viewer(context);
  },
};
