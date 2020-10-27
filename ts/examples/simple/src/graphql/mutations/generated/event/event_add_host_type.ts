// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLResolveInfo,
  GraphQLInputFieldConfigMap,
} from "graphql";
import { ID, RequestContext } from "@lolopinto/ent";
import { Event } from "src/ent/";
import { EventType } from "src/graphql/resolvers/generated/event_type";
import EventAddHostAction from "src/ent/event/actions/event_add_host_action";

interface customEventAddHostInput {
  eventID: ID;
  hostID: ID;
}

interface EventAddHostResponse {
  event: Event;
}

export const EventAddHostInputType = new GraphQLInputObjectType({
  name: "EventAddHostInput",
  fields: (): GraphQLInputFieldConfigMap => ({
    eventID: {
      type: GraphQLNonNull(GraphQLID),
    },
    hostID: {
      type: GraphQLNonNull(GraphQLID),
    },
  }),
});

export const EventAddHostResponseType = new GraphQLObjectType({
  name: "EventAddHostResponse",
  fields: (): GraphQLFieldConfigMap<EventAddHostResponse, RequestContext> => ({
    event: {
      type: GraphQLNonNull(EventType),
    },
  }),
});

export const EventAddHostType: GraphQLFieldConfig<
  undefined,
  RequestContext,
  { [input: string]: customEventAddHostInput }
> = {
  type: GraphQLNonNull(EventAddHostResponseType),
  args: {
    input: {
      description: "",
      type: GraphQLNonNull(EventAddHostInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context: RequestContext,
    _info: GraphQLResolveInfo,
  ): Promise<EventAddHostResponse> => {
    let event = await EventAddHostAction.saveXFromID(
      context.getViewer(),
      input.eventID,
      input.hostID,
    );
    return { event: event };
  },
};
