const apiUrl = "http://localhost:8080/api";

const getAccessToken = () =>
  `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`;

async function fetchData(params, auth) {
  let options = {
    method: "GET",
    Accept: "application/json",
    headers: {
      Authorization: auth && getAccessToken(),
    },
  };
  const res = await fetch(`${apiUrl}/${params}`, options);
  const data = await res.json();
  return data;
}

async function updateData(method, params, body, auth) {
  let options = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth && getAccessToken(),
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(`${apiUrl}/${params}`, options);
  const data = await res.json();
  return data;
}

function putData(params, body) {
  return updateData("PUT", params, body, true);
}

function postData(params, body) {
  return updateData("POST", params, body, true);
}

async function putFormData(params, formData) {
  let options = {
    method: "PUT",
    headers: {
      Authorization: getAccessToken(),
    },
    body: formData,
  };
  const res = await fetch(`${apiUrl}/${params}`, options);
  const data = await res.json();
  return data;
}

export { fetchData, putData, postData, putFormData };
