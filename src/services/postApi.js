export const postKolProfile = async (formData) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return await fetch(`http://localhost:8080/api/settings/kol-profile`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData
  });
};

export const postEntProfile = async (data) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return await fetch(`http://localhost:8080/api/settings/ent-profile`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
