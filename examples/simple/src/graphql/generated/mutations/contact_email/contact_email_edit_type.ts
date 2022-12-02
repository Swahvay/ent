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
  GraphQLString,
} from "graphql";
import { RequestContext } from "@snowtop/ent";
import {
  mustDecodeIDFromGQLID,
  mustDecodeNullableIDFromGQLID,
} from "@snowtop/ent/graphql";
import { ContactEmail } from "../../../../ent";
import EditContactEmailAction, {
  ContactEmailEditInput,
} from "../../../../ent/contact_email/actions/edit_contact_email_action";
import { ContactInfoInputType } from "../input/contact_info_input_type";
import { ContactEmailType } from "../../../resolvers";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

interface customContactEmailEditInput extends ContactEmailEditInput {
  id: string;
  contactID?: string;
}

interface ContactEmailEditPayload {
  contactEmail: ContactEmail;
}

export const ContactEmailEditInputType = new GraphQLInputObjectType({
  name: "ContactEmailEditInput",
  fields: (): GraphQLInputFieldConfigMap => ({
    id: {
      description: "id of ContactEmail",
      type: new GraphQLNonNull(GraphQLID),
    },
    extra: {
      type: ContactInfoInputType,
    },
    emailAddress: {
      type: GraphQLString,
    },
    label: {
      type: GraphQLString,
    },
    contactID: {
      type: GraphQLID,
    },
  }),
});

export const ContactEmailEditPayloadType = new GraphQLObjectType({
  name: "ContactEmailEditPayload",
  fields: (): GraphQLFieldConfigMap<
    ContactEmailEditPayload,
    RequestContext<ExampleViewerAlias>
  > => ({
    contactEmail: {
      type: new GraphQLNonNull(ContactEmailType),
    },
  }),
});

export const ContactEmailEditType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  { [input: string]: customContactEmailEditInput }
> = {
  type: new GraphQLNonNull(ContactEmailEditPayloadType),
  args: {
    input: {
      description: "",
      type: new GraphQLNonNull(ContactEmailEditInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ): Promise<ContactEmailEditPayload> => {
    const contactEmail = await EditContactEmailAction.saveXFromID(
      context.getViewer(),
      mustDecodeIDFromGQLID(input.id),
      {
        extra: input.extra,
        emailAddress: input.emailAddress,
        label: input.label,
        contactID: mustDecodeNullableIDFromGQLID(input.contactID),
      },
    );
    return { contactEmail: contactEmail };
  },
};
