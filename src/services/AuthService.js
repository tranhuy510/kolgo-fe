import { post } from "./Common";

export function login(credentials) {
  return post("auth/login", credentials);
}
