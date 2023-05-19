import { deleteAuth, get, putAuth, putFormDataAuth } from "./Common";

export function getUsers() {
  return get("users");
}

export function getUserById(id) {
  return get(`users/${id}`);
}

export function updateUserEmail(email) {
  return putAuth("user/email", { email });
}

export function updateUserAvatar(avatar) {
  const formData = new FormData();
  formData.append("avatar", avatar);
  return putFormDataAuth("user/avatar", formData);
}

export function updateUserPassword(password) {
  return putAuth("user/password", password);
}

export function deleteUser(id) {
  return deleteAuth(`users/${id}`);
}
