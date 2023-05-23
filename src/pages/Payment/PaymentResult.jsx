import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createPayment } from "../../services/PaymentService.js";

import classes from "./PaymentResult.module.css";
import { Col, Row } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useContext } from "react";
import { MessageContext } from "../../context/Message.context.js";
import {
  getBookingByBookingId,
  updateBookingStatus,
} from "../../services/BookingService.js";
import { formatDate } from "../../services/DateTimeUtil.js";
import { formatCurrency } from "../../services/CurrencyUtil.js";

function PaymentResult() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { sendPrivateNotification } = useContext(MessageContext);
  const [params, setParams] = useSearchParams();
  const [payment, setPayment] = useState({});
  const [kol, setKol] = useState({});
  useEffect(() => {
    const paymentResult = {
      method: "VNPAY",
      amount: params.get("vnp_Amount"),
      bankCode: params.get("vnp_BankCode"),
      bankTxnNo: params.get("vnp_BankTranNo"),
      // vnp_CardType: params.get("vnp_CardType"),
      description: params.get("vnp_OrderInfo"),
      timestamp: params.get("vnp_PayDate"),
      // responseCode: params.get("vnp_ResponseCode"),
      // vnp_TmnCode: params.get("vnp_TmnCode"),
      txnNo: params.get("vnp_TransactionNo"),
      status:
        params.get("vnp_TransactionStatus") === "00" ? "SUCCESS" : "FAILED",
      txnRef: params.get("vnp_TxnRef"),
      // vnp_SecureHash: params.get("vnp_SecureHash"),
    };
    setPayment(paymentResult);
    createPayment(paymentResult.txnRef, paymentResult);
    getBookingByBookingId(paymentResult.txnRef).then((res) => {
      setKol(res.kol);
      if (paymentResult.status === "SUCCESS") {
        updateBookingStatus(paymentResult.txnRef, "PAID");
        sendPrivateNotification({
          type: "BOOKING",
          bookingId: paymentResult.txnRef,
          content: `${user.firstName} đã thanh toán phí hợp tác cho bạn.`,
          timestamp: formatDate(new Date()),
          userId: res.kol.userId,
        });
      }
    });
  }, []);
  return (
    <div className={classes.payment}>
      <Row>
        <Col offset={4}></Col>
        <Col span={16}>
          <div className={classes["payment-wrap"]}>
            {payment.status === "SUCCESS" ? (
              <CheckCircleFilled className={classes["icon-success"]} />
            ) : (
              <CloseCircleFilled className={classes["icon-failed"]} />
            )}

            <h3 class="text-muted">
              {payment.status === "SUCCESS"
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
            </h3>

            {payment.status === "SUCCESS" && (
              <p>
                Quý doanh nghiệp đã thanh toán thành công{" "}
                <b>{formatCurrency("vi-VN", "VND", payment.amount / 100)}</b>{" "}
                cho KOL <b>{`${kol.firstName} ${kol.lastName}`}</b>. Mã giao
                dịch <b>{payment.txnNo}</b>.
              </p>
            )}

            {payment.status === "FAILED" && (
              <p>
                Giao dịch không thực hiện được. Vui lòng thử lại sau. Mã giao
                dịch <b>{payment.txnNo}</b>
              </p>
            )}

            <Link to="/">Trở về trang chủ</Link>
            <footer class="footer">
              <p>&copy; VNPAY 2023</p>
            </footer>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentResult;
