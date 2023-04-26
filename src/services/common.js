const accessToken = `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`;
const apiUrl = process.env.REACT_APP_API_URL;

async function fetchData(params, auth) {
    let options = {
        method: "GET",
        // Accept: "application/json",
        headers: ({
            Authorization: auth && accessToken
        })
    };
    const res = await fetch(`${apiUrl}/${params}`, options);
    const data = await res.json();
    return data;
}

async function postData(params, body, auth) {
    let options = {
        method: "POST",
        headers: ({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth && accessToken
        }),
        body: JSON.stringify(body)
    }
    const res = await fetch(`${apiUrl}/${params}`, options);
    const data = await res.json();
    return data;
}

async function putFormData(params, formData, auth) {
    let options = {
        method: "PUT",
        headers: ({
            Authorization: auth && accessToken
        }),
        body: formData
    }
    const res = await fetch(`${apiUrl}/${params}`, options);
    const data = await res.json();
    return data;
}

export {
    fetchData,
    postData,
    putFormData
};