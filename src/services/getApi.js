import axios from "axios";

export const getUsers = async (params, auth) => {
  const options = {
    method: "GET",
    headers: {
      Authorization:
        auth && `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
    },
  };
  const res = await fetch(`http://localhost:8080/api/${params}`, options);
  const data = await res.json();
  return data;
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

export const getCities = async () => {
  return await fetch(`http://localhost:8080/api/cities`);
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f30d25df24msh9bad812b5887995p13a33ejsnab463f67d1d9",
    "X-RapidAPI-Host": "tiktok82.p.rapidapi.com",
  },
};

export const getSocialLinksSearch = async (param) => {
  return await fetch(
    `https://tiktok82.p.rapidapi.com/getProfile?username=suankotanki32000`,
    options
  );
};

export const getEnts = async () => {
  return await fetch(`http://localhost:8080/api/ents`);
};

export const getEntsId = async (params) => {
  return await fetch(`http://localhost:8080/api/ents/${params}`);
};
