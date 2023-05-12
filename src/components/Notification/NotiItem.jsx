import { Avatar } from "antd";

import classes from "./Notification.module.css";

export default function NotiItem({ noti }) {
  // const startDate = new Date(notification.timestamp);

  // const now = new Date();
  // const diff = now.getTime() - startDate.getTime();
  // const daysPassed = Math.round(diff / (1000 * 60 * 60 * 24));

  const daysText = () => {
    // if (daysPassed === 0) return "Hôm nay";
    // if (daysPassed === 1) return "Hôm qua";
    // if (daysPassed <= 7) return `${daysPassed} ngày trước`;
    // if (daysPassed > 7) return `${Math.floor(daysPassed / 7)} tuần trước`;
  };

  const displayDays = daysText();

  return (
    <div className={classes["item-wrap"]}>
      <Avatar
        size={60}
        src={
          noti.user?.avatar ? `http://localhost:8080/api/images/${noti.user.avatar}` : ""
        }
        className={classes.avatar}
      >
        {noti.user?.avatar ? "" : noti.user?.firstName.charAt(0)?.toUpperCase()}
      </Avatar>

      <div
        className={`${classes["item-content"]} ${noti.status === 'READ' && classes["read"]}`}
      >
        <p>{noti?.content}</p>
        {/* <p>
          <b>{notification.user?.name}</b>{" "}
          {notification.action === "book" && "đã gửi lời mời hợp tác đến bạn"}
          {notification.action === "campain" && "đã tạo chiến dịch mới"}
        </p> */}

        <p>{noti?.timestamp}</p>
      </div>
    </div>
  );
}
