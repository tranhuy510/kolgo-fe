import { getAuth } from "./Common";

export function getChats() {
    return getAuth("conversations");
}