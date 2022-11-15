/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import { Ent, ID } from "@snowtop/ent";
import {
  Action,
  Builder,
  Changeset,
  Orchestrator,
  WriteOperation,
  saveBuilder,
  saveBuilderX,
} from "@snowtop/ent/action";
import { Contact, User } from "../../..";
import { contactLoaderInfo } from "../../loaders";
import { FeedbackBuilder } from "../../mixins/feedback/actions/feedback_builder";
import { EdgeType, NodeType } from "../../types";
import schema from "../../../../schema/contact_schema";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

export interface ContactInput {
  emailIds?: ID[];
  phoneNumberIds?: ID[];
  firstName?: string;
  lastName?: string;
  userID?: ID | Builder<User, ExampleViewerAlias>;
  // allow other properties. useful for action-only fields
  [x: string]: any;
}

function randomNum(): string {
  return Math.random().toString(10).substring(2);
}

class Base {
  // @ts-ignore not assigning. need for Mixin
  orchestrator: Orchestrator<Contact, any, ExampleViewerAlias>;

  constructor() {}

  isBuilder<T extends Ent>(
    node: ID | T | Builder<T, any>,
  ): node is Builder<T, any> {
    return (node as Builder<T, any>).placeholderID !== undefined;
  }
}

type MaybeNull<T extends Ent> = T | null;
type TMaybleNullableEnt<T extends Ent> = T | MaybeNull<T>;

export class ContactBuilder<
    TInput extends ContactInput = ContactInput,
    TExistingEnt extends TMaybleNullableEnt<Contact> = Contact | null,
  >
  extends FeedbackBuilder(Base)
  implements Builder<Contact, ExampleViewerAlias, TExistingEnt>
{
  orchestrator: Orchestrator<Contact, TInput, ExampleViewerAlias, TExistingEnt>;
  readonly placeholderID: ID;
  readonly ent = Contact;
  readonly nodeType = NodeType.Contact;
  private input: TInput;
  private m: Map<string, any> = new Map();

  public constructor(
    public readonly viewer: ExampleViewerAlias,
    public readonly operation: WriteOperation,
    action: Action<
      Contact,
      Builder<Contact, ExampleViewerAlias, TExistingEnt>,
      ExampleViewerAlias,
      TInput,
      TExistingEnt
    >,
    public readonly existingEnt: TExistingEnt,
  ) {
    super();
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}-Contact`;
    this.input = action.getInput();
    const updateInput = (d: ContactInput) => this.updateInput.apply(this, [d]);

    this.orchestrator = new Orchestrator({
      viewer,
      operation: this.operation,
      tableName: "contacts",
      key: "id",
      loaderOptions: Contact.loaderOptions(),
      builder: this,
      action,
      schema,
      editedFields: () => this.getEditedFields.apply(this),
      updateInput,
      fieldInfo: contactLoaderInfo.fieldInfo,
    });
  }

  getInput(): TInput {
    return this.input;
  }

  updateInput(input: ContactInput) {
    // override input
    this.input = {
      ...this.input,
      ...input,
    };
  }

  deleteInputKey(key: keyof ContactInput) {
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

  async editedEnt(): Promise<Contact | null> {
    return this.orchestrator.editedEnt();
  }

  async editedEntX(): Promise<Contact> {
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
    addField("email_ids", input.emailIds);
    addField("phone_number_ids", input.phoneNumberIds);
    addField("firstName", input.firstName);
    addField("lastName", input.lastName);
    addField("userID", input.userID);
    return result;
  }

  isBuilder<T extends Ent>(
    node: ID | T | Builder<T, any>,
  ): node is Builder<T, any> {
    return (node as Builder<T, any>).placeholderID !== undefined;
  }

  // get value of email_ids. Retrieves it from the input if specified or takes it from existingEnt
  getNewEmailIdsValue(): ID[] {
    if (this.input.emailIds !== undefined) {
      return this.input.emailIds;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `emailIds` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.emailIds;
  }

  // get value of phone_number_ids. Retrieves it from the input if specified or takes it from existingEnt
  getNewPhoneNumberIdsValue(): ID[] {
    if (this.input.phoneNumberIds !== undefined) {
      return this.input.phoneNumberIds;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `phoneNumberIds` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.phoneNumberIds;
  }

  // get value of firstName. Retrieves it from the input if specified or takes it from existingEnt
  getNewFirstNameValue(): string {
    if (this.input.firstName !== undefined) {
      return this.input.firstName;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `firstName` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.firstName;
  }

  // get value of lastName. Retrieves it from the input if specified or takes it from existingEnt
  getNewLastNameValue(): string {
    if (this.input.lastName !== undefined) {
      return this.input.lastName;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `lastName` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.lastName;
  }

  // get value of userID. Retrieves it from the input if specified or takes it from existingEnt
  getNewUserIDValue(): ID | Builder<User, ExampleViewerAlias> {
    if (this.input.userID !== undefined) {
      return this.input.userID;
    }

    if (!this.existingEnt) {
      throw new Error(
        "no value to return for `userID` since not in input and no existingEnt",
      );
    }
    return this.existingEnt.userID;
  }
}
