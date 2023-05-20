import { postAuth } from "./Common";

export function createVnPayPayment(amount, bookingId) {
  return postAuth(`payments/vnpay?amount=${amount}&txnRef=${bookingId}`);
}

export function createPayment(bookingId, payment) {
  return postAuth(`user/bookings/${bookingId}/payments`, payment);
}
