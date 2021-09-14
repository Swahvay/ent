/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

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
import { AuthCode, User } from "../..";
import schema from "../../../schema/auth_code";

export interface AuthCodeInput {
  code?: string;
  userID?: ID | Builder<User>;
  emailAddress?: string | null;
  phoneNumber?: string | null;
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
  private input: AuthCodeInput;

  public constructor(
    public readonly viewer: Viewer,
    public readonly operation: WriteOperation,
    action: AuthCodeAction,
    public readonly existingEnt?: AuthCode | undefined,
  ) {
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}-AuthCode`;
    this.input = action.getInput();

    this.orchestrator = new Orchestrator({
      viewer: viewer,
      operation: this.operation,
      tableName: "auth_codes",
      key: "id",
      loaderOptions: AuthCode.loaderOptions(),
      builder: this,
      action: action,
      schema: schema,
      editedFields: () => {
        return this.getEditedFields.apply(this);
      },
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
    return await this.orchestrator.editedEnt();
  }

  async editedEntX(): Promise<AuthCode> {
    return await this.orchestrator.editedEntX();
  }

  private getEditedFields(): Map<string, any> {
    const fields = this.input;

    let result = new Map<string, any>();

    const addField = function (key: string, value: any) {
      if (value !== undefined) {
        result.set(key, value);
      }
    };
    addField("code", fields.code);
    addField("userID", fields.userID);
    addField("emailAddress", fields.emailAddress);
    addField("phoneNumber", fields.phoneNumber);
    return result;
  }

  isBuilder(node: ID | Ent | Builder<Ent>): node is Builder<Ent> {
    return (node as Builder<Ent>).placeholderID !== undefined;
  }

  // get value of code. Retrieves it from the input if specified or takes it from existingEnt
  getNewCodeValue(): string | undefined {
    return this.input.code || this.existingEnt?.code;
  }

  // get value of userID. Retrieves it from the input if specified or takes it from existingEnt
  getNewUserIDValue(): ID | Builder<User> | undefined {
    return this.input.userID || this.existingEnt?.userID;
  }

  // get value of emailAddress. Retrieves it from the input if specified or takes it from existingEnt
  getNewEmailAddressValue(): string | null | undefined {
    return this.input.emailAddress || this.existingEnt?.emailAddress;
  }

  // get value of phoneNumber. Retrieves it from the input if specified or takes it from existingEnt
  getNewPhoneNumberValue(): string | null | undefined {
    return this.input.phoneNumber || this.existingEnt?.phoneNumber;
  }
}
