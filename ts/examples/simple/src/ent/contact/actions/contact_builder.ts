// Generated by github.com/lolopinto/ent/ent, DO NOT EDIT.

import { Viewer, ID, Ent } from "ent/ent";
import { Action, Builder, WriteOperation, Changeset } from "ent/action";
import { Orchestrator } from "ent/orchestrator";
import schema from "src/schema/contact";
import Contact from "src/ent/contact";

export interface ContactInput {
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  userID?: string;
  requiredFields: string[];
}

export interface ContactAction extends Action<Contact> {
  getFields(): ContactInput;
}

function randomNum(): string {
  return Math.random()
    .toString(10)
    .substring(2);
}

export class ContactBuilder implements Builder<Contact> {
  private orchestrator: Orchestrator<Contact>;
  readonly placeholderID: ID;
  readonly ent = Contact;

  public constructor(
    public readonly viewer: Viewer,
    public readonly operation: WriteOperation,
    private action: ContactAction,
    public readonly existingEnt?: Ent | undefined,
  ) {
    this.placeholderID = `$ent.idPlaceholderID$ ${randomNum()}`;

    this.orchestrator = new Orchestrator({
      viewer: viewer,
      operation: this.operation,
      tableName: "contacts",
      ent: Contact,
      builder: this,
      action: action,
      schema: schema,
      editedFields: this.getEditedFields,
    });
  }

  private getEditedFields(): Map<string, any> {
    const fields = this.action.getFields();

    // required fields
    let m = {};
    let result = new Map<string, any>();
    for (const field of fields.requiredFields) {
      m[field] = true;
    }

    const addField = function(key: string, value: any, setNull: boolean) {
      if (value !== undefined) {
        result.set(key, value);
      } else if (setNull) {
        result.set(key, null);
      }
    };
    addField("emailAddress", fields.emailAddress, m["emailAddress"]);
    addField("firstName", fields.firstName, m["firstName"]);
    addField("lastName", fields.lastName, m["lastName"]);
    addField("userID", fields.userID, m["userID"]);
    return result;
  }

  async build(): Promise<Changeset<Contact>> {
    return this.orchestrator.build();
  }
}
