export const getEntFields = async () => {
  return await fetch(`http://localhost:8080/api/fields/ent`);
};

export const getKolProfile = async () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return await fetch(`http://localhost:8080/api/kol/profile`, {
    method: "GET", // or GET
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
};

export const getEntProfile = async () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return await fetch(`http://localhost:8080/api/ent/profile`, {
    method: "GET", // or GET
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
};

export const getPaymentHistory = async () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return await fetch(`http://localhost:8080/api/user/payments`, {
    method: "GET", // or GET
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
};

export const getBookingHistory = async () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return await fetch(`http://localhost:8080/api/user/bookings`, {
    method: "GET", // or GET
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
};
