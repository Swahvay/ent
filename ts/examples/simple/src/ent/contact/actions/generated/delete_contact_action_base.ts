// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  Action,
  saveBuilder,
  saveBuilderXNoEnt,
  WriteOperation,
  Changeset,
} from "ent/action";
import { Viewer } from "ent/ent";
import Contact from "src/ent/contact";
import {
  ContactBuilder,
  ContactInput,
} from "src/ent/contact/actions/contact_builder";

export class DeleteContactActionBase implements Action<Contact> {
  public readonly builder: ContactBuilder;
  public readonly viewer: Viewer;

  constructor(viewer: Viewer, contact: Contact) {
    this.viewer = viewer;
    this.builder = new ContactBuilder(
      this.viewer,
      WriteOperation.Delete,
      this,
      contact,
    );
  }

  getInput(): ContactInput {
    return {
      requiredFields: [],
    };
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

  async save(): Promise<void> {
    await saveBuilder(this.builder);
  }

  async saveX(): Promise<void> {
    await saveBuilderXNoEnt(this.builder);
  }

  static create<T extends DeleteContactActionBase>(
    this: new (viewer: Viewer, contact: Contact) => T,
    viewer: Viewer,
    contact: Contact,
  ): DeleteContactActionBase {
    return new this(viewer, contact);
  }
}
