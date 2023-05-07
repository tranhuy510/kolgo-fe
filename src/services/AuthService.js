import { post } from "./common";

export function login(credentials) {
    post('auth/login', credentials)
}