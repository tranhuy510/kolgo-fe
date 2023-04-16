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
