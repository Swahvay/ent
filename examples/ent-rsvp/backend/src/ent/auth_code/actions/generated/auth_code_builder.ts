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
import { AuthCode, Guest } from "src/ent/";
import { NodeType } from "src/ent/generated/const";
import schema from "src/schema/auth_code";

export interface AuthCodeInput {
  code?: string;
  guestID?: ID | Builder<Guest>;
  emailAddress?: string;
  sentCode?: boolean;
}

export interface AuthCodeAction extends Action<AuthCode> {
  getInput(): AuthCodeInput;
}

function randomNum(): string {
  return Math.random().toString(10).substring(2);
}

export class AuthCodeBuilder implements Builder<AuthCode> {
  orchestrator: Orchestrator<AuthCode>;
  readonly placeholderID: ID;
  readonly ent = AuthCode;
  readonly nodeType = NodeType.AuthCode;
  private input: AuthCodeInput;
  private m: Map<string, any> = new Map();

  public constructor(
    public readonly viewer: Viewer,
    public readonly operation: WriteOperation,
    action: AuthCodeAction,
    public readonly existingEnt?: AuthCode | undefined,
  ) {
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}-AuthCode`;
    this.input = action.getInput();
    const updateInput = (d: AuthCodeInput) => this.updateInput.apply(this, [d]);

    this.orchestrator = new Orchestrator({
      viewer,
      operation: this.operation,
      tableName: "auth_codes",
      key: "id",
      loaderOptions: AuthCode.loaderOptions(),
      builder: this,
      action,
      schema,
      editedFields: () => this.getEditedFields.apply(this),
      updateInput,
    });
  }

  getInput(): AuthCodeInput {
    return this.input;
  }

  updateInput(input: AuthCodeInput) {
    // override input
    this.input = {
      ...this.input,
      ...input,
    };
  }

  deleteInputKey(key: string) {
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

  async build(): Promise<Changeset<AuthCode>> {
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

  async editedEnt(): Promise<AuthCode | null> {
    return this.orchestrator.editedEnt();
  }

  async editedEntX(): Promise<AuthCode> {
    return this.orchestrator.editedEntX();
  }

  private async getEditedFields(): Promise<Map<string, any>> {
    const fields = this.input;

    const result = new Map<string, any>();

    const addField = function (key: string, value: any) {
      if (value !== undefined) {
        result.set(key, value);
      }
    };
    addField("code", fields.code);
    addField("guestID", fields.guestID);
    addField("emailAddress", fields.emailAddress);
    addField("sentCode", fields.sentCode);
    return result;
  }

  isBuilder(node: ID | Ent | Builder<Ent>): node is Builder<Ent> {
    return (node as Builder<Ent>).placeholderID !== undefined;
  }

  // get value of code. Retrieves it from the input if specified or takes it from existingEnt
  getNewCodeValue(): string | undefined {
    if (this.input.code !== undefined) {
      return this.input.code;
    }
    return this.existingEnt?.code;
  }

  // get value of guestID. Retrieves it from the input if specified or takes it from existingEnt
  getNewGuestIDValue(): ID | Builder<Guest> | undefined {
    if (this.input.guestID !== undefined) {
      return this.input.guestID;
    }
    return this.existingEnt?.guestID;
  }

  // get value of emailAddress. Retrieves it from the input if specified or takes it from existingEnt
  getNewEmailAddressValue(): string | undefined {
    if (this.input.emailAddress !== undefined) {
      return this.input.emailAddress;
    }
    return this.existingEnt?.emailAddress;
  }

  // get value of sentCode. Retrieves it from the input if specified or takes it from existingEnt
  getNewSentCodeValue(): boolean | undefined {
    if (this.input.sentCode !== undefined) {
      return this.input.sentCode;
    }
    return this.existingEnt?.sentCode;
  }
}
