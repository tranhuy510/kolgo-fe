import { getAuth, putAuth } from "./Common";

export function getNotifications() {
    return getAuth("notification");
}

export function updateNotificationStatus(notiId, status){
    return putAuth(`notification/${notiId}?status=${status}`, {});
}