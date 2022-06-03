/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  AllowIfViewerHasIdentityPrivacyPolicy,
  ID,
  PrivacyPolicy,
} from "@snowtop/ent";
import {
  Action,
  Builder,
  Changeset,
  Observer,
  Trigger,
  Validator,
  WriteOperation,
} from "@snowtop/ent/action";
import { Contact, User } from "../../..";
import { ContactBuilder } from "./contact_builder";
import { ExampleViewer } from "../../../../viewer/viewer";

interface customEmailInput {
  emailAddress: string;
  label: string;
}

interface customPhoneNumberInput {
  phoneNumber: string;
  label: string;
}
export interface ContactCreateInput {
  firstName: string;
  lastName: string;
  userID: ID | Builder<User, ExampleViewer>;
  emails?: customEmailInput[] | null;
  phoneNumbers?: customPhoneNumberInput[] | null;
}

export class CreateContactActionBase
  implements
    Action<
      Contact,
      ContactBuilder<ContactCreateInput, Contact | null>,
      ExampleViewer,
      ContactCreateInput,
      Contact | null
    >
{
  public readonly builder: ContactBuilder<ContactCreateInput, Contact | null>;
  public readonly viewer: ExampleViewer;
  protected input: ContactCreateInput;

  constructor(viewer: ExampleViewer, input: ContactCreateInput) {
    this.viewer = viewer;
    this.input = input;
    this.builder = new ContactBuilder(
      this.viewer,
      WriteOperation.Insert,
      this,
      null,
    );
  }

  getPrivacyPolicy(): PrivacyPolicy<Contact> {
    return AllowIfViewerHasIdentityPrivacyPolicy;
  }

  getTriggers(): Trigger<
    Contact,
    ContactBuilder<ContactCreateInput, Contact | null>,
    ExampleViewer,
    ContactCreateInput,
    Contact | null
  >[] {
    return [];
  }

  getObservers(): Observer<
    Contact,
    ContactBuilder<ContactCreateInput, Contact | null>,
    ExampleViewer,
    ContactCreateInput,
    Contact | null
  >[] {
    return [];
  }

  getValidators(): Validator<
    Contact,
    ContactBuilder<ContactCreateInput, Contact | null>,
    ExampleViewer,
    ContactCreateInput,
    Contact | null
  >[] {
    return [];
  }

  getInput(): ContactCreateInput {
    return this.input;
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

  async save(): Promise<Contact | null> {
    await this.builder.save();
    return this.builder.editedEnt();
  }

  async saveX(): Promise<Contact> {
    await this.builder.saveX();
    return this.builder.editedEntX();
  }

  static create<T extends CreateContactActionBase>(
    this: new (viewer: ExampleViewer, input: ContactCreateInput) => T,
    viewer: ExampleViewer,
    input: ContactCreateInput,
  ): T {
    return new this(viewer, input);
  }
}
