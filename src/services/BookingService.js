import { getAuth, postAuth, putAuth } from "./Common";

export function createBooking(kolId, booking) {
    return postAuth(`kols/${kolId}/bookings`, booking);
}

export function getBooking(id) {
    return getAuth(`bookings/${id}`);
}

export function updateBookingStatus(id, status) {
    return putAuth(`user/bookings/${id}?status=${status}`);
}