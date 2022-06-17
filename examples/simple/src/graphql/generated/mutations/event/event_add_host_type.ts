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
import { Event } from "../../../../ent";
import EventAddHostAction from "../../../../ent/event/actions/event_add_host_action";
import { EventType } from "../../../resolvers";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

interface customEventAddHostInput {
  eventID: string;
  hostID: string;
}

interface EventAddHostPayload {
  event: Event;
}

export const EventAddHostInputType = new GraphQLInputObjectType({
  name: "EventAddHostInput",
  fields: (): GraphQLInputFieldConfigMap => ({
    eventID: {
      description: "id of Event",
      type: new GraphQLNonNull(GraphQLID),
    },
    hostID: {
      type: new GraphQLNonNull(GraphQLID),
    },
  }),
});

export const EventAddHostPayloadType = new GraphQLObjectType({
  name: "EventAddHostPayload",
  fields: (): GraphQLFieldConfigMap<EventAddHostPayload, RequestContext> => ({
    event: {
      type: new GraphQLNonNull(EventType),
    },
  }),
});

export const EventAddHostType: GraphQLFieldConfig<
  undefined,
  RequestContext<ExampleViewerAlias>,
  { [input: string]: customEventAddHostInput }
> = {
  type: new GraphQLNonNull(EventAddHostPayloadType),
  args: {
    input: {
      description: "",
      type: new GraphQLNonNull(EventAddHostInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context: RequestContext<ExampleViewerAlias>,
    _info: GraphQLResolveInfo,
  ): Promise<EventAddHostPayload> => {
    const event = await EventAddHostAction.saveXFromID(
      context.getViewer(),
      mustDecodeIDFromGQLID(input.eventID),
      mustDecodeIDFromGQLID(input.hostID),
    );
    return { event: event };
  },
};
