const apiUrl = "http://localhost:8080/api";

const getAccessToken = () =>
  `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`;

async function httpRequestJson(method, uri, auth, body) {
  let options = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth && getAccessToken(),
    },
    body: body && JSON.stringify(body),
  };
  const res = await fetch(`${apiUrl}/${uri}`, options);
  const data = await res.json();
  return data;
}

export async function httpRequestFormData(method, uri, auth, formData) {
  let options = {
    method: method,
    headers: {
      Authorization: auth && getAccessToken(),
    },
    body: formData,
  };
  const res = await fetch(`${apiUrl}/${uri}`, options);
  const data = await res.json();
  return data;
}

export function post(uri, body) {
  return httpRequestJson("POST", uri, false, body);
}

export function postAuth(uri, body) {
  return httpRequestJson("POST", uri, true, body);
}

export function get(uri) {
  return httpRequestJson("GET", uri, false);
}

export function getAuth(uri) {
  return httpRequestJson("GET", uri, true);
}

export function putAuth(uri, body) {
  return httpRequestJson("PUT", uri, true, body);
}

export function putFormDataAuth(uri, formData) {
  return httpRequestFormData("PUT", uri, true, formData);
}

export function deleteAuth(uri) {
  return httpRequestJson("DELETE", uri, true);
}

export function postFormDataAuth(uri, formData) {
  return httpRequestFormData("POST", uri, true, formData)
}
