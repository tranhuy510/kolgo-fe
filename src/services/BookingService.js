import { getAuth, postAuth, putAuth } from "./Common";

export function createBooking(kolId, booking) {
    return postAuth(`kols/${kolId}/bookings`, booking);
}

export function getBookingByBookingId(bookingId) {
    return getAuth(`user/bookings/${bookingId}`);
}

export function getBookingByTxnRef(txnRef) {
    return getAuth(`user/bookings?txnRef=${txnRef}`);
}

export function updateBookingStatus(id, status) {
    return putAuth(`user/bookings/${id}?status=${status}`);
}

export function addBookingVnPayPayment(bookingId, paymentResult) {
    return postAuth(`user/bookings/${bookingId}/payments/vnpay`, paymentResult);
}

export function addBookingFeedback(bookingId, feedback) {
    return postAuth(`user/bookings/${bookingId}/feedbacks`, feedback)
}