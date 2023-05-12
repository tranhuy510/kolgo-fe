import { getAuth } from "./Common";

export function getNotification() {
    return getAuth("notification");
}