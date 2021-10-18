import { AxiosResponse } from 'axios';
import { platformInstance, MininumResponseDetails } from '@/api/index';

/**
 * Returns the current version of the manifest as a json object.
 * ref) https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest
 */
const getDestinyManifestAPI = (): Promise<AxiosResponse<MininumResponseDetails<any>>> => platformInstance.get('/Destiny2/Manifest/');

interface DestinyPublicMilestone {
  milestoneHash: number;
  availableQuest?: any[];
  activities?: any[];
  venderHashes?: any[];
  vendors?: any[];
  startDate?: null | string;
  endData?: null | string;
  order?: number;
}
interface DestinyPublicMilestoneObj {
  [milestoneHash: number]: DestinyPublicMilestone;
}

// Gets public information about currently available Milestones.
const getPublicMilestonesAPI = (): Promise<AxiosResponse<MininumResponseDetails<DestinyPublicMilestoneObj>>> => platformInstance.get('/Destiny2/Milestones/');

export {
  DestinyPublicMilestone,
  getDestinyManifestAPI,
  getPublicMilestonesAPI,
};
