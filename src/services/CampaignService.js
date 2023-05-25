import {
  getAuth,
  postAuth,
  putAuth,
  deleteAuth,
  get,
  postFormDataAuth,
} from "./Common";

// export function createCampaign(campaign) {
//   return postFormAuth(`ent/campaigns`, campaign);
// }

export function getCampaigns() {
  return get("campaigns");
}

export function getEntCampaigns() {
  return getAuth("ent/campaigns");
}

export function getCampaignByCampaignId(campaignId) {
  return getAuth(`ent/campaigns/${campaignId}`);
}

export function deleteCampaign(campaignId) {
  return deleteAuth(`ent/campaigns/${campaignId}`);
}

export function updateCampaignKolJoin(campaignId) {
  return putAuth(`kol/campaigns/${campaignId}/join`);
}

export function updateCampaignKolQuit(campaignId) {
  return putAuth(`kol/campaigns/${campaignId}/quit`);
}

export function createCampaign(data, images, fieldIds) {
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  Object.keys(data).map((key) => formData.append(key, data[key]));

  for (let i = 0; i < fieldIds.length; i++) {
    formData.append("fieldIds", fieldIds[i]);
  }

  return postFormDataAuth(`ent/campaigns`, formData);
}

export function updateCampaign(campaignId, campaign, images, fieldIds) {
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  Object.keys(campaign).map((key) => formData.append(key, campaign[key]));

  for (let i = 0; i < fieldIds.length; i++) {
    formData.append("fieldIds", fieldIds[i]);
  }

  console.log(campaignId);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  return putAuth(`ent/campaigns/${campaignId}`, formData);
}
