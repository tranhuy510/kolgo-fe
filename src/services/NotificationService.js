import { getAuth, putAuth } from "./Common";

export function getNotification() {
    return getAuth("notification");
}

export function updateNotificationStatus(notiId, status){
    return putAuth(`notification/${notiId}?status=${status}`, {});
}