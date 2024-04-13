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
import { HolidayDBData, holidayLoader, holidayLoaderInfo } from "./loaders";
import { DayOfWeekAlt, NodeType, convertDayOfWeekAlt } from "./types";
import { IWithDayOfWeek, WithDayOfWeekMixin } from "../internal";
import schema from "../../schema/holiday_schema";
import { ExampleViewer as ExampleViewerAlias } from "../../viewer/viewer";

export class HolidayBase
  extends WithDayOfWeekMixin(class {} as new (...args: any[]) => IWithDayOfWeek)
  implements Ent<ExampleViewerAlias>, IWithDayOfWeek<ExampleViewerAlias>
{
  protected readonly data: HolidayDBData;
  readonly nodeType = NodeType.Holiday;
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly dayOfWeekAlt: DayOfWeekAlt;
  readonly label: string;
  readonly date: Date;

  constructor(public viewer: ExampleViewerAlias, data: Data) {
    // @ts-ignore pass to mixin
    super(viewer, data);
    this.id = data.id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.dayOfWeekAlt = convertDayOfWeekAlt(data.day_of_week_alt);
    this.label = data.label;
    this.date = data.date;
    // @ts-expect-error
    this.data = data;
  }

  __setRawDBData<HolidayDBData>(data: HolidayDBData) {}

  /** used by some ent internals to get access to raw db data. should not be depended on. may not always be on the ent **/
  ___getRawDBData(): HolidayDBData {
    return this.data;
  }

  getPrivacyPolicy(): PrivacyPolicy<this, ExampleViewerAlias> {
    return AllowIfViewerPrivacyPolicy;
  }

  static async load<T extends HolidayBase>(
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
      HolidayBase.loaderOptions.apply(this),
    )) as T | null;
  }

  static async loadX<T extends HolidayBase>(
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
      HolidayBase.loaderOptions.apply(this),
    )) as T;
  }

  static async loadMany<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    ...ids: ID[]
  ): Promise<Map<ID, T>> {
    return (await loadEnts(
      viewer,
      HolidayBase.loaderOptions.apply(this),
      ...ids,
    )) as Map<ID, T>;
  }

  static async loadCustom<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    query: CustomQuery<HolidayDBData>,
  ): Promise<T[]> {
    return (await loadCustomEnts(
      viewer,
      {
        ...HolidayBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
    )) as T[];
  }

  static async loadCustomData<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    query: CustomQuery<HolidayDBData>,
    context?: Context,
  ): Promise<HolidayDBData[]> {
    return loadCustomData<HolidayDBData, HolidayDBData>(
      {
        ...HolidayBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
      context,
    );
  }

  static async loadCustomCount<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    query: CustomQuery<HolidayDBData>,
    context?: Context,
  ): Promise<number> {
    return loadCustomCount(
      {
        ...HolidayBase.loaderOptions.apply(this),
      },
      query,
      context,
    );
  }

  static async loadRawData<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<HolidayDBData | null> {
    return holidayLoader.createLoader(context).load(id);
  }

  static async loadRawDataX<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<HolidayDBData> {
    const row = await holidayLoader.createLoader(context).load(id);
    if (!row) {
      throw new Error(`couldn't load row for ${id}`);
    }
    return row;
  }

  static loaderOptions<T extends HolidayBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
  ): LoadEntOptions<T, ExampleViewerAlias, HolidayDBData> {
    return {
      tableName: holidayLoaderInfo.tableName,
      fields: holidayLoaderInfo.fields,
      ent: this,
      loaderFactory: holidayLoader,
    };
  }

  private static schemaFields: Map<string, Field>;

  private static getSchemaFields(): Map<string, Field> {
    if (HolidayBase.schemaFields != null) {
      return HolidayBase.schemaFields;
    }
    return (HolidayBase.schemaFields = getFields(schema));
  }

  static getField(key: string): Field | undefined {
    return HolidayBase.getSchemaFields().get(key);
  }
}
