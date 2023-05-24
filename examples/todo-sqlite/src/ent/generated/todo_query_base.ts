// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  AssocEdgeCountLoaderFactory,
  AssocEdgeLoaderFactory,
  AssocEdgeQueryBase,
  CustomEdgeQueryBase,
  EdgeQuerySource,
  Ent,
  ID,
  Viewer,
} from "@snowtop/ent";
import { getLoaderOptions } from "src/ent/generated/loadAny";
import { EdgeType, NodeType } from "src/ent/generated/types";
import {
  Tag,
  TagToTodosQuery,
  Todo,
  TodoToTagsEdge,
  TodoToTodoScopeEdge,
} from "src/ent/internal";

export const todoToTagsCountLoaderFactory = new AssocEdgeCountLoaderFactory(
  EdgeType.TodoToTags,
);
export const todoToTagsDataLoaderFactory = new AssocEdgeLoaderFactory(
  EdgeType.TodoToTags,
  () => TodoToTagsEdge,
);

export const todoToTodoScopeCountLoaderFactory =
  new AssocEdgeCountLoaderFactory(EdgeType.TodoToTodoScope);
export const todoToTodoScopeDataLoaderFactory = new AssocEdgeLoaderFactory(
  EdgeType.TodoToTodoScope,
  () => TodoToTodoScopeEdge,
);

export abstract class TodoToTagsQueryBase extends AssocEdgeQueryBase<
  Todo,
  Tag,
  TodoToTagsEdge,
  Viewer
> {
  constructor(viewer: Viewer, src: EdgeQuerySource<Todo, Tag, Viewer>) {
    super(
      viewer,
      src,
      todoToTagsCountLoaderFactory,
      todoToTagsDataLoaderFactory,
      Tag.loaderOptions(),
    );
  }

  static query<T extends TodoToTagsQueryBase>(
    this: new (
      viewer: Viewer,
      src: EdgeQuerySource<Todo, Tag>,
    ) => T,
    viewer: Viewer,
    src: EdgeQuerySource<Todo, Tag>,
  ): T {
    return new this(viewer, src);
  }

  sourceEnt(id: ID) {
    return Todo.load(this.viewer, id);
  }

  queryTodos(): TagToTodosQuery {
    return TagToTodosQuery.query(this.viewer, this);
  }
}

export abstract class TodoToTodoScopeQueryBase extends AssocEdgeQueryBase<
  Todo,
  Ent<Viewer>,
  TodoToTodoScopeEdge,
  Viewer
> {
  constructor(viewer: Viewer, src: EdgeQuerySource<Todo, Ent<Viewer>, Viewer>) {
    super(
      viewer,
      src,
      todoToTodoScopeCountLoaderFactory,
      todoToTodoScopeDataLoaderFactory,
      (str) => getLoaderOptions(str as NodeType),
    );
  }

  static query<T extends TodoToTodoScopeQueryBase>(
    this: new (
      viewer: Viewer,
      src: EdgeQuerySource<Todo, Ent<Viewer>>,
    ) => T,
    viewer: Viewer,
    src: EdgeQuerySource<Todo, Ent<Viewer>>,
  ): T {
    return new this(viewer, src);
  }

  sourceEnt(id: ID) {
    return Todo.load(this.viewer, id);
  }
}

export class ScopeToTodosQueryBase<
  TEnt extends Ent<Viewer> = Ent<Viewer>,
> extends CustomEdgeQueryBase<TEnt, Todo, Viewer> {
  constructor(viewer: Viewer, private srcEnt: TEnt, sortColumn?: string) {
    super(viewer, {
      src: srcEnt,
      groupCol: "scope_id",
      loadEntOptions: Todo.loaderOptions(),
      name: "ScopeToTodosQuery",
      sortColumn,
    });
  }

  static query<
    T extends ScopeToTodosQueryBase,
    TEnt extends Ent<Viewer> = Ent<Viewer>,
  >(this: new (viewer: Viewer, src: TEnt) => T, viewer: Viewer, src: TEnt): T {
    return new this(viewer, src);
  }

  async sourceEnt(_id: ID) {
    return this.srcEnt;
  }
}
