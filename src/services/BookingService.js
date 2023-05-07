import { getAuth, postAuth } from "./Common";

export function createBooking(booking) {
    return postAuth('bookings', booking);
}

export function getBooking(id) {
    return getAuth(`bookings/${id}`);
}