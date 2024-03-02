/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from "graphql";
import { RequestContext } from "@snowtop/ent";
import { mustDecodeIDFromGQLID } from "@snowtop/ent/graphql";
import { UserStatistics } from "../../../../ent";
import EditUserStatisticsAction, {
  UserStatisticsEditInput,
} from "../../../../ent/user_statistics/actions/edit_user_statistics_action";
import { UserStatisticsType } from "../../../resolvers";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

interface customUserStatisticsEditInput extends UserStatisticsEditInput {
  id: string;
}

interface UserStatisticsEditPayload {
  userStatistics: UserStatistics;
}

export const UserStatisticsEditInputType = new GraphQLInputObjectType({
  name: "UserStatisticsEditInput",
  fields: (): GraphQLInputFieldConfigMap => ({
    id: {
      description: "id of UserStatistics",
      type: new GraphQLNonNull(GraphQLID),
    },
    authCodeEmailsSent: {
      type: GraphQLInt,
    },
  }),
});

export const UserStatisticsEditPayloadType = new GraphQLObjectType({
  name: "UserStatisticsEditPayload",
  fields: (): GraphQLFieldConfigMap<
    UserStatisticsEditPayload,
    RequestContext<ExampleViewerAlias>
  > => ({
    userStatistics: {
      type: new GraphQLNonNull(UserStatisticsType),
    },
  }),
});

export const UserStatisticsEditType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  { [input: string]: customUserStatisticsEditInput }
> = {
  type: new GraphQLNonNull(UserStatisticsEditPayloadType),
  args: {
    input: {
      description: "",
      type: new GraphQLNonNull(UserStatisticsEditInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ): Promise<UserStatisticsEditPayload> => {
    const userStatistics = await EditUserStatisticsAction.saveXFromID(
      context.getViewer(),
      mustDecodeIDFromGQLID(input.id),
      {
        authCodeEmailsSent: input.authCodeEmailsSent,
      },
    );
    return { userStatistics };
  },
};
