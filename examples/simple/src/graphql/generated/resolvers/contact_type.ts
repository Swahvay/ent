/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { RequestContext } from "@snowtop/ent";
import {
  GraphQLEdgeConnection,
  GraphQLNodeInterface,
  nodeIDEncoder,
} from "@snowtop/ent/graphql";
import {
  Contact,
  ContactCommentsFromAttachmentQuery,
  ContactToCommentsQuery,
  ContactToLikersQuery,
} from "../../../ent";
import {
  ContactCommentsFromAttachmentConnectionType,
  ContactEmailType,
  ContactItemResultType,
  ContactPhoneNumberType,
  ContactToCommentsConnectionType,
  ContactToLikersConnectionType,
  UserType,
} from "../../resolvers/internal";
import { ExampleViewer as ExampleViewerAlias } from "../../../viewer/viewer";
import { EmailInfo } from "../../../ent/contact";

export const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: (): GraphQLFieldConfigMap<
    Contact,
    RequestContext<ExampleViewerAlias>
  > => ({
    emails: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ContactEmailType)),
      ),
      resolve: (
        contact: Contact,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return contact.loadEmails();
      },
    },
    phoneNumbers: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ContactPhoneNumberType)),
      ),
      resolve: (
        contact: Contact,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return contact.loadPhoneNumbers();
      },
    },
    user: {
      type: UserType,
      resolve: (
        contact: Contact,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return contact.loadUser();
      },
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: nodeIDEncoder,
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    comments: {
      type: new GraphQLNonNull(ContactToCommentsConnectionType()),
      args: {
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
      resolve: (
        contact: Contact,
        args: any,
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return new GraphQLEdgeConnection(
          contact.viewer,
          contact,
          (v, contact: Contact) => ContactToCommentsQuery.query(v, contact),
          args,
        );
      },
    },
    likers: {
      type: new GraphQLNonNull(ContactToLikersConnectionType()),
      args: {
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
      resolve: (
        contact: Contact,
        args: any,
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return new GraphQLEdgeConnection(
          contact.viewer,
          contact,
          (v, contact: Contact) => ContactToLikersQuery.query(v, contact),
          args,
        );
      },
    },
    attachedComments: {
      type: new GraphQLNonNull(ContactCommentsFromAttachmentConnectionType()),
      args: {
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
      resolve: (
        contact: Contact,
        args: any,
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return new GraphQLEdgeConnection(
          contact.viewer,
          contact,
          (v, contact: Contact) =>
            ContactCommentsFromAttachmentQuery.query(v, contact),
          args,
        );
      },
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    plusEmails: {
      type: new GraphQLNonNull(EmailInfoType),
      resolve: async (
        contact: Contact,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return contact.queryPlusEmails();
      },
    },
    contactItems: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ContactItemResultType)),
      ),
      resolve: async (
        contact: Contact,
        args: {},
        context: RequestContext<ExampleViewerAlias>,
      ) => {
        return contact.queryContactItems();
      },
    },
  }),
  interfaces: [GraphQLNodeInterface],
  isTypeOf(obj) {
    return obj instanceof Contact;
  },
});

export const EmailInfoType = new GraphQLObjectType({
  name: "EmailInfo",
  fields: (): GraphQLFieldConfigMap<
    EmailInfo,
    RequestContext<ExampleViewerAlias>
  > => ({
    emails: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ContactEmailType)),
      ),
    },
    firstEmail: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
  isTypeOf(obj) {
    return obj instanceof EmailInfo;
  },
});
