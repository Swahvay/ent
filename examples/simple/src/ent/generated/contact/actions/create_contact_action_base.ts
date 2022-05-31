/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  AllowIfViewerHasIdentityPrivacyPolicy,
  ID,
  PrivacyPolicy,
  Viewer,
} from "@snowtop/ent";
import {
  Action,
  Builder,
  Changeset,
  WriteOperation,
} from "@snowtop/ent/action";
import { Contact, User } from "../../..";
import { ContactBuilder } from "./contact_builder";

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
  userID: ID | Builder<User>;
  emails?: customEmailInput[] | null;
  phoneNumbers?: customPhoneNumberInput[] | null;
}

export class CreateContactActionBase
  implements
    Action<
      Contact,
      ContactBuilder<ContactCreateInput, Contact | null>,
      ContactCreateInput,
      Contact | null
    >
{
  public readonly builder: ContactBuilder<ContactCreateInput, Contact | null>;
  public readonly viewer: Viewer;
  protected input: ContactCreateInput;

  constructor(viewer: Viewer, input: ContactCreateInput) {
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

  getInput(): ContactCreateInput {
    return this.input;
  }

  async changeset(): Promise<Changeset<Contact>> {
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
    this: new (viewer: Viewer, input: ContactCreateInput) => T,
    viewer: Viewer,
    input: ContactCreateInput,
  ): T {
    return new this(viewer, input);
  }
}
