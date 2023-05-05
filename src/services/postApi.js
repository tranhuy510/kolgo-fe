export const postKolProfile = async (formData) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return await fetch(`http://localhost:8080/api/kol/profile`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  });
};

export const postEntProfile = async (formData) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return await fetch(`http://localhost:8080/api/ent/profile`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  });
};

export const putEmail = async (formData) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return await fetch(`http://localhost:8080/api/user/email`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  });
};

export const postPassword = async (formData) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  return await fetch(`http://localhost:8080/api/user/password`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  });
};
