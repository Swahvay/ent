// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  AllowIfViewerHasIdentityPrivacyPolicy,
  ID,
  PrivacyPolicy,
  Viewer,
} from "@snowtop/ent";
import {
  Action,
  Changeset,
  Observer,
  Trigger,
  Validator,
  WriteOperation,
} from "@snowtop/ent/action";
import { EventActivity, GuestGroup } from "src/ent/";
import {
  EventActivityBuilder,
  EventActivityInput,
} from "src/ent/generated/event_activity/actions/event_activity_builder";

export type EventActivityRemoveInviteActionTriggers = (
  | Trigger<
      EventActivity,
      EventActivityBuilder<EventActivityInput, EventActivity>,
      Viewer,
      EventActivityInput,
      EventActivity
    >
  | Trigger<
      EventActivity,
      EventActivityBuilder<EventActivityInput, EventActivity>,
      Viewer,
      EventActivityInput,
      EventActivity
    >[]
)[];

export type EventActivityRemoveInviteActionObservers = Observer<
  EventActivity,
  EventActivityBuilder<EventActivityInput, EventActivity>,
  Viewer,
  EventActivityInput,
  EventActivity
>[];

export type EventActivityRemoveInviteActionValidators = Validator<
  EventActivity,
  EventActivityBuilder<EventActivityInput, EventActivity>,
  Viewer,
  EventActivityInput,
  EventActivity
>[];

export class EventActivityRemoveInviteActionBase
  implements
    Action<
      EventActivity,
      EventActivityBuilder<EventActivityInput, EventActivity>,
      Viewer,
      EventActivityInput,
      EventActivity
    >
{
  public readonly builder: EventActivityBuilder<
    EventActivityInput,
    EventActivity
  >;
  public readonly viewer: Viewer;
  protected readonly eventActivity: EventActivity;

  constructor(viewer: Viewer, eventActivity: EventActivity) {
    this.viewer = viewer;
    this.builder = new EventActivityBuilder(
      this.viewer,
      WriteOperation.Edit,
      this,
      eventActivity,
    );
    this.eventActivity = eventActivity;
  }

  getPrivacyPolicy(): PrivacyPolicy<EventActivity, Viewer> {
    return AllowIfViewerHasIdentityPrivacyPolicy;
  }

  getTriggers(): EventActivityRemoveInviteActionTriggers {
    return [];
  }

  getObservers(): EventActivityRemoveInviteActionObservers {
    return [];
  }

  getValidators(): EventActivityRemoveInviteActionValidators {
    return [];
  }

  getInput(): EventActivityInput {
    return {};
  }

  removeInvite(...nodes: (ID | GuestGroup)[]): this {
    nodes.forEach((node) => this.builder.removeInvite(node));
    return this;
  }
  async changeset(): Promise<Changeset> {
    return this.builder.build();
  }

  async valid(): Promise<boolean> {
    return this.builder.valid();
  }

  async validX(): Promise<void> {
    await this.builder.validX();
  }

  async save(): Promise<EventActivity | null> {
    await this.builder.save();
    return this.builder.editedEnt();
  }

  async saveX(): Promise<EventActivity> {
    await this.builder.saveX();
    return this.builder.editedEntX();
  }

  static create<T extends EventActivityRemoveInviteActionBase>(
    this: new (
      viewer: Viewer,
      eventActivity: EventActivity,
    ) => T,
    viewer: Viewer,
    eventActivity: EventActivity,
  ): T {
    return new this(viewer, eventActivity);
  }

  static async saveXFromID<T extends EventActivityRemoveInviteActionBase>(
    this: new (
      viewer: Viewer,
      eventActivity: EventActivity,
    ) => T,
    viewer: Viewer,
    id: ID,
    inviteID: ID,
  ): Promise<EventActivity> {
    const eventActivity = await EventActivity.loadX(viewer, id);
    return new this(viewer, eventActivity).removeInvite(inviteID).saveX();
  }
}
