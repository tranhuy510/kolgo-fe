import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { postData } from "../../services/common";

import classes from "./PaymentResult.module.css";
import { Col, Row } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

function PaymentResult() {
  const [params, setParams] = useSearchParams();
  const [payment, setPayment] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const paymentResult = {
      method: "VNPAY",
      user: user,
      vnp_Amount: params.get("vnp_Amount"),
      vnp_BankCode: params.get("vnp_BankCode"),
      vnp_BankTranNo: params.get("vnp_BankTranNo"),
      vnp_CardType: params.get("vnp_CardType"),
      vnp_OrderInfo: params.get("vnp_OrderInfo"),
      vnp_PayDate: params.get("vnp_PayDate"),
      vnp_ResponseCode: params.get("vnp_ResponseCode"),
      vnp_TmnCode: params.get("vnp_TmnCode"),
      vnp_TransactionNo: params.get("vnp_TransactionNo"),
      vnp_TransactionStatus: params.get("vnp_TransactionStatus"),
      vnp_TxnRef: params.get("vnp_TxnRef"),
      vnp_SecureHash: params.get("vnp_SecureHash"),
    };
    setPayment({ ...paymentResult });
    postData("payments", paymentResult).then();
  }, []);
  return (
    <div className={classes.payment}>
      <Row>
        <Col offset={4}></Col>
        <Col span={16}>
          <div className={classes["payment-wrap"]}>
            {payment.vnp_TransactionStatus === "00" ? (
              <CheckCircleFilled className={classes["icon-success"]} />
            ) : (
              <CloseCircleFilled className={classes["icon-failed"]} />
            )}

            <h3 class="text-muted">
              {payment.vnp_TransactionStatus === "00"
                ? "Thanh toán thành công"
                : "Thanh toán thất bại"}
            </h3>

            <p>
              Quý doanh nghiệp đã thanh toán thành công{" "}
              <b>{payment.vnp_Amount}</b> cho KOL <b>{payment.vnp_Amount}</b> số
              hóa đơn <b>{payment.vnp_TransactionNo}</b>
            </p>

            <Link to="/">Trở về trang chủ</Link>

            {/* <div class="table-responsive">
              <div class="form-group">
                <label>Merchant Transaction Code: </label>
                <b>{payment.vnp_TxnRef}</b>
              </div>
              <div class="form-group">
                <label>Amount: </label>
                <b>{payment.vnp_Amount}</b>
              </div>
              <div class="form-group">
                <label>Order info: </label>
                <b>{payment.vnp_OrderInfo}</b>
              </div>
              <div class="form-group">
                <label>VNPAY Response Code: </label>
                <b>{payment.vnp_ResponseCode}</b>
              </div>
              <div class="form-group">
                <label>VNPAY Transaction Code: </label>
                <b>{payment.vnp_TransactionNo}</b>
              </div>
              <div class="form-group">
                <label>Bank Code: </label>
                <b>{payment.vnp_BankCode}</b>
              </div>
              <div class="form-group">
                <label>Pay Date:</label>
                <b>{payment.vnp_PayDate}</b>
              </div>
              <div class="form-group">
                <label>Payment Status: </label>
                <b>
                  {payment.vnp_TransactionStatus === "00"
                    ? "Success"
                    : "Failed"}
                </b>
              </div>
            </div> */}
            {/* <p>&nbsp;</p> */}
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
