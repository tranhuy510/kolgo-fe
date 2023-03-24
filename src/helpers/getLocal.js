export const getUser = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  return users;
};
