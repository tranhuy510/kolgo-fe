import { get, getAuth, putAuth, putFormDataAuth } from "./Common";

export function getKols() {
  return get("kols");
}

export function getKol(id) {
  return get(`kols/${id}`);
}

export function getKolsByFieldIds(fieldId) {
  return get(`kols?fieldIds=${fieldId}`);
}

export function getKolProfile() {
  return getAuth("kol/profile");
}

export function updateKolProfile(profile) {
  return putAuth("kol/profile", profile);
}

export function updateKolImages(images) {
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  return putFormDataAuth("kol/images", formData);
}

export function joinCampaign(campaignId) {
  return putAuth(`kol/campaigns/${campaignId}/join`)
}

export function quitCampaign(campaignId) {
  return putAuth(`kol/campaigns/${campaignId}/quit`)
}