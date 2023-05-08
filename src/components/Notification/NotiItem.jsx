import { Avatar } from "antd";

import classes from "./Notification.module.css";

export default function NotiItem({ item }) {
  const startDate = new Date(item.date);

  const now = new Date();
  const diff = now.getTime() - startDate.getTime();
  const daysPassed = Math.round(diff / (1000 * 60 * 60 * 24));

  const daysText = () => {
    if (daysPassed === 0) return "Hôm nay";
    if (daysPassed === 1) return "Hôm qua";
    if (daysPassed <= 7) return `${daysPassed} ngày trước`;
    if (daysPassed > 7) return `${Math.floor(daysPassed / 7)} tuần trước`;
  };

  const displayDays = daysText();

  return (
    <div className={classes["item-wrap"]}>
      <Avatar
        size={60}
        src={
          item?.avatar ? `http://localhost:8080/api/images/${item.avatar}` : ""
        }
        className={classes.avatar}
      >
        {item?.avatar ? "" : item?.firstName.charAt(0)?.toUpperCase()}
      </Avatar>

      <div
        className={`${classes["item-content"]} ${item.read && classes["read"]}`}
      >
        <p>
          <b>{item.name}</b>{" "}
          {item.action === "book" && "đã gửi lời mời hợp tác đến bạn"}
          {item.action === "campain" && "đã tạo chiến dịch mới"}
        </p>

        <p>{displayDays}</p>
      </div>
    </div>
  );
}
