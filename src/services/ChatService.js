import { getAuth, postAuth } from "./Common";

export function getChats() {
    return getAuth("chats");
}

export function getChat(chatId) {
    return getAuth(`chats/${chatId}`);
}

export function createChat(chat) {
    return postAuth("chats", chat)
}