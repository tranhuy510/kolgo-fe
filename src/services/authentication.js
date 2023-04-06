export const register = async (credential) => {
  // return await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
  return await fetch(`http://localhost:8080/api/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
};

export const verify = async (params) => {
  // return await fetch(`${process.env.REACT_APP_API_URL}/auth/verify${params}`, {
  return await fetch(`http://localhost:8080/api/auth/verify${params}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const forgotPassword = async (email) => {
  // return await fetch(`${process.env.REACT_APP_API_URL}/auth/verify${params}`, {
  return await fetch(`http://localhost:8080/api/auth/reset_password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
};

export const updatePassword = async (token, data) => {
  console.log(data);
  // return await fetch(`${process.env.REACT_APP_API_URL}/auth/verify${params}`, {
  return await fetch(`http://localhost:8080/api/auth/update_password${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
