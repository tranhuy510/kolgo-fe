export const getUsers = async () => {
  return await fetch(`http://localhost:8080/api/users`);
};

export const getKols = async () => {
  return await fetch(`http://localhost:8080/api/kols`);
};

export const getKolsId = async (params) => {
  return await fetch(`http://localhost:8080/api/kols/${params}`);
};

export const getFields = async () => {
  return await fetch(`http://localhost:8080/api/fields/kol`);
};

export const getEntFields = async () => {
  return await fetch(`http://localhost:8080/api/fields/ent`);
};

export const getKolProfile = async () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return await fetch(`http://localhost:8080/api/settings/kol-profile`, {
    method: "GET", // or GET
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
};

export const getEnterpriseProfile = async () => {
  return await fetch(`http://localhost:8080/api/settings/ent-profile`);
};

export const getGenders = async () => {
  return await fetch(`http://localhost:8080/api/genders`);
};

export const getCities = async () => {
  return await fetch(`http://localhost:8080/api/cities`);
};
