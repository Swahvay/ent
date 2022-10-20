// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { Ent, ID, Viewer } from "@snowtop/ent";
import {
  Action,
  Builder,
  Changeset,
  Orchestrator,
  WriteOperation,
  saveBuilder,
  saveBuilderX,
} from "@snowtop/ent/action";
import { Event, Guest, GuestData, GuestDataSource } from "src/ent/";
import { NodeType } from "src/ent/generated/const";
import { guestDataLoaderInfo } from "src/ent/generated/loaders";
import schema from "src/schema/guest_data_schema";

export interface GuestDataInput {
  guestID?: ID | Builder<Guest, Viewer>;
  eventID?: ID | Builder<Event, Viewer>;
  dietaryRestrictions?: string;
  source?: GuestDataSource | null;
  // allow other properties. useful for action-only fields
  [x: string]: any;
}

function randomNum(): string {
  return Math.random().toString(10).substring(2);
}

type MaybeNull<T extends Ent> = T | null;
type TMaybleNullableEnt<T extends Ent> = T | MaybeNull<T>;

export class GuestDataBuilder<
  TInput extends GuestDataInput = GuestDataInput,
  TExistingEnt extends TMaybleNullableEnt<GuestData> = GuestData | null,
> implements Builder<GuestData, Viewer, TExistingEnt>
{
  orchestrator: Orchestrator<GuestData, TInput, Viewer, TExistingEnt>;
  readonly placeholderID: ID;
  readonly ent = GuestData;
  readonly nodeType = NodeType.GuestData;
  private input: TInput;
  private m: Map<string, any> = new Map();

  public constructor(
    public readonly viewer: Viewer,
    public readonly operation: WriteOperation,
    action: Action<
      GuestData,
      Builder<GuestData, Viewer, TExistingEnt>,
      Viewer,
      TInput,
      TExistingEnt
    >,
    public readonly existingEnt: TExistingEnt,
  ) {
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}-GuestData`;
    this.input = action.getInput();
    const updateInput = (d: GuestDataInput) =>
      this.updateInput.apply(this, [d]);

    this.orchestrator = new Orchestrator({
      viewer,
      operation: this.operation,
      tableName: "guest_data",
      key: "id",
      loaderOptions: GuestData.loaderOptions(),
      builder: this,
      action,
      schema,
      editedFields: () => this.getEditedFields.apply(this),
      updateInput,
      fieldInfo: guestDataLoaderInfo.fieldInfo,
    });
  }

  getInput(): TInput {
    return this.input;
  }

  updateInput(input: GuestDataInput) {
    // override input
    this.input = {
      ...this.input,
      ...input,
    };
  }

  deleteInputKey(key: keyof GuestDataInput) {
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

  async editedEnt(): Promise<GuestData | null> {
    return this.orchestrator.editedEnt();
  }

  async editedEntX(): Promise<GuestData> {
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
    addField("guestID", input.guestID);
    addField("eventID", input.eventID);
    addField("dietaryRestrictions", input.dietaryRestrictions);
    addField("source", input.source);
    return result;
  }

  isBuilder<T extends Ent>(
    node: ID | T | Builder<T, any>,
  ): node is Builder<T, any> {
    return (node as Builder<T, any>).placeholderID !== undefined;
  }

  // get value of guestID. Retrieves it from the input if specified or takes it from existingEnt
  getNewGuestIDValue(): ID | Builder<Guest, Viewer> {
    if (this.input.guestID !== undefined) {
      return this.input.guestID;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `guestID` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.guestID;
  }

  // get value of eventID. Retrieves it from the input if specified or takes it from existingEnt
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

  // get value of dietaryRestrictions. Retrieves it from the input if specified or takes it from existingEnt
  getNewDietaryRestrictionsValue(): string {
    if (this.input.dietaryRestrictions !== undefined) {
      return this.input.dietaryRestrictions;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `dietaryRestrictions` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.dietaryRestrictions;
  }

  // get value of source. Retrieves it from the input if specified or takes it from existingEnt
  getNewSourceValue(): GuestDataSource | null {
    if (this.input.source !== undefined) {
      return this.input.source;
    }

    return this.existingEnt?.source ?? null;
  }
}
