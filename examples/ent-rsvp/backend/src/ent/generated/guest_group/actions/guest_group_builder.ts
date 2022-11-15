// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { AssocEdgeInputOptions, Ent, ID, Viewer } from "@snowtop/ent";
import {
  Action,
  Builder,
  Changeset,
  Orchestrator,
  WriteOperation,
  saveBuilder,
  saveBuilderX,
} from "@snowtop/ent/action";
import { Event, EventActivity, GuestGroup } from "src/ent/";
import { guestGroupLoaderInfo } from "src/ent/generated/loaders";
import { EdgeType, NodeType } from "src/ent/generated/types";
import schema from "src/schema/guest_group_schema";

export interface GuestGroupInput {
  invitationName?: string;
  eventID?: ID | Builder<Event, Viewer>;
  // allow other properties. useful for action-only fields
  [x: string]: any;
}

function randomNum(): string {
  return Math.random().toString(10).substring(2);
}

type MaybeNull<T extends Ent> = T | null;
type TMaybleNullableEnt<T extends Ent> = T | MaybeNull<T>;

export class GuestGroupBuilder<
  TInput extends GuestGroupInput = GuestGroupInput,
  TExistingEnt extends TMaybleNullableEnt<GuestGroup> = GuestGroup | null,
> implements Builder<GuestGroup, Viewer, TExistingEnt>
{
  orchestrator: Orchestrator<GuestGroup, TInput, Viewer, TExistingEnt>;
  readonly placeholderID: ID;
  readonly ent = GuestGroup;
  readonly nodeType = NodeType.GuestGroup;
  private input: TInput;
  private m: Map<string, any> = new Map();

  public constructor(
    public readonly viewer: Viewer,
    public readonly operation: WriteOperation,
    action: Action<
      GuestGroup,
      Builder<GuestGroup, Viewer, TExistingEnt>,
      Viewer,
      TInput,
      TExistingEnt
    >,
    public readonly existingEnt: TExistingEnt,
  ) {
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}-GuestGroup`;
    this.input = action.getInput();
    const updateInput = (d: GuestGroupInput) =>
      this.updateInput.apply(this, [d]);

    this.orchestrator = new Orchestrator({
      viewer,
      operation: this.operation,
      tableName: "guest_groups",
      key: "id",
      loaderOptions: GuestGroup.loaderOptions(),
      builder: this,
      action,
      schema,
      editedFields: () => this.getEditedFields.apply(this),
      updateInput,
      fieldInfo: guestGroupLoaderInfo.fieldInfo,
    });
  }

  getInput(): TInput {
    return this.input;
  }

  updateInput(input: GuestGroupInput) {
    // override input
    this.input = {
      ...this.input,
      ...input,
    };
  }

  deleteInputKey(key: keyof GuestGroupInput) {
    delete this.input[key];
  }

  // store data in Builder that can be retrieved by another validator, trigger, observer later in the action
  storeData(k: string, v: any) {
    this.m.set(k, v);
  }

  // retrieve data stored in this Builder with key
  getStoredData(k: string) {
    return this.m.get(k);
  }

  // this returns the id of the existing ent or the id of the ent that's being created
  async getEntID() {
    if (this.existingEnt) {
      return this.existingEnt.id;
    }
    const edited = await this.orchestrator.getEditedData();
    if (!edited.id) {
      throw new Error(
        `couldn't get the id field. should have been set by 'defaultValueOnCreate'`,
      );
    }
    return edited.id;
  }
  // this gets the inputs that have been written for a given edgeType and operation
  // WriteOperation.Insert for adding an edge and WriteOperation.Delete for deleting an edge
  getEdgeInputData(edgeType: EdgeType, op: WriteOperation) {
    return this.orchestrator.getInputEdges(edgeType, op);
  }

  clearInputEdges(edgeType: EdgeType, op: WriteOperation, id?: ID) {
    this.orchestrator.clearInputEdges(edgeType, op, id);
  }

  addGuestGroupToInvitedEvent(
    ...nodes: (ID | EventActivity | Builder<EventActivity, any>)[]
  ): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addGuestGroupToInvitedEventID(node);
      } else if (typeof node === "object") {
        this.addGuestGroupToInvitedEventID(node.id);
      } else {
        this.addGuestGroupToInvitedEventID(node);
      }
    }
    return this;
  }

  addGuestGroupToInvitedEventID(
    id: ID | Builder<EventActivity, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.GuestGroupToInvitedEvents,
      NodeType.EventActivity,
      options,
    );
    return this;
  }

  removeGuestGroupToInvitedEvent(...nodes: (ID | EventActivity)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.GuestGroupToInvitedEvents,
        );
      } else {
        this.orchestrator.removeOutboundEdge(
          node,
          EdgeType.GuestGroupToInvitedEvents,
        );
      }
    }
    return this;
  }

  async build(): Promise<Changeset> {
    return this.orchestrator.build();
  }

  async valid(): Promise<boolean> {
    return this.orchestrator.valid();
  }

  async validX(): Promise<void> {
    return this.orchestrator.validX();
  }

  async save(): Promise<void> {
    await saveBuilder(this);
  }

  async saveX(): Promise<void> {
    await saveBuilderX(this);
  }

  async editedEnt(): Promise<GuestGroup | null> {
    return this.orchestrator.editedEnt();
  }

  async editedEntX(): Promise<GuestGroup> {
    return this.orchestrator.editedEntX();
  }

  private async getEditedFields(): Promise<Map<string, any>> {
    const input = this.input;

    const result = new Map<string, any>();

    const addField = function (key: string, value: any) {
      if (value !== undefined) {
        result.set(key, value);
      }
    };
    addField("InvitationName", input.invitationName);
    addField("EventID", input.eventID);
    return result;
  }

  isBuilder<T extends Ent>(
    node: ID | T | Builder<T, any>,
  ): node is Builder<T, any> {
    return (node as Builder<T, any>).placeholderID !== undefined;
  }

  // get value of InvitationName. Retrieves it from the input if specified or takes it from existingEnt
  getNewInvitationNameValue(): string {
    if (this.input.invitationName !== undefined) {
      return this.input.invitationName;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `invitationName` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.invitationName;
  }

  // get value of EventID. Retrieves it from the input if specified or takes it from existingEnt
  getNewEventIDValue(): ID | Builder<Event, Viewer> {
    if (this.input.eventID !== undefined) {
      return this.input.eventID;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `eventID` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.eventID;
  }
}
