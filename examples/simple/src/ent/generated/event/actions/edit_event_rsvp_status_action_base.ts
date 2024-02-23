/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import { ID, PrivacyPolicy } from "@snowtop/ent";
import {
  Action,
  Changeset,
  ChangesetOptions,
  Observer,
  Trigger,
  Validator,
  WriteOperation,
  setEdgeTypeInGroup,
} from "@snowtop/ent/action";
import { Event } from "../../..";
import { EventBuilder } from "./event_builder";
import { NodeType } from "../../types";
import schema from "../../../../schema/event_schema";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

export enum EventRsvpStatusInput {
  Attending = "attending",
  Declined = "declined",
  Maybe = "maybe",
  Unknown = "%unknown%",
}

export function convertEventRsvpStatusInput(val: string): EventRsvpStatusInput {
  switch (val) {
    case EventRsvpStatusInput.Attending:
    case EventRsvpStatusInput.Declined:
    case EventRsvpStatusInput.Maybe:
    case EventRsvpStatusInput.Unknown:
      return val;
    default:
      return EventRsvpStatusInput.Unknown;
  }
}

export function convertNullableEventRsvpStatusInput(
  val: string | null,
): EventRsvpStatusInput | null {
  if (val === null || val === undefined) {
    return null;
  }
  return convertEventRsvpStatusInput(val);
}

export function convertEventRsvpStatusInputList(
  val: string[],
): EventRsvpStatusInput[] {
  return val.map((v) => convertEventRsvpStatusInput(v));
}

export function convertNullableEventRsvpStatusInputList(
  val: string[] | null,
): EventRsvpStatusInput[] | null {
  if (val === null || val === undefined) {
    return null;
  }
  return convertEventRsvpStatusInputList(val);
}

export interface EditEventRsvpStatusInput {
  rsvpStatus: EventRsvpStatusInput;
  userId: ID;
}

export type EditEventRsvpStatusActionTriggers = (
  | Trigger<
      Event,
      EventBuilder<EditEventRsvpStatusInput, Event>,
      ExampleViewerAlias,
      EditEventRsvpStatusInput,
      Event
    >
  | Trigger<
      Event,
      EventBuilder<EditEventRsvpStatusInput, Event>,
      ExampleViewerAlias,
      EditEventRsvpStatusInput,
      Event
    >[]
)[];

export type EditEventRsvpStatusActionObservers = Observer<
  Event,
  EventBuilder<EditEventRsvpStatusInput, Event>,
  ExampleViewerAlias,
  EditEventRsvpStatusInput,
  Event
>[];

export type EditEventRsvpStatusActionValidators = Validator<
  Event,
  EventBuilder<EditEventRsvpStatusInput, Event>,
  ExampleViewerAlias,
  EditEventRsvpStatusInput,
  Event
>[];

export class EditEventRsvpStatusActionBase
  implements
    Action<
      Event,
      EventBuilder<EditEventRsvpStatusInput, Event>,
      ExampleViewerAlias,
      EditEventRsvpStatusInput,
      Event
    >
{
  public readonly builder: EventBuilder<EditEventRsvpStatusInput, Event>;
  public readonly viewer: ExampleViewerAlias;
  protected input: EditEventRsvpStatusInput;
  protected readonly event: Event;

  constructor(
    viewer: ExampleViewerAlias,
    event: Event,
    input: EditEventRsvpStatusInput,
  ) {
    this.viewer = viewer;
    this.input = input;
    this.builder = new EventBuilder(
      this.viewer,
      WriteOperation.Edit,
      this,
      event,
    );
    this.event = event;
  }

  getPrivacyPolicy(): PrivacyPolicy<Event, ExampleViewerAlias> {
    if (schema.defaultActionPrivacy === undefined) {
      throw new Error(
        `defaultActionPrivacy in schema Event is undefined. This is likely a bug in the codegen. Please file an issue.`,
      );
    }

    return typeof schema.defaultActionPrivacy === "function"
      ? schema.defaultActionPrivacy()
      : schema.defaultActionPrivacy;
  }

  getTriggers(): EditEventRsvpStatusActionTriggers {
    return [];
  }

  getObservers(): EditEventRsvpStatusActionObservers {
    return [];
  }

  getValidators(): EditEventRsvpStatusActionValidators {
    return [];
  }

  getInput(): EditEventRsvpStatusInput {
    return this.input;
  }

  async changeset(): Promise<Changeset> {
    await this.setEdgeType();
    return this.builder.build();
  }

  async changesetWithOptions_BETA(
    options: ChangesetOptions,
  ): Promise<Changeset> {
    await this.setEdgeType();
    return this.builder.buildWithOptions_BETA(options);
  }

  private async setEdgeType() {
    await setEdgeTypeInGroup(
      this.builder.orchestrator,
      this.input.rsvpStatus,
      this.event.id,
      this.input.userId,
      NodeType.User,
      this.event.getEventRsvpStatusMap(),
    );
  }

  async valid(): Promise<boolean> {
    await this.setEdgeType();
    return this.builder.valid();
  }

  async validX(): Promise<void> {
    await this.setEdgeType();
    await this.builder.validX();
  }

  async save(): Promise<Event | null> {
    await this.setEdgeType();
    await this.builder.save();
    return this.builder.editedEnt();
  }

  async saveX(): Promise<Event> {
    await this.setEdgeType();
    await this.builder.saveX();
    return this.builder.editedEntX();
  }

  static create<T extends EditEventRsvpStatusActionBase>(
    this: new (
      viewer: ExampleViewerAlias,
      event: Event,
      input: EditEventRsvpStatusInput,
    ) => T,
    viewer: ExampleViewerAlias,
    event: Event,
    input: EditEventRsvpStatusInput,
  ): T {
    return new this(viewer, event, input);
  }

  static async saveXFromID<T extends EditEventRsvpStatusActionBase>(
    this: new (
      viewer: ExampleViewerAlias,
      event: Event,
      input: EditEventRsvpStatusInput,
    ) => T,
    viewer: ExampleViewerAlias,
    id: ID,
    input: EditEventRsvpStatusInput,
  ): Promise<Event> {
    const event = await Event.loadX(viewer, id);
    return new this(viewer, event, input).saveX();
  }
}
