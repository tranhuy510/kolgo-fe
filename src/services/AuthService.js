import { post } from "./Common";

export function login(credentials) {
  post("auth/login", credentials);
}
