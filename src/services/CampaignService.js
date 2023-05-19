import { postAuth } from "./Common";

export function createCampaign(campaign) {
    return postAuth(`ent/campaigns`, campaign);
}