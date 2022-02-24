// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  Ent,
  ID,
  LoadEntOptions,
  Viewer,
  loadEnt,
  loadEntX,
} from "@snowtop/ent";
import { Account, Tag, Todo } from "src/ent/";
import { NodeType } from "./const";

export async function loadEntByType(
  viewer: Viewer,
  type: NodeType,
  id: ID,
): Promise<Ent | null> {
  return loadEnt(viewer, id, getLoaderOptions(type));
}

export async function loadEntXByType(
  viewer: Viewer,
  type: NodeType,
  id: ID,
): Promise<Ent> {
  return loadEntX(viewer, id, getLoaderOptions(type));
}

export function getLoaderOptions(type: NodeType): LoadEntOptions<Ent> {
  switch (type) {
    case NodeType.Account:
      return Account.loaderOptions();
    case NodeType.Tag:
      return Tag.loaderOptions();
    case NodeType.Todo:
      return Todo.loaderOptions();
    default:
      throw new Error(`invalid nodeType ${type} passed to getLoaderOptions`);
  }
}
