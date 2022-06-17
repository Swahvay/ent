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
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from "graphql";
import { RequestContext } from "@snowtop/ent";
import { mustDecodeIDFromGQLID } from "@snowtop/ent/graphql";
import DeleteContactEmailAction from "../../../../ent/contact_email/actions/delete_contact_email_action";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

interface customContactEmailDeleteInput {
  contactEmailID: string;
}

interface ContactEmailDeletePayload {
  deletedContactEmailID: string;
}

export const ContactEmailDeleteInputType = new GraphQLInputObjectType({
  name: "ContactEmailDeleteInput",
  fields: (): GraphQLInputFieldConfigMap => ({
    contactEmailID: {
      description: "id of ContactEmail",
      type: new GraphQLNonNull(GraphQLID),
    },
  }),
});

export const ContactEmailDeletePayloadType = new GraphQLObjectType({
  name: "ContactEmailDeletePayload",
  fields: (): GraphQLFieldConfigMap<
    ContactEmailDeletePayload,
    RequestContext
  > => ({
    deletedContactEmailID: {
      type: GraphQLID,
    },
  }),
});

export const ContactEmailDeleteType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  { [input: string]: customContactEmailDeleteInput }
> = {
  type: new GraphQLNonNull(ContactEmailDeletePayloadType),
  args: {
    input: {
      description: "",
      type: new GraphQLNonNull(ContactEmailDeleteInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ): Promise<ContactEmailDeletePayload> => {
    await DeleteContactEmailAction.saveXFromID(
      context.getViewer(),
      mustDecodeIDFromGQLID(input.contactEmailID),
    );
    return { deletedContactEmailID: input.contactEmailID };
  },
};
