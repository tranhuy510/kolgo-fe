export function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return "" + year + month + day + hours + minutes + seconds;
}

export function spreadDate(date) {
  let year = date?.slice(0, 4);
  let month = date?.slice(4, 6);
  let day = date?.slice(6, 8);
  let hour = date?.slice(8, 10);
  let minute = date?.slice(10, 12);
  let second = date?.slice(12);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
export const convertStringToDateTime = (string) => {
  // Trích xuất thành phần ngày, tháng, năm, giờ, phút và giây từ chuỗi
  const year = string.slice(0, 4);
  const month = string.slice(4, 6);
  const day = string.slice(6, 8);
  const hour = string.slice(8, 10);
  const minute = string.slice(10, 12);
  const second = string.slice(12, 14);

  // Tạo đối tượng DateTime từ các thành phần trích xuất
  return new Date(year, month - 1, day, hour, minute, second);
};

export function displayDateTime(date) {
  const dateTime = convertStringToDateTime(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("vi-Vn", options).format(dateTime);
}

export const calculateDaysAgo = (targetDate) => {
  const currentDate = new Date(); // Ngày hiện tại

  // Chuyển đổi thành số milliseconds
  const targetTime = convertStringToDateTime(targetDate).getTime();
  const currentTime = currentDate.getTime();

  // Tính toán số ngày chênh lệch
  const timeDiff = currentTime - targetTime;
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Chia cho số milliseconds trong 1 ngày

  return daysDiff;
};
