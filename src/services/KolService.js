import { get, getAuth, putAuth, putFormDataAuth } from "./Common"

export function getKols() {
    return get('kols');
}

export function getKol(id) {
    return get(`kols/${id}`);
}

export function getKolsByFieldId(fieldId) {
    return get(`kols?fieldId=${fieldId}`);
}

export function getKolProfile() {
    return getAuth('kol/profile');
}

export function updateKolProfile(profile) {
    return putAuth('kol/profile', profile);
}

export function updateKolImages(images) {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i])
    }

    return putFormDataAuth('kol/images', formData);
}