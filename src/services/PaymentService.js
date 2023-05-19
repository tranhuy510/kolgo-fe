import { postAuth } from "./Common";

export function createVnPayPayment(amount, bookingId) {
    return postAuth(`payments/vnpay?amount=${amount}&txnRef=${bookingId}`);
}