/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  AllowIfViewerPrivacyPolicy,
  Context,
  CustomQuery,
  Data,
  Ent,
  ID,
  LoadEntOptions,
  PrivacyPolicy,
  loadCustomCount,
  loadCustomData,
  loadCustomEnts,
  loadEnt,
  loadEntX,
  loadEnts,
} from "@snowtop/ent";
import { Field, getFields } from "@snowtop/ent/schema";
import { AuthCodeDBData, authCodeLoader, authCodeLoaderInfo } from "./loaders";
import { NodeType } from "./types";
import { User } from "../internal";
import schema from "../../schema/auth_code_schema";
import { ExampleViewer as ExampleViewerAlias } from "../../viewer/viewer";

export class AuthCodeBase implements Ent<ExampleViewerAlias> {
  protected readonly data: AuthCodeDBData;
  readonly nodeType = NodeType.AuthCode;
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly code: string;
  readonly userID: ID;
  readonly emailAddress: string | null;
  readonly phoneNumber: string | null;

  constructor(public viewer: ExampleViewerAlias, data: Data) {
    this.id = data.id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.code = data.code;
    this.userID = data.user_id;
    this.emailAddress = data.email_address;
    this.phoneNumber = data.phone_number;
    // @ts-expect-error
    this.data = data;
  }

  __setRawDBData<AuthCodeDBData>(data: AuthCodeDBData) {}

  /** used by some ent internals to get access to raw db data. should not be depended on. may not always be on the ent **/
  ___getRawDBData(): AuthCodeDBData {
    return this.data;
  }

  getPrivacyPolicy(): PrivacyPolicy<this, ExampleViewerAlias> {
    return AllowIfViewerPrivacyPolicy;
  }

  static async load<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    id: ID,
  ): Promise<T | null> {
    return (await loadEnt(
      viewer,
      id,
      AuthCodeBase.loaderOptions.apply(this),
    )) as T | null;
  }

  static async loadX<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    id: ID,
  ): Promise<T> {
    return (await loadEntX(
      viewer,
      id,
      AuthCodeBase.loaderOptions.apply(this),
    )) as T;
  }

  static async loadMany<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    ...ids: ID[]
  ): Promise<Map<ID, T>> {
    return (await loadEnts(
      viewer,
      AuthCodeBase.loaderOptions.apply(this),
      ...ids,
    )) as Map<ID, T>;
  }

  static async loadCustom<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    query: CustomQuery<AuthCodeDBData>,
  ): Promise<T[]> {
    return (await loadCustomEnts(
      viewer,
      {
        ...AuthCodeBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
    )) as T[];
  }

  static async loadCustomData<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    query: CustomQuery<AuthCodeDBData>,
    context?: Context,
  ): Promise<AuthCodeDBData[]> {
    return loadCustomData<AuthCodeDBData, AuthCodeDBData>(
      {
        ...AuthCodeBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
      context,
    );
  }

  static async loadCustomCount<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    query: CustomQuery<AuthCodeDBData>,
    context?: Context,
  ): Promise<number> {
    return loadCustomCount(
      {
        ...AuthCodeBase.loaderOptions.apply(this),
      },
      query,
      context,
    );
  }

  static async loadRawData<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<AuthCodeDBData | null> {
    const row = await authCodeLoader.createLoader(context).load(id);
    if (!row) {
      return null;
    }
    return row;
  }

  static async loadRawDataX<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<AuthCodeDBData> {
    const row = await authCodeLoader.createLoader(context).load(id);
    if (!row) {
      throw new Error(`couldn't load row for ${id}`);
    }
    return row;
  }

  static loaderOptions<T extends AuthCodeBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
  ): LoadEntOptions<T, ExampleViewerAlias> {
    return {
      tableName: authCodeLoaderInfo.tableName,
      fields: authCodeLoaderInfo.fields,
      ent: this,
      loaderFactory: authCodeLoader,
    };
  }

  private static schemaFields: Map<string, Field>;

  private static getSchemaFields(): Map<string, Field> {
    if (AuthCodeBase.schemaFields != null) {
      return AuthCodeBase.schemaFields;
    }
    return (AuthCodeBase.schemaFields = getFields(schema));
  }

  static getField(key: string): Field | undefined {
    return AuthCodeBase.getSchemaFields().get(key);
  }

  async loadUser(): Promise<User | null> {
    return loadEnt(this.viewer, this.userID, User.loaderOptions());
  }

  loadUserX(): Promise<User> {
    return loadEntX(this.viewer, this.userID, User.loaderOptions());
  }
}
