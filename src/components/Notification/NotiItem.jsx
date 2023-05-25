import { Avatar } from "antd";

import classes from "./Notification.module.css";
import { updateNotificationStatus } from "../../services/NotificationService";
import { useNavigate } from "react-router-dom";
import { calculateDaysAgo } from "../../services/DateTimeUtil";

export default function NotiItem({ noti }) {
  const navigate = useNavigate();

  const daysPassed = calculateDaysAgo(noti.timestamp);

  const daysText = (daysPassed) => {
    if (daysPassed === 0) return "Hôm nay";
    if (daysPassed === 1) return "Hôm qua";
    if (daysPassed <= 7) return `${daysPassed} ngày trước`;
    if (daysPassed > 7) return `${Math.floor(daysPassed / 7)} tuần trước`;
  };

  const handleClick = () => {
    updateNotificationStatus(noti.id, "READ").then((res) => console.log(res));
    if (noti && noti.type === "BOOKING");
    window.location.replace(`/bookings/${noti.bookingId}`)
  };

  return (
    <div className={classes["item-wrap"]} onClick={handleClick}>
      <Avatar
        size={60}
        src={
          noti.userAvatar
            ? `http://localhost:8080/api/images/${noti.userAvatar}`
            : ""
        }
        className={classes.avatar}
      >
        {noti.userAvatar ? "" : noti.user?.firstName.charAt(0)?.toUpperCase()}
      </Avatar>

      <div
        className={`${classes["item-content"]} ${
          noti.status === "READ" && classes["read"]
        }`}
      >
        <p>{noti?.content}</p>
        <p>{daysText(daysPassed)}</p>
      </div>
    </div>
  );
}
