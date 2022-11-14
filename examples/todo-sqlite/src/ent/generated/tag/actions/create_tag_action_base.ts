// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

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
  Observer,
  Trigger,
  Validator,
  WriteOperation,
} from "@snowtop/ent/action";
import { Account, Tag } from "src/ent/";
import { TagBuilder } from "src/ent/generated/tag/actions/tag_builder";

export interface TagCreateInput {
  displayName: string;
  ownerID: ID | Builder<Account, Viewer>;
  relatedTagIds?: ID[] | null;
  canonicalName?: string;
}

export type CreateTagActionTriggers = (
  | Trigger<
      Tag,
      TagBuilder<TagCreateInput, Tag | null>,
      Viewer,
      TagCreateInput,
      Tag | null
    >
  | Trigger<
      Tag,
      TagBuilder<TagCreateInput, Tag | null>,
      Viewer,
      TagCreateInput,
      Tag | null
    >[]
)[];

export type CreateTagActionObservers = Observer<
  Tag,
  TagBuilder<TagCreateInput, Tag | null>,
  Viewer,
  TagCreateInput,
  Tag | null
>[];

export type CreateTagActionValidators = Validator<
  Tag,
  TagBuilder<TagCreateInput, Tag | null>,
  Viewer,
  TagCreateInput,
  Tag | null
>[];

export class CreateTagActionBase
  implements
    Action<
      Tag,
      TagBuilder<TagCreateInput, Tag | null>,
      Viewer,
      TagCreateInput,
      Tag | null
    >
{
  public readonly builder: TagBuilder<TagCreateInput, Tag | null>;
  public readonly viewer: Viewer;
  protected input: TagCreateInput;

  constructor(viewer: Viewer, input: TagCreateInput) {
    this.viewer = viewer;
    this.input = input;
    this.builder = new TagBuilder(
      this.viewer,
      WriteOperation.Insert,
      this,
      null,
    );
  }

  getPrivacyPolicy(): PrivacyPolicy<Tag, Viewer> {
    return AllowIfViewerHasIdentityPrivacyPolicy;
  }

  getTriggers(): CreateTagActionTriggers {
    return [];
  }

  getObservers(): CreateTagActionObservers {
    return [];
  }

  getValidators(): CreateTagActionValidators {
    return [];
  }

  getInput(): TagCreateInput {
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

  async save(): Promise<Tag | null> {
    await this.builder.save();
    return this.builder.editedEnt();
  }

  async saveX(): Promise<Tag> {
    await this.builder.saveX();
    return this.builder.editedEntX();
  }

  static create<T extends CreateTagActionBase>(
    this: new (
      viewer: Viewer,
      input: TagCreateInput,
    ) => T,
    viewer: Viewer,
    input: TagCreateInput,
  ): T {
    return new this(viewer, input);
  }
}
