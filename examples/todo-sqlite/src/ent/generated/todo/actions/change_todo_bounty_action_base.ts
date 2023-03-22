// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  AllowIfViewerHasIdentityPrivacyPolicy,
  Clause,
  ID,
  PrivacyPolicy,
  Viewer,
} from "@snowtop/ent";
import {
  Action,
  Changeset,
  Observer,
  RelativeNumberValue,
  Trigger,
  Validator,
  WriteOperation,
  maybeConvertRelativeInputPlusExpressions,
} from "@snowtop/ent/action";
import { Todo } from "src/ent/";
import { TodoBuilder } from "src/ent/generated/todo/actions/todo_builder";

export interface ChangeTodoBountyRelativeInput {
  bounty?: number | null | RelativeNumberValue<number>;
}

export interface ChangeTodoBountyInput extends ChangeTodoBountyRelativeInput {
  bounty?: number | null;
}

export type ChangeTodoBountyActionTriggers = (
  | Trigger<
      Todo,
      TodoBuilder<ChangeTodoBountyInput, Todo>,
      Viewer,
      ChangeTodoBountyInput,
      Todo
    >
  | Trigger<
      Todo,
      TodoBuilder<ChangeTodoBountyInput, Todo>,
      Viewer,
      ChangeTodoBountyInput,
      Todo
    >[]
)[];

export type ChangeTodoBountyActionObservers = Observer<
  Todo,
  TodoBuilder<ChangeTodoBountyInput, Todo>,
  Viewer,
  ChangeTodoBountyInput,
  Todo
>[];

export type ChangeTodoBountyActionValidators = Validator<
  Todo,
  TodoBuilder<ChangeTodoBountyInput, Todo>,
  Viewer,
  ChangeTodoBountyInput,
  Todo
>[];

export class ChangeTodoBountyActionBase
  implements
    Action<
      Todo,
      TodoBuilder<ChangeTodoBountyInput, Todo>,
      Viewer,
      ChangeTodoBountyInput,
      Todo
    >
{
  public readonly builder: TodoBuilder<ChangeTodoBountyInput, Todo>;
  public readonly viewer: Viewer;
  protected input: ChangeTodoBountyInput;
  protected readonly todo: Todo;

  constructor(
    viewer: Viewer,
    todo: Todo,
    input: ChangeTodoBountyRelativeInput,
  ) {
    this.viewer = viewer;
    let expressions = new Map<string, Clause>();
    const data = todo.___getRawDBData();
    // @ts-expect-error converted below
    this.input = input;
    if (input.bounty !== undefined) {
      input.bounty = maybeConvertRelativeInputPlusExpressions(
        input.bounty,
        "bounty",
        data.bounty,
        expressions,
      );
    }
    this.builder = new TodoBuilder(
      this.viewer,
      WriteOperation.Edit,
      this,
      todo,
      { expressions },
    );
    this.todo = todo;
  }

  getPrivacyPolicy(): PrivacyPolicy<Todo, Viewer> {
    return AllowIfViewerHasIdentityPrivacyPolicy;
  }

  getTriggers(): ChangeTodoBountyActionTriggers {
    return [];
  }

  getObservers(): ChangeTodoBountyActionObservers {
    return [];
  }

  getValidators(): ChangeTodoBountyActionValidators {
    return [];
  }

  getInput(): ChangeTodoBountyInput {
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

  async save(): Promise<Todo | null> {
    await this.builder.save();
    return this.builder.editedEnt();
  }

  async saveX(): Promise<Todo> {
    await this.builder.saveX();
    return this.builder.editedEntX();
  }

  static create<T extends ChangeTodoBountyActionBase>(
    this: new (
      viewer: Viewer,
      todo: Todo,
      input: ChangeTodoBountyRelativeInput,
    ) => T,
    viewer: Viewer,
    todo: Todo,
    input: ChangeTodoBountyRelativeInput,
  ): T {
    return new this(viewer, todo, input);
  }

  static async saveXFromID<T extends ChangeTodoBountyActionBase>(
    this: new (
      viewer: Viewer,
      todo: Todo,
      input: ChangeTodoBountyRelativeInput,
    ) => T,
    viewer: Viewer,
    id: ID,
    input: ChangeTodoBountyInput,
  ): Promise<Todo> {
    const todo = await Todo.loadX(viewer, id);
    return new this(viewer, todo, input).saveX();
  }
}
