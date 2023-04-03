export const register = async (credential) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    //   return await fetch(`http://localhost:8080/api/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
};
