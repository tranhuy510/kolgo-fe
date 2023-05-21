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

  return (
    "" +
    year +
    "/" +
    month +
    "/" +
    day +
    " - " +
    hour +
    "/" +
    minute +
    "/" +
    second
  );
}
