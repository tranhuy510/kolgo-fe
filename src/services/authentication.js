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
  // return await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot_password`, {
  return await fetch(`http://localhost:8080/api/auth/forgot_password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
};

export const resetPassword = async (token, data) => {
  // return await fetch(`${process.env.REACT_APP_API_URL}/auth/reset_password${token}`, {
  return await fetch(`http://localhost:8080/api/auth/reset_password${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  return await fetch(
    `http://localhost:8080/api/auth/refresh_token?token=${refreshToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};
