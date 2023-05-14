import { get, getAuth, putAuth } from "./Common";

export function getEnts() {
  return get("ents");
}

export function getEnt(id) {
  return get(`ents/${id}`);
}

export function getEntProfile() {
  return getAuth("ent/profile");
}

export function updateEntProfile(profile) {
  return putAuth("ent/profile", profile);
}
