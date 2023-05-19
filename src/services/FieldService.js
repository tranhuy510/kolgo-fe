import { get } from "./Common";

export function getFields() {
  return get("fields");
}

export function getKolFields() {
  return get("fields/kol");
}

export function getEntFields() {
  return get("fields/ent");
}
