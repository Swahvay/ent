/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import {
  AllowIfViewerPrivacyPolicy,
  AssocEdge,
  Context,
  CustomQuery,
  Data,
  Ent,
  ID,
  LoadEntOptions,
  ObjectLoaderFactory,
  PrivacyPolicy,
  applyPrivacyPolicy,
  loadCustomCount,
  loadCustomData,
  loadCustomEnts,
  loadEnt,
  loadEntViaKey,
  loadEntX,
  loadEntXViaKey,
  loadEnts,
  loadUniqueEdge,
  loadUniqueNode,
} from "@snowtop/ent";
import {
  Field,
  getFields,
  getFieldsWithEditPrivacy,
  getFieldsWithPrivacy,
} from "@snowtop/ent/schema";
import {
  UserDBData,
  userEmailAddressLoader,
  userLoader,
  userLoaderInfo,
  userPhoneNumberLoader,
} from "./loaders";
import {
  EdgeType,
  NodeType,
  UserAccountStatus,
  UserDaysOff,
  UserIntEnum,
  UserNestedObjectList,
  UserPreferredShift,
  UserPrefsDiff,
  UserPrefsStruct,
  UserSuperNestedObject,
  convertNullableUserAccountStatus,
  convertNullableUserNestedObjectListList,
  convertNullableUserPreferredShiftList,
  convertNullableUserPrefsStruct,
  convertNullableUserPrefsStructList,
  convertNullableUserSuperNestedObject,
} from "./types";
import {
  AuthorToCommentsQuery,
  Contact,
  CreatorToEventsQuery,
  FeedbackMixin,
  IFeedback,
  UserArticleToCommentsQuery,
  UserCommentsFromAttachmentQuery,
  UserToAuthCodesQuery,
  UserToCommentsQuery,
  UserToContactEmailsQuery,
  UserToContactPhoneNumbersQuery,
  UserToContactsQuery,
  UserToCreatedEventsQuery,
  UserToDeclinedEventsQuery,
  UserToEventsAttendingQuery,
  UserToFriendsQuery,
  UserToHostedEventsQuery,
  UserToInvitedEventsQuery,
  UserToLikersQuery,
  UserToLikesQuery,
  UserToMaybeEventsQuery,
} from "../internal";
import schema from "../../schema/user_schema";
import {
  convertSuperNestedObject,
  userConvertAccountStatus,
} from "../../util/convert_user_fields";
import { ExampleViewer as ExampleViewerAlias } from "../../viewer/viewer";

export interface UserCanViewerSee {
  accountStatus: () => Promise<boolean>;
  prefs: () => Promise<boolean>;
  prefsList: () => Promise<boolean>;
  prefsDiff: () => Promise<boolean>;
}

export interface UserCanViewerEdit {
  accountStatus: () => Promise<boolean>;
}

interface UserCustomQueryData extends UserDBData {
  name_idx: string;
}

const superNestedObjectLoader = new ObjectLoaderFactory({
  tableName: userLoaderInfo.tableName,
  fields: ["id", "super_nested_object"],
  key: "id",
  instanceKey: `${userLoaderInfo.tableName}-super_nested_object`,
});

export class UserBase
  extends FeedbackMixin(class {} as new (...args: any[]) => IFeedback)
  implements Ent<ExampleViewerAlias>, IFeedback<ExampleViewerAlias>
{
  protected readonly data: UserDBData;
  readonly nodeType = NodeType.User;
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly phoneNumber: string | null;
  protected readonly password: string | null;
  protected readonly _accountStatus: UserAccountStatus | null;
  protected readonly _emailVerified: boolean;
  readonly bio: string | null;
  readonly nicknames: string[] | null;
  protected readonly _prefs: UserPrefsStruct | null;
  protected readonly _prefsList: UserPrefsStruct[] | null;
  protected readonly _prefsDiff: UserPrefsDiff | null;
  readonly daysOff: UserDaysOff[] | null;
  readonly preferredShift: UserPreferredShift[] | null;
  readonly timeInMs: BigInt | null;
  readonly funUuids: ID[] | null;
  protected _superNestedObject: UserSuperNestedObject | null | undefined;
  readonly nestedList: UserNestedObjectList[] | null;
  readonly intEnum: UserIntEnum | null;

  constructor(public viewer: ExampleViewerAlias, data: Data) {
    // @ts-ignore pass to mixin
    super(viewer, data);
    this.id = data.id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.emailAddress = data.email_address;
    this.phoneNumber = data.phone_number;
    this.password = data.password;
    this._accountStatus = userConvertAccountStatus(
      convertNullableUserAccountStatus(data.account_status),
    );
    this._emailVerified = data.email_verified;
    this.bio = data.bio;
    this.nicknames = data.nicknames;
    this._prefs = convertNullableUserPrefsStruct(data.prefs);
    this._prefsList = convertNullableUserPrefsStructList(data.prefs_list);
    this._prefsDiff = data.prefs_diff;
    this.daysOff = data.days_off;
    this.preferredShift = convertNullableUserPreferredShiftList(
      data.preferred_shift,
    );
    this.timeInMs = BigInt(data.time_in_ms);
    this.funUuids = data.fun_uuids;
    this.nestedList = convertNullableUserNestedObjectListList(data.nested_list);
    this.intEnum = data.int_enum;
    // @ts-expect-error
    this.data = data;
  }

  __setRawDBData<UserDBData>(data: UserDBData) {}

  /** used by some ent internals to get access to raw db data. should not be depended on. may not always be on the ent **/
  ___getRawDBData(): UserDBData {
    return this.data;
  }

  getPrivacyPolicy(): PrivacyPolicy<this, ExampleViewerAlias> {
    return AllowIfViewerPrivacyPolicy;
  }

  async accountStatus(): Promise<UserAccountStatus | null> {
    if (this._accountStatus === null) {
      return null;
    }
    const m = getFieldsWithPrivacy(schema, userLoaderInfo.fieldInfo);
    const p = m.get("account_status");
    if (!p) {
      throw new Error(`couldn't get field privacy policy for accountStatus`);
    }
    const v = await applyPrivacyPolicy(this.viewer, p, this);
    return v ? this._accountStatus : null;
  }

  async emailVerified(): Promise<boolean | null> {
    const m = getFieldsWithPrivacy(schema, userLoaderInfo.fieldInfo);
    const p = m.get("email_verified");
    if (!p) {
      throw new Error(`couldn't get field privacy policy for emailVerified`);
    }
    const v = await applyPrivacyPolicy(this.viewer, p, this);
    return v ? this._emailVerified : null;
  }

  async prefs(): Promise<UserPrefsStruct | null> {
    if (this._prefs === null) {
      return null;
    }
    const m = getFieldsWithPrivacy(schema, userLoaderInfo.fieldInfo);
    const p = m.get("prefs");
    if (!p) {
      throw new Error(`couldn't get field privacy policy for prefs`);
    }
    const v = await applyPrivacyPolicy(this.viewer, p, this);
    return v ? this._prefs : null;
  }

  async prefsList(): Promise<UserPrefsStruct[] | null> {
    if (this._prefsList === null) {
      return null;
    }
    const m = getFieldsWithPrivacy(schema, userLoaderInfo.fieldInfo);
    const p = m.get("prefs_list");
    if (!p) {
      throw new Error(`couldn't get field privacy policy for prefsList`);
    }
    const v = await applyPrivacyPolicy(this.viewer, p, this);
    return v ? this._prefsList : null;
  }

  async prefsDiff(): Promise<UserPrefsDiff | null> {
    if (this._prefsDiff === null) {
      return null;
    }
    const m = getFieldsWithPrivacy(schema, userLoaderInfo.fieldInfo);
    const p = m.get("prefs_diff");
    if (!p) {
      throw new Error(`couldn't get field privacy policy for prefsDiff`);
    }
    const v = await applyPrivacyPolicy(this.viewer, p, this);
    return v ? this._prefsDiff : null;
  }

  async superNestedObject(): Promise<UserSuperNestedObject | null> {
    if (this._superNestedObject === undefined) {
      const row = await superNestedObjectLoader
        .createLoader(this.viewer.context)
        .load(this.id);
      this._superNestedObject = row?.super_nested_object ?? null;
    }
    return convertSuperNestedObject(
      convertNullableUserSuperNestedObject(this._superNestedObject ?? null),
    );
  }

  static async load<T extends UserBase>(
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
      UserBase.loaderOptions.apply(this),
    )) as T | null;
  }

  static async loadX<T extends UserBase>(
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
      UserBase.loaderOptions.apply(this),
    )) as T;
  }

  static async loadMany<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    ...ids: ID[]
  ): Promise<Map<ID, T>> {
    return (await loadEnts(
      viewer,
      UserBase.loaderOptions.apply(this),
      ...ids,
    )) as Map<ID, T>;
  }

  static async loadCustom<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    query: CustomQuery<UserCustomQueryData>,
  ): Promise<T[]> {
    return (await loadCustomEnts(
      viewer,
      {
        ...UserBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
    )) as T[];
  }

  static async loadCustomData<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    query: CustomQuery<UserCustomQueryData>,
    context?: Context,
  ): Promise<UserDBData[]> {
    return loadCustomData<UserCustomQueryData, UserDBData>(
      {
        ...UserBase.loaderOptions.apply(this),
        prime: true,
      },
      query,
      context,
    );
  }

  static async loadCustomCount<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    query: CustomQuery<UserCustomQueryData>,
    context?: Context,
  ): Promise<number> {
    return loadCustomCount(
      {
        ...UserBase.loaderOptions.apply(this),
      },
      query,
      context,
    );
  }

  static async loadRawData<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<UserDBData | null> {
    return userLoader.createLoader(context).load(id);
  }

  static async loadRawDataX<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    id: ID,
    context?: Context,
  ): Promise<UserDBData> {
    const row = await userLoader.createLoader(context).load(id);
    if (!row) {
      throw new Error(`couldn't load row for ${id}`);
    }
    return row;
  }

  static async loadFromEmailAddress<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    emailAddress: string,
  ): Promise<T | null> {
    return (await loadEntViaKey(viewer, emailAddress, {
      ...UserBase.loaderOptions.apply(this),
      loaderFactory: userEmailAddressLoader,
    })) as T | null;
  }

  static async loadFromEmailAddressX<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    emailAddress: string,
  ): Promise<T> {
    return (await loadEntXViaKey(viewer, emailAddress, {
      ...UserBase.loaderOptions.apply(this),
      loaderFactory: userEmailAddressLoader,
    })) as T;
  }

  static async loadIdFromEmailAddress<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    emailAddress: string,
    context?: Context,
  ): Promise<ID | undefined> {
    const row = await userEmailAddressLoader
      .createLoader(context)
      .load(emailAddress);
    return row?.id;
  }

  static async loadRawDataFromEmailAddress<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    emailAddress: string,
    context?: Context,
  ): Promise<UserDBData | null> {
    return userEmailAddressLoader.createLoader(context).load(emailAddress);
  }

  static async loadFromPhoneNumber<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    phoneNumber: string,
  ): Promise<T | null> {
    return (await loadEntViaKey(viewer, phoneNumber, {
      ...UserBase.loaderOptions.apply(this),
      loaderFactory: userPhoneNumberLoader,
    })) as T | null;
  }

  static async loadFromPhoneNumberX<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    viewer: ExampleViewerAlias,
    phoneNumber: string,
  ): Promise<T> {
    return (await loadEntXViaKey(viewer, phoneNumber, {
      ...UserBase.loaderOptions.apply(this),
      loaderFactory: userPhoneNumberLoader,
    })) as T;
  }

  static async loadIdFromPhoneNumber<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    phoneNumber: string,
    context?: Context,
  ): Promise<ID | undefined> {
    const row = await userPhoneNumberLoader
      .createLoader(context)
      .load(phoneNumber);
    return row?.id;
  }

  static async loadRawDataFromPhoneNumber<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
    phoneNumber: string,
    context?: Context,
  ): Promise<UserDBData | null> {
    return userPhoneNumberLoader.createLoader(context).load(phoneNumber);
  }

  static loaderOptions<T extends UserBase>(
    this: new (
      viewer: ExampleViewerAlias,
      data: Data,
    ) => T,
  ): LoadEntOptions<T, ExampleViewerAlias, UserDBData> {
    return {
      tableName: userLoaderInfo.tableName,
      fields: userLoaderInfo.fields,
      ent: this,
      loaderFactory: userLoader,
    };
  }

  private static schemaFields: Map<string, Field>;

  private static getSchemaFields(): Map<string, Field> {
    if (UserBase.schemaFields != null) {
      return UserBase.schemaFields;
    }
    return (UserBase.schemaFields = getFields(schema));
  }

  static getField(key: string): Field | undefined {
    return UserBase.getSchemaFields().get(key);
  }

  queryComments(): UserToCommentsQuery {
    return UserToCommentsQuery.query(this.viewer, this.id);
  }

  queryCreatedEvents(): UserToCreatedEventsQuery {
    return UserToCreatedEventsQuery.query(this.viewer, this.id);
  }

  queryDeclinedEvents(): UserToDeclinedEventsQuery {
    return UserToDeclinedEventsQuery.query(this.viewer, this.id);
  }

  queryEventsAttending(): UserToEventsAttendingQuery {
    return UserToEventsAttendingQuery.query(this.viewer, this.id);
  }

  queryFriends(): UserToFriendsQuery {
    return UserToFriendsQuery.query(this.viewer, this.id);
  }

  queryInvitedEvents(): UserToInvitedEventsQuery {
    return UserToInvitedEventsQuery.query(this.viewer, this.id);
  }

  queryLikers(): UserToLikersQuery {
    return UserToLikersQuery.query(this.viewer, this.id);
  }

  queryLikes(): UserToLikesQuery {
    return UserToLikesQuery.query(this.viewer, this.id);
  }

  queryMaybeEvents(): UserToMaybeEventsQuery {
    return UserToMaybeEventsQuery.query(this.viewer, this.id);
  }

  loadSelfContactEdge(): Promise<AssocEdge | null> {
    return loadUniqueEdge({
      id1: this.id,
      edgeType: EdgeType.UserToSelfContact,
      context: this.viewer.context,
    });
  }

  loadSelfContact(): Promise<Contact | null> {
    return loadUniqueNode(
      this.viewer,
      this.id,
      EdgeType.UserToSelfContact,
      Contact.loaderOptions(),
    );
  }

  queryUserToHostedEvents(): UserToHostedEventsQuery {
    return UserToHostedEventsQuery.query(this.viewer, this.id);
  }

  queryAuthCodes(): UserToAuthCodesQuery {
    return UserToAuthCodesQuery.query(this.viewer, this.id);
  }

  queryContactEmails(): UserToContactEmailsQuery {
    return UserToContactEmailsQuery.query(this.viewer, this.id);
  }

  queryContactPhoneNumbers(): UserToContactPhoneNumbersQuery {
    return UserToContactPhoneNumbersQuery.query(this.viewer, this.id);
  }

  queryContacts(): UserToContactsQuery {
    return UserToContactsQuery.query(this.viewer, this.id);
  }

  queryArticles(): UserArticleToCommentsQuery {
    return UserArticleToCommentsQuery.query(this.viewer, this);
  }

  queryAttachedComments(): UserCommentsFromAttachmentQuery {
    return UserCommentsFromAttachmentQuery.query(this.viewer, this);
  }

  queryCommentsFromUser(): AuthorToCommentsQuery {
    return AuthorToCommentsQuery.query(this.viewer, this);
  }

  queryEventsCreated(): CreatorToEventsQuery {
    return CreatorToEventsQuery.query(this.viewer, this);
  }

  canViewerSeeInfo(): UserCanViewerSee {
    const fieldPrivacy = getFieldsWithPrivacy(schema, userLoaderInfo.fieldInfo);
    return {
      accountStatus: () =>
        applyPrivacyPolicy(
          this.viewer,
          fieldPrivacy.get("account_status")!,
          this,
        ),
      prefs: () =>
        applyPrivacyPolicy(this.viewer, fieldPrivacy.get("prefs")!, this),
      prefsList: () =>
        applyPrivacyPolicy(this.viewer, fieldPrivacy.get("prefs_list")!, this),
      prefsDiff: () =>
        applyPrivacyPolicy(this.viewer, fieldPrivacy.get("prefs_diff")!, this),
    };
  }

  canViewerEditInfo(): UserCanViewerEdit {
    const fieldPrivacy = getFieldsWithEditPrivacy(
      schema,
      userLoaderInfo.fieldInfo,
    );
    return {
      accountStatus: () =>
        applyPrivacyPolicy(
          this.viewer,
          fieldPrivacy.get("account_status")!,
          this,
        ),
    };
  }
}
