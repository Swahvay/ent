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
import { Action, Changeset, WriteOperation } from "@snowtop/ent/action";
import { User } from "../../..";
import { UserBuilder } from "./user_builder";

export interface DeleteUserInput2 {
  log: boolean;
}

export class DeleteUserAction2Base
  implements Action<User, UserBuilder<DeleteUserInput2>, DeleteUserInput2>
{
  public readonly builder: UserBuilder<DeleteUserInput2>;
  public readonly viewer: Viewer;
  protected input: DeleteUserInput2;
  protected user: User;

  constructor(viewer: Viewer, user: User, input: DeleteUserInput2) {
    this.viewer = viewer;
    this.input = input;
    this.builder = new UserBuilder(
      this.viewer,
      WriteOperation.Delete,
      this,
      user,
    );
    this.user = user;
  }

  getPrivacyPolicy(): PrivacyPolicy<User> {
    return AllowIfViewerHasIdentityPrivacyPolicy;
  }

  getInput(): DeleteUserInput2 {
    return this.input;
  }

  async changeset(): Promise<Changeset<User>> {
    return this.builder.build();
  }

  async valid(): Promise<boolean> {
    return this.builder.valid();
  }

  async validX(): Promise<void> {
    await this.builder.validX();
  }

  async save(): Promise<void> {
    await this.builder.save();
  }

  async saveX(): Promise<void> {
    await this.builder.saveX();
  }

  static create<T extends DeleteUserAction2Base>(
    this: new (viewer: Viewer, user: User, input: DeleteUserInput2) => T,
    viewer: Viewer,
    user: User,
    input: DeleteUserInput2,
  ): T {
    return new this(viewer, user, input);
  }

  static async saveXFromID<T extends DeleteUserAction2Base>(
    this: new (viewer: Viewer, user: User, input: DeleteUserInput2) => T,
    viewer: Viewer,
    id: ID,
    input: DeleteUserInput2,
  ): Promise<void> {
    const user = await User.loadX(viewer, id);
    return new this(viewer, user, input).saveX();
  }
}
