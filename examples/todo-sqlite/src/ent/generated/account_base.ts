// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import {
  AllowIfViewerPrivacyPolicy,
  Context,
  CustomQuery,
  Data,
  Ent,
  ID,
  LoadEntOptions,
  PrivacyPolicy,
  Viewer,
  convertDate,
  convertNullableDate,
  convertNullableJSON,
  convertNullableJSONList,
  getEdgeTypeInGroup,
  loadCustomCount,
  loadCustomData,
  loadCustomEnts,
  loadEnt,
  loadEntViaKey,
  loadEntX,
  loadEntXViaKey,
  loadEnts,
} from "@snowtop/ent";
import { Field, getFields, getFieldsWithPrivacy } from "@snowtop/ent/schema";
import {
  AccountPrefs,
  convertNullableAccountPrefs,
} from "src/ent/generated/account_prefs";
import {
  AccountPrefs2,
  convertNullableAccountPrefs2List,
} from "src/ent/generated/account_prefs_2";
import {
  accountLoader,
  accountLoaderInfo,
  accountNoTransformLoader,
  accountPhoneNumberLoader,
} from "src/ent/generated/loaders";
import {
  AccountToClosedTodosDupQuery,
  AccountToCreatedWorkspacesQuery,
  AccountToOpenTodosDupQuery,
  AccountToScopedTodosQuery,
  AccountToTagsQuery,
  AccountToTodosQuery,
  AccountToWorkspacesQuery,
  EdgeType,
  ITodoContainer,
  NodeType,
  Todo,
  TodoContainerMixin,
} from "src/ent/internal";
import schema from "src/schema/account_schema";

export enum AccountState {
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  DEACTIVATED = "DEACTIVATED",
  DISABLED = "DISABLED",
}

export enum AccountTodoStatus {
  OpenTodosDup = "openTodosDup",
  ClosedTodosDup = "closedTodosDup",
}

interface AccountDBData {
  id: ID;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  phone_number: string | null;
  account_state: AccountState | null;
  account_prefs: AccountPrefs | null;
  account_prefs_list: AccountPrefs2[] | null;
}

export class AccountBase
  extends TodoContainerMixin(class {})
  implements Ent<Viewer>, ITodoContainer
{
  readonly nodeType = NodeType.Account;
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  protected readonly deletedAt: Date | null;
  readonly name: string;
  readonly phoneNumber: string | null;
  readonly accountState: AccountState | null;
  readonly accountPrefs: AccountPrefs | null;
  readonly accountPrefsList: AccountPrefs2[] | null;

  constructor(public viewer: Viewer, protected data: Data) {
    // @ts-ignore pass to mixin
    super(viewer, data);
    this.id = data.id;
    this.createdAt = convertDate(data.created_at);
    this.updatedAt = convertDate(data.updated_at);
    this.deletedAt = convertNullableDate(data.deleted_at);
    this.name = data.name;
    this.phoneNumber = data.phone_number;
    this.accountState = data.account_state;
    this.accountPrefs = convertNullableAccountPrefs(
      convertNullableJSON(data.account_prefs),
    );
    this.accountPrefsList = convertNullableAccountPrefs2List(
      convertNullableJSONList(data.account_prefs_list),
    );
  }

  getPrivacyPolicy(): PrivacyPolicy<this, Viewer> {
    return AllowIfViewerPrivacyPolicy;
  }

  static async load<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    id: ID,
  ): Promise<T | null> {
    return (await loadEnt(
      viewer,
      id,
      AccountBase.loaderOptions.apply(this),
    )) as T | null;
  }

  static async loadX<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    id: ID,
  ): Promise<T> {
    return (await loadEntX(
      viewer,
      id,
      AccountBase.loaderOptions.apply(this),
    )) as T;
  }

  // loadNoTransform and loadNoTransformX exist to load the data from the db
  // with no transformations which are currently done implicitly
  // we don't generate the full complement of read-APIs
  // but can easily query the raw data with accountNoTransformLoader
  static async loadNoTransform<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    id: ID,
  ): Promise<T | null> {
    const opts = {
      ...AccountBase.loaderOptions.apply(this),
      loaderFactory: accountNoTransformLoader,
    };

    return (await loadEnt(viewer, id, opts)) as T | null;
  }

  static async loadNoTransformX<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    id: ID,
  ): Promise<T> {
    const opts = {
      ...AccountBase.loaderOptions.apply(this),
      loaderFactory: accountNoTransformLoader,
    };
    return (await loadEntX(viewer, id, opts)) as T;
  }

  static async loadMany<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    ...ids: ID[]
  ): Promise<Map<ID, T>> {
    return (await loadEnts(
      viewer,
      AccountBase.loaderOptions.apply(this),
      ...ids,
    )) as Map<ID, T>;
  }

  static async loadCustom<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    query: CustomQuery,
  ): Promise<T[]> {
    return (await loadCustomEnts(
      viewer,
      {
        ...AccountBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
    )) as T[];
  }

  static async loadCustomData<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    query: CustomQuery,
    context?: Context,
  ): Promise<AccountDBData[]> {
    return (await loadCustomData(
      {
        ...AccountBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
      context,
    )) as AccountDBData[];
  }

  static async loadCustomCount<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    query: CustomQuery,
    context?: Context,
  ): Promise<number> {
    return loadCustomCount(
      {
        ...AccountBase.loaderOptions.apply(this),
      },
      query,
      context,
    );
  }

  static async loadRawData<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<AccountDBData | null> {
    const row = await accountLoader.createLoader(context).load(id);
    if (!row) {
      return null;
    }
    return row as AccountDBData;
  }

  static async loadRawDataX<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<AccountDBData> {
    const row = await accountLoader.createLoader(context).load(id);
    if (!row) {
      throw new Error(`couldn't load row for ${id}`);
    }
    return row as AccountDBData;
  }

  static async loadFromPhoneNumber<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    phoneNumber: string,
  ): Promise<T | null> {
    return (await loadEntViaKey(viewer, phoneNumber, {
      ...AccountBase.loaderOptions.apply(this),
      loaderFactory: accountPhoneNumberLoader,
    })) as T | null;
  }

  static async loadFromPhoneNumberX<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    viewer: Viewer,
    phoneNumber: string,
  ): Promise<T> {
    return (await loadEntXViaKey(viewer, phoneNumber, {
      ...AccountBase.loaderOptions.apply(this),
      loaderFactory: accountPhoneNumberLoader,
    })) as T;
  }

  static async loadIDFromPhoneNumber<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    phoneNumber: string,
    context?: Context,
  ): Promise<ID | undefined> {
    const row = await accountPhoneNumberLoader
      .createLoader(context)
      .load(phoneNumber);
    return row?.id;
  }

  static async loadRawDataFromPhoneNumber<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
    phoneNumber: string,
    context?: Context,
  ): Promise<AccountDBData | null> {
    const row = await accountPhoneNumberLoader
      .createLoader(context)
      .load(phoneNumber);
    if (!row) {
      return null;
    }
    return row as AccountDBData;
  }

  static loaderOptions<T extends AccountBase>(
    this: new (
      viewer: Viewer,
      data: Data,
    ) => T,
  ): LoadEntOptions<T, Viewer> {
    return {
      tableName: accountLoaderInfo.tableName,
      fields: accountLoaderInfo.fields,
      ent: this,
      loaderFactory: accountLoader,
      fieldPrivacy: getFieldsWithPrivacy(schema, accountLoaderInfo.fieldInfo),
    };
  }

  private static schemaFields: Map<string, Field>;

  private static getSchemaFields(): Map<string, Field> {
    if (AccountBase.schemaFields != null) {
      return AccountBase.schemaFields;
    }
    return (AccountBase.schemaFields = getFields(schema));
  }

  static getField(key: string): Field | undefined {
    return AccountBase.getSchemaFields().get(key);
  }

  getAccountTodoStatusMap() {
    let m: Map<AccountTodoStatus, EdgeType> = new Map();
    m.set(AccountTodoStatus.ClosedTodosDup, EdgeType.AccountToClosedTodosDup);
    m.set(AccountTodoStatus.OpenTodosDup, EdgeType.AccountToOpenTodosDup);
    return m;
  }

  async todoStatusFor(todo: Todo): Promise<AccountTodoStatus | null> {
    const ret = null;
    const g = await getEdgeTypeInGroup(
      this.viewer,
      this.id,
      todo.id,
      this.getAccountTodoStatusMap(),
    );
    return g ? g[0] : ret;
  }

  queryClosedTodosDup(): AccountToClosedTodosDupQuery {
    return AccountToClosedTodosDupQuery.query(this.viewer, this.id);
  }

  queryCreatedWorkspaces(): AccountToCreatedWorkspacesQuery {
    return AccountToCreatedWorkspacesQuery.query(this.viewer, this.id);
  }

  queryOpenTodosDup(): AccountToOpenTodosDupQuery {
    return AccountToOpenTodosDupQuery.query(this.viewer, this.id);
  }

  queryScopedTodos(): AccountToScopedTodosQuery {
    return AccountToScopedTodosQuery.query(this.viewer, this.id);
  }

  queryWorkspaces(): AccountToWorkspacesQuery {
    return AccountToWorkspacesQuery.query(this.viewer, this.id);
  }

  queryTags(): AccountToTagsQuery {
    return AccountToTagsQuery.query(this.viewer, this.id);
  }

  queryTodos(): AccountToTodosQuery {
    return AccountToTodosQuery.query(this.viewer, this.id);
  }
}
