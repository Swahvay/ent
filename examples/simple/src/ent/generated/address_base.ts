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
  loadCustomData,
  loadCustomEnts,
  loadEnt,
  loadEntX,
  loadEnts,
} from "@snowtop/ent";
import { Field, getFields } from "@snowtop/ent/schema";
import { addressLoader, addressLoaderInfo } from "./loaders";
import { AddressToHostedEventsQuery, NodeType } from "../internal";
import schema from "../../schema/address";
import { ExampleViewer as ExampleViewerAlias } from "../../viewer/viewer";

interface AddressDBData {
  id: ID;
  created_at: Date;
  updated_at: Date;
  street_name: string;
  city: string;
  state: string;
  zip: string;
  apartment: string | null;
  country: string;
}

export class AddressBase implements Ent<ExampleViewerAlias> {
  readonly nodeType = NodeType.Address;
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly streetName: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly apartment: string | null;
  readonly country: string;

  constructor(public viewer: ExampleViewerAlias, protected data: Data) {
    this.id = data.id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.streetName = data.street_name;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.apartment = data.apartment;
    this.country = data.country;
  }

  getPrivacyPolicy(): PrivacyPolicy<this, ExampleViewerAlias> {
    return AllowIfViewerPrivacyPolicy;
  }

  static async load<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    viewer: ExampleViewerAlias,
    id: ID,
  ): Promise<T | null> {
    return (await loadEnt(
      viewer,
      id,
      AddressBase.loaderOptions.apply(this),
    )) as T | null;
  }

  static async loadX<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    viewer: ExampleViewerAlias,
    id: ID,
  ): Promise<T> {
    return (await loadEntX(
      viewer,
      id,
      AddressBase.loaderOptions.apply(this),
    )) as T;
  }

  static async loadMany<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    viewer: ExampleViewerAlias,
    ...ids: ID[]
  ): Promise<Map<ID, T>> {
    return (await loadEnts(
      viewer,
      AddressBase.loaderOptions.apply(this),
      ...ids,
    )) as Map<ID, T>;
  }

  static async loadCustom<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    viewer: ExampleViewerAlias,
    query: CustomQuery,
  ): Promise<T[]> {
    return (await loadCustomEnts(
      viewer,
      {
        ...AddressBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
    )) as T[];
  }

  static async loadCustomData<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    query: CustomQuery,
    context?: Context,
  ): Promise<AddressDBData[]> {
    return (await loadCustomData(
      {
        ...AddressBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
      context,
    )) as AddressDBData[];
  }

  static async loadRawData<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    id: ID,
    context?: Context,
  ): Promise<AddressDBData | null> {
    const row = await addressLoader.createLoader(context).load(id);
    if (!row) {
      return null;
    }
    return row as AddressDBData;
  }

  static async loadRawDataX<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
    id: ID,
    context?: Context,
  ): Promise<AddressDBData> {
    const row = await addressLoader.createLoader(context).load(id);
    if (!row) {
      throw new Error(`couldn't load row for ${id}`);
    }
    return row as AddressDBData;
  }

  static loaderOptions<T extends AddressBase>(
    this: new (viewer: ExampleViewerAlias, data: Data) => T,
  ): LoadEntOptions<T, ExampleViewerAlias> {
    return {
      tableName: addressLoaderInfo.tableName,
      fields: addressLoaderInfo.fields,
      ent: this,
      loaderFactory: addressLoader,
    };
  }

  private static schemaFields: Map<string, Field>;

  private static getSchemaFields(): Map<string, Field> {
    if (AddressBase.schemaFields != null) {
      return AddressBase.schemaFields;
    }
    return (AddressBase.schemaFields = getFields(schema));
  }

  static getField(key: string): Field | undefined {
    return AddressBase.getSchemaFields().get(key);
  }

  queryHostedEvents(): AddressToHostedEventsQuery {
    return AddressToHostedEventsQuery.query(this.viewer, this.id);
  }
}
