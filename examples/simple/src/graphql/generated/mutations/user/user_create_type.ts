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
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLString,
} from "graphql";
import { RequestContext } from "@snowtop/ent";
import {
  mustDecodeIDFromGQLID,
  transformUnionTypes,
} from "@snowtop/ent/graphql";
import { User } from "../../../../ent";
import CreateUserAction, {
  UserCreateInput,
} from "../../../../ent/user/actions/create_user_action";
import { UserNestedObjectListInputType } from "../input/user_nested_object_list_input_type";
import { UserPrefsDiffInputType } from "../input/user_prefs_diff_input_type";
import { UserPrefsStructInputType } from "../input/user_prefs_struct_input_type";
import { UserSuperNestedObjectInputType } from "../input/user_super_nested_object_input_type";
import {
  UserDaysOffType,
  UserIntEnumType,
  UserPreferredShiftType,
  UserType,
} from "../../../resolvers";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

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
    phoneNumber: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    nicknames: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
    },
    prefs: {
      type: UserPrefsStructInputType,
    },
    prefsDiff: {
      type: UserPrefsDiffInputType,
    },
    daysOff: {
      type: new GraphQLList(new GraphQLNonNull(UserDaysOffType)),
    },
    preferredShift: {
      type: new GraphQLList(new GraphQLNonNull(UserPreferredShiftType)),
    },
    funUuids: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
    },
    prefsList: {
      type: new GraphQLList(new GraphQLNonNull(UserPrefsStructInputType)),
    },
    superNestedObject: {
      type: UserSuperNestedObjectInputType,
    },
    nestedList: {
      type: new GraphQLList(new GraphQLNonNull(UserNestedObjectListInputType)),
    },
    intEnum: {
      type: UserIntEnumType,
    },
    accountStatusOverride: {
      type: GraphQLString,
    },
  }),
});

export const UserCreatePayloadType = new GraphQLObjectType({
  name: "UserCreatePayload",
  fields: (): GraphQLFieldConfigMap<
    UserCreatePayload,
    RequestContext<ExampleViewerAlias>
  > => ({
    user: {
      type: new GraphQLNonNull(UserType),
    },
  }),
});

export const UserCreateType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
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
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ): Promise<UserCreatePayload> => {
    input = transformUnionTypes(input, [["superNestedObject", "union"]]);
    const user = await CreateUserAction.create(context.getViewer(), {
      firstName: input.firstName,
      lastName: input.lastName,
      emailAddress: input.emailAddress,
      phoneNumber: input.phoneNumber,
      password: input.password,
      nicknames: input.nicknames,
      prefs: input.prefs,
      prefsDiff: input.prefsDiff,
      daysOff: input.daysOff,
      preferredShift: input.preferredShift,
      funUuids: input.funUuids
        ? input.funUuids.map((i: any) => mustDecodeIDFromGQLID(i))
        : undefined,
      prefsList: input.prefsList,
      superNestedObject: input.superNestedObject,
      nestedList: input.nestedList,
      intEnum: input.intEnum,
      accountStatusOverride: input.accountStatusOverride,
    }).saveX();
    return { user: user };
  },
};
