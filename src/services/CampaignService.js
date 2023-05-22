import { getAuth, postAuth, putAuth, deleteAuth } from "./Common";

export function createCampaign(campaign) {
    return postAuth(`ent/campaigns`, campaign);
}

export function getCampaigns() {
    return getAuth('campaigns');
}

export function getEntCampaigns() {
    return getAuth('ent/campaigns');
}

export function getCampaignByCampaignId(campaignId) {
    return getAuth(`ent/campaigns/${campaignId}`);
}

export function updateCampaign(campaignId, campaign) {
    return putAuth(`ent/campaigns/${campaignId}`, campaign);
}

export function deleteCampaign(campaignId) {
    return deleteAuth(`ent/campaigns/${campaignId}`);
}