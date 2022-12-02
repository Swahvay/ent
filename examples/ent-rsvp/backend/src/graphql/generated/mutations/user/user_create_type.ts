// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLString,
} from "graphql";
import { RequestContext, Viewer } from "@snowtop/ent";
import { User } from "src/ent/";
import CreateUserAction, {
  UserCreateInput,
} from "src/ent/user/actions/create_user_action";
import { UserType } from "src/graphql/resolvers/";

interface UserCreatePayload {
  user: User;
}

export const UserCreateInputType = new GraphQLInputObjectType({
  name: "UserCreateInput",
  fields: (): GraphQLInputFieldConfigMap => ({
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    emailAddress: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const UserCreatePayloadType = new GraphQLObjectType({
  name: "UserCreatePayload",
  fields: (): GraphQLFieldConfigMap<
    UserCreatePayload,
    RequestContext<Viewer>
  > => ({
    user: {
      type: new GraphQLNonNull(UserType),
    },
  }),
});

export const UserCreateType: GraphQLFieldConfig<
  undefined,
  RequestContext<Viewer>,
  { [input: string]: UserCreateInput }
> = {
  type: new GraphQLNonNull(UserCreatePayloadType),
  args: {
    input: {
      description: "",
      type: new GraphQLNonNull(UserCreateInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context: RequestContext<Viewer>,
    _info: GraphQLResolveInfo,
  ): Promise<UserCreatePayload> => {
    const user = await CreateUserAction.create(context.getViewer(), {
      firstName: input.firstName,
      lastName: input.lastName,
      emailAddress: input.emailAddress,
      password: input.password,
    }).saveX();
    return { user: user };
  },
};
