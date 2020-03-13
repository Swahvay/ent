import {
  AddressBase,
  AddressCreateInput,
  AddressEditInput,
  createAddressFrom,
  editAddressFrom,
  deleteAddress,
} from "./generated/address_base";
import { ID, Viewer } from "ent/ent";

// we're only writing this once except with --force and packageName provided
export default class Address extends AddressBase {}

// no actions yet so we support full create, edit, delete for now
export { AddressCreateInput, AddressEditInput, deleteAddress };

export async function createAddress(
  viewer: Viewer,
  input: AddressCreateInput,
): Promise<Address | null> {
  return createAddressFrom(viewer, input, Address);
}

export async function editAddress(
  viewer: Viewer,
  id: ID,
  input: AddressEditInput,
): Promise<Address | null> {
  return editAddressFrom(viewer, id, input, Address);
}
