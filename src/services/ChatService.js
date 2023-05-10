import { getAuth, postAuth } from "./Common";

export function getChats() {
    return getAuth("chats");
}

export function createChat(body) {
    return postAuth("chats", body)
}