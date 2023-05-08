import { postAuth } from "./Common";

export function createVnPayPayment(payment) {
    return postAuth("vnpay/payment", payment);
}