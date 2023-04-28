const accessToken = `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`;
const apiUrl = "http://localhost:8080/api";

async function fetchData(params, auth) {
  let options = {
    method: "GET",
    // Accept: "application/json",
    headers: {
      Authorization: auth && accessToken,
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
      // Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: auth && accessToken,
    },
    body: JSON.stringify(body),
  };
  console.log(accessToken);
  const res = await fetch(`${apiUrl}/${params}`, options);
  const data = await res.json();
  return data;
}

async function putFormData(params, formData, auth) {
  let options = {
    method: "PUT",
    headers: {
      Authorization: auth && accessToken,
    },
    body: formData,
  };
  const res = await fetch(`${apiUrl}/${params}`, options);
  const data = await res.json();
  return data;
}

export { fetchData, updateData, putFormData };
