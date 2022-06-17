/**
 * Copyright whaa whaa
 * Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.
 */

import { AssocEdgeInputOptions, Ent, ID } from "@snowtop/ent";
import {
  Action,
  Builder,
  Changeset,
  Orchestrator,
  WriteOperation,
  saveBuilder,
  saveBuilderX,
} from "@snowtop/ent/action";
import {
  Contact,
  Event,
  User,
  UserDaysOff,
  UserPreferredShift,
} from "../../..";
import { EdgeType, NodeType } from "../../const";
import { userLoaderInfo } from "../../loaders";
import { FeedbackBuilder } from "../../mixins/feedback/actions/feedback_builder";
import { UserNestedObjectList } from "../../user_nested_object_list";
import { UserPrefsDiff } from "../../user_prefs_diff";
import { UserPrefsStruct } from "../../user_prefs_struct";
import { UserPrefsStruct2 } from "../../user_prefs_struct_2";
import { UserSuperNestedObject } from "../../user_super_nested_object";
import schema from "../../../../schema/user_schema";
import { ExampleViewer as ExampleViewerAlias } from "../../../../viewer/viewer";

export interface UserInput {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string | null;
  password?: string | null;
  accountStatus?: string | null;
  emailVerified?: boolean;
  bio?: string | null;
  nicknames?: string[] | null;
  prefs?: UserPrefsStruct | null;
  prefsList?: UserPrefsStruct2[] | null;
  prefsDiff?: UserPrefsDiff | null;
  daysOff?: UserDaysOff[] | null;
  preferredShift?: UserPreferredShift[] | null;
  timeInMs?: BigInt | null;
  funUuids?: ID[] | null;
  newCol?: string | null;
  newCol2?: string | null;
  superNestedObject?: UserSuperNestedObject | null;
  nestedList?: UserNestedObjectList[] | null;
  // allow other properties. useful for action-only fields
  [x: string]: any;
}

function randomNum(): string {
  return Math.random().toString(10).substring(2);
}

class Base {
  // @ts-ignore not assigning. need for Mixin
  orchestrator: Orchestrator<User, any, ExampleViewerAlias>;

  constructor() {}

  isBuilder<T extends Ent>(
    node: ID | T | Builder<T, any>,
  ): node is Builder<T, any> {
    return (node as Builder<T, any>).placeholderID !== undefined;
  }
}

type MaybeNull<T extends Ent> = T | null;
type TMaybleNullableEnt<T extends Ent> = T | MaybeNull<T>;

export class UserBuilder<
    TInput extends UserInput = UserInput,
    TExistingEnt extends TMaybleNullableEnt<User> = User | null,
  >
  extends FeedbackBuilder(Base)
  implements Builder<User, ExampleViewerAlias, TExistingEnt>
{
  orchestrator: Orchestrator<User, TInput, ExampleViewerAlias, TExistingEnt>;
  readonly placeholderID: ID;
  readonly ent = User;
  readonly nodeType = NodeType.User;
  private input: TInput;
  private m: Map<string, any> = new Map();

  public constructor(
    public readonly viewer: ExampleViewerAlias,
    public readonly operation: WriteOperation,
    action: Action<
      User,
      Builder<User, ExampleViewerAlias, TExistingEnt>,
      ExampleViewerAlias,
      TInput,
      TExistingEnt
    >,
    public readonly existingEnt: TExistingEnt,
  ) {
    super();
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}-User`;
    this.input = action.getInput();
    const updateInput = (d: UserInput) => this.updateInput.apply(this, [d]);

    this.orchestrator = new Orchestrator({
      viewer,
      operation: this.operation,
      tableName: "users",
      key: "id",
      loaderOptions: User.loaderOptions(),
      builder: this,
      action,
      schema,
      editedFields: () => this.getEditedFields.apply(this),
      updateInput,
      fieldInfo: userLoaderInfo.fieldInfo,
    });
  }

  getInput(): TInput {
    return this.input;
  }

  updateInput(input: UserInput) {
    // override input
    this.input = {
      ...this.input,
      ...input,
    };
  }

  deleteInputKey(key: keyof UserInput) {
    delete this.input[key];
  }

  // store data in Builder that can be retrieved by another validator, trigger, observer later in the action
  storeData(k: string, v: any) {
    this.m.set(k, v);
  }

  // retrieve data stored in this Builder with key
  getStoredData(k: string) {
    return this.m.get(k);
  }

  // this gets the inputs that have been written for a given edgeType and operation
  // WriteOperation.Insert for adding an edge and WriteOperation.Delete for deleting an edge
  getEdgeInputData(edgeType: EdgeType, op: WriteOperation) {
    return this.orchestrator.getInputEdges(edgeType, op);
  }

  clearInputEdges(edgeType: EdgeType, op: WriteOperation, id?: ID) {
    this.orchestrator.clearInputEdges(edgeType, op, id);
  }

  addCreatedEvent(...nodes: (ID | Event | Builder<Event, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addCreatedEventID(node);
      } else if (typeof node === "object") {
        this.addCreatedEventID(node.id);
      } else {
        this.addCreatedEventID(node);
      }
    }
    return this;
  }

  addCreatedEventID(
    id: ID | Builder<Event, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToCreatedEvents,
      NodeType.Event,
      options,
    );
    return this;
  }

  removeCreatedEvent(...nodes: (ID | Event)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToCreatedEvents,
        );
      } else {
        this.orchestrator.removeOutboundEdge(
          node,
          EdgeType.UserToCreatedEvents,
        );
      }
    }
    return this;
  }

  addDeclinedEvent(...nodes: (ID | Event | Builder<Event, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addDeclinedEventID(node);
      } else if (typeof node === "object") {
        this.addDeclinedEventID(node.id);
      } else {
        this.addDeclinedEventID(node);
      }
    }
    return this;
  }

  addDeclinedEventID(
    id: ID | Builder<Event, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToDeclinedEvents,
      NodeType.Event,
      options,
    );
    return this;
  }

  removeDeclinedEvent(...nodes: (ID | Event)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToDeclinedEvents,
        );
      } else {
        this.orchestrator.removeOutboundEdge(
          node,
          EdgeType.UserToDeclinedEvents,
        );
      }
    }
    return this;
  }

  addEventsAttending(...nodes: (ID | Event | Builder<Event, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addEventsAttendingID(node);
      } else if (typeof node === "object") {
        this.addEventsAttendingID(node.id);
      } else {
        this.addEventsAttendingID(node);
      }
    }
    return this;
  }

  addEventsAttendingID(
    id: ID | Builder<Event, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToEventsAttending,
      NodeType.Event,
      options,
    );
    return this;
  }

  removeEventsAttending(...nodes: (ID | Event)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToEventsAttending,
        );
      } else {
        this.orchestrator.removeOutboundEdge(
          node,
          EdgeType.UserToEventsAttending,
        );
      }
    }
    return this;
  }

  addFriend(...nodes: (ID | User | Builder<User, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addFriendID(node);
      } else if (typeof node === "object") {
        this.addFriendID(node.id);
      } else {
        this.addFriendID(node);
      }
    }
    return this;
  }

  addFriendID(
    id: ID | Builder<User, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToFriends,
      NodeType.User,
      options,
    );
    return this;
  }

  removeFriend(...nodes: (ID | User)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(node.id, EdgeType.UserToFriends);
      } else {
        this.orchestrator.removeOutboundEdge(node, EdgeType.UserToFriends);
      }
    }
    return this;
  }

  addInvitedEvent(...nodes: (ID | Event | Builder<Event, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addInvitedEventID(node);
      } else if (typeof node === "object") {
        this.addInvitedEventID(node.id);
      } else {
        this.addInvitedEventID(node);
      }
    }
    return this;
  }

  addInvitedEventID(
    id: ID | Builder<Event, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToInvitedEvents,
      NodeType.Event,
      options,
    );
    return this;
  }

  removeInvitedEvent(...nodes: (ID | Event)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToInvitedEvents,
        );
      } else {
        this.orchestrator.removeOutboundEdge(
          node,
          EdgeType.UserToInvitedEvents,
        );
      }
    }
    return this;
  }

  addLike(...nodes: (Ent | Builder<Ent, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.orchestrator.addOutboundEdge(
          node,
          EdgeType.UserToLikes,
          // nodeType will be gotten from Executor later
          "",
        );
      } else {
        this.orchestrator.addOutboundEdge(
          node.id,
          EdgeType.UserToLikes,
          node.nodeType,
        );
      }
    }
    return this;
  }

  addLikeID(
    id: ID | Builder<Ent, any>,
    nodeType: NodeType,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToLikes,
      nodeType,
      options,
    );
    return this;
  }

  removeLike(...nodes: (ID | Ent)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(node.id, EdgeType.UserToLikes);
      } else {
        this.orchestrator.removeOutboundEdge(node, EdgeType.UserToLikes);
      }
    }
    return this;
  }

  addMaybeEvent(...nodes: (ID | Event | Builder<Event, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addMaybeEventID(node);
      } else if (typeof node === "object") {
        this.addMaybeEventID(node.id);
      } else {
        this.addMaybeEventID(node);
      }
    }
    return this;
  }

  addMaybeEventID(
    id: ID | Builder<Event, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToMaybeEvents,
      NodeType.Event,
      options,
    );
    return this;
  }

  removeMaybeEvent(...nodes: (ID | Event)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToMaybeEvents,
        );
      } else {
        this.orchestrator.removeOutboundEdge(node, EdgeType.UserToMaybeEvents);
      }
    }
    return this;
  }

  addSelfContact(...nodes: (ID | Contact | Builder<Contact, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addSelfContactID(node);
      } else if (typeof node === "object") {
        this.addSelfContactID(node.id);
      } else {
        this.addSelfContactID(node);
      }
    }
    return this;
  }

  addSelfContactID(
    id: ID | Builder<Contact, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToSelfContact,
      NodeType.Contact,
      options,
    );
    return this;
  }

  removeSelfContact(...nodes: (ID | Contact)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToSelfContact,
        );
      } else {
        this.orchestrator.removeOutboundEdge(node, EdgeType.UserToSelfContact);
      }
    }
    return this;
  }

  addUserToHostedEvent(...nodes: (ID | Event | Builder<Event, any>)[]): this {
    for (const node of nodes) {
      if (this.isBuilder(node)) {
        this.addUserToHostedEventID(node);
      } else if (typeof node === "object") {
        this.addUserToHostedEventID(node.id);
      } else {
        this.addUserToHostedEventID(node);
      }
    }
    return this;
  }

  addUserToHostedEventID(
    id: ID | Builder<Event, any>,
    options?: AssocEdgeInputOptions,
  ): this {
    this.orchestrator.addOutboundEdge(
      id,
      EdgeType.UserToHostedEvents,
      NodeType.Event,
      options,
    );
    return this;
  }

  removeUserToHostedEvent(...nodes: (ID | Event)[]): this {
    for (const node of nodes) {
      if (typeof node === "object") {
        this.orchestrator.removeOutboundEdge(
          node.id,
          EdgeType.UserToHostedEvents,
        );
      } else {
        this.orchestrator.removeOutboundEdge(node, EdgeType.UserToHostedEvents);
      }
    }
    return this;
  }

  async build(): Promise<Changeset> {
    return this.orchestrator.build();
  }

  async valid(): Promise<boolean> {
    return this.orchestrator.valid();
  }

  async validX(): Promise<void> {
    return this.orchestrator.validX();
  }

  async save(): Promise<void> {
    await saveBuilder(this);
  }

  async saveX(): Promise<void> {
    await saveBuilderX(this);
  }

  async editedEnt(): Promise<User | null> {
    return this.orchestrator.editedEnt();
  }

  async editedEntX(): Promise<User> {
    return this.orchestrator.editedEntX();
  }

  private async getEditedFields(): Promise<Map<string, any>> {
    const fields = this.input;

    const result = new Map<string, any>();

    const addField = function (key: string, value: any) {
      if (value !== undefined) {
        result.set(key, value);
      }
    };
    addField("FirstName", fields.firstName);
    addField("LastName", fields.lastName);
    addField("EmailAddress", fields.emailAddress);
    addField("PhoneNumber", fields.phoneNumber);
    addField("Password", fields.password);
    addField("AccountStatus", fields.accountStatus);
    addField("emailVerified", fields.emailVerified);
    addField("Bio", fields.bio);
    addField("nicknames", fields.nicknames);
    addField("prefs", fields.prefs);
    addField("prefsList", fields.prefsList);
    addField("prefs_diff", fields.prefsDiff);
    addField("daysOff", fields.daysOff);
    addField("preferredShift", fields.preferredShift);
    addField("timeInMs", fields.timeInMs);
    addField("fun_uuids", fields.funUuids);
    addField("new_col", fields.newCol);
    addField("new_col2", fields.newCol2);
    addField("superNestedObject", fields.superNestedObject);
    addField("nestedList", fields.nestedList);
    return result;
  }

  isBuilder<T extends Ent>(
    node: ID | T | Builder<T, any>,
  ): node is Builder<T, any> {
    return (node as Builder<T, any>).placeholderID !== undefined;
  }

  // get value of FirstName. Retrieves it from the input if specified or takes it from existingEnt
  getNewFirstNameValue(): string | undefined {
    if (this.input.firstName !== undefined) {
      return this.input.firstName;
    }
    return this.existingEnt?.firstName;
  }

  // get value of LastName. Retrieves it from the input if specified or takes it from existingEnt
  getNewLastNameValue(): string | undefined {
    if (this.input.lastName !== undefined) {
      return this.input.lastName;
    }
    return this.existingEnt?.lastName;
  }

  // get value of EmailAddress. Retrieves it from the input if specified or takes it from existingEnt
  getNewEmailAddressValue(): string | undefined {
    if (this.input.emailAddress !== undefined) {
      return this.input.emailAddress;
    }
    return this.existingEnt?.emailAddress;
  }

  // get value of PhoneNumber. Retrieves it from the input if specified or takes it from existingEnt
  getNewPhoneNumberValue(): string | null | undefined {
    if (this.input.phoneNumber !== undefined) {
      return this.input.phoneNumber;
    }
    return this.existingEnt?.phoneNumber;
  }

  // get value of Password. Retrieves it from the input if specified or takes it from existingEnt
  getNewPasswordValue(): string | null | undefined {
    return this.input.password;
  }

  // get value of AccountStatus. Retrieves it from the input if specified or takes it from existingEnt
  getNewAccountStatusValue(): string | null | undefined {
    return this.input.accountStatus;
  }

  // get value of emailVerified. Retrieves it from the input if specified or takes it from existingEnt
  getNewEmailVerifiedValue(): boolean | null | undefined {
    return this.input.emailVerified;
  }

  // get value of Bio. Retrieves it from the input if specified or takes it from existingEnt
  getNewBioValue(): string | null | undefined {
    if (this.input.bio !== undefined) {
      return this.input.bio;
    }
    return this.existingEnt?.bio;
  }

  // get value of nicknames. Retrieves it from the input if specified or takes it from existingEnt
  getNewNicknamesValue(): string[] | null | undefined {
    if (this.input.nicknames !== undefined) {
      return this.input.nicknames;
    }
    return this.existingEnt?.nicknames;
  }

  // get value of prefs. Retrieves it from the input if specified or takes it from existingEnt
  getNewPrefsValue(): UserPrefsStruct | null | undefined {
    return this.input.prefs;
  }

  // get value of prefsList. Retrieves it from the input if specified or takes it from existingEnt
  getNewPrefsListValue(): UserPrefsStruct2[] | null | undefined {
    return this.input.prefsList;
  }

  // get value of prefs_diff. Retrieves it from the input if specified or takes it from existingEnt
  getNewPrefsDiffValue(): UserPrefsDiff | null | undefined {
    return this.input.prefsDiff;
  }

  // get value of daysOff. Retrieves it from the input if specified or takes it from existingEnt
  getNewDaysOffValue(): UserDaysOff[] | null | undefined {
    if (this.input.daysOff !== undefined) {
      return this.input.daysOff;
    }
    return this.existingEnt?.daysOff;
  }

  // get value of preferredShift. Retrieves it from the input if specified or takes it from existingEnt
  getNewPreferredShiftValue(): UserPreferredShift[] | null | undefined {
    if (this.input.preferredShift !== undefined) {
      return this.input.preferredShift;
    }
    return this.existingEnt?.preferredShift;
  }

  // get value of timeInMs. Retrieves it from the input if specified or takes it from existingEnt
  getNewTimeInMsValue(): BigInt | null | undefined {
    if (this.input.timeInMs !== undefined) {
      return this.input.timeInMs;
    }
    return this.existingEnt?.timeInMs;
  }

  // get value of fun_uuids. Retrieves it from the input if specified or takes it from existingEnt
  getNewFunUuidsValue(): ID[] | null | undefined {
    if (this.input.funUuids !== undefined) {
      return this.input.funUuids;
    }
    return this.existingEnt?.funUuids;
  }

  // get value of new_col. Retrieves it from the input if specified or takes it from existingEnt
  getNewNewColValue(): string | null | undefined {
    if (this.input.newCol !== undefined) {
      return this.input.newCol;
    }
    return this.existingEnt?.newCol;
  }

  // get value of new_col2. Retrieves it from the input if specified or takes it from existingEnt
  getNewNewCol2Value(): string | null | undefined {
    if (this.input.newCol2 !== undefined) {
      return this.input.newCol2;
    }
    return this.existingEnt?.newCol2;
  }

  // get value of superNestedObject. Retrieves it from the input if specified or takes it from existingEnt
  getNewSuperNestedObjectValue(): UserSuperNestedObject | null | undefined {
    if (this.input.superNestedObject !== undefined) {
      return this.input.superNestedObject;
    }
    return this.existingEnt?.superNestedObject;
  }

  // get value of nestedList. Retrieves it from the input if specified or takes it from existingEnt
  getNewNestedListValue(): UserNestedObjectList[] | null | undefined {
    if (this.input.nestedList !== undefined) {
      return this.input.nestedList;
    }
    return this.existingEnt?.nestedList;
  }
}
