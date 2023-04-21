async function fetchData(params, auth) {
    let options = {
        method: "GET",
        // Accept: "application/json",
        headers: ({
            Authorization: auth && `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        })
    };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${params}`, options);
    const data = await res.json();
    return data;
}

async function postData(params, body, auth) {
    let options = {
        method: "POST",
        headers: ({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth && `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }),
        body: JSON.stringify(body)
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${params}`, options);
    const data = await res.json();
    return data;
}

export {
    fetchData,
    postData
};