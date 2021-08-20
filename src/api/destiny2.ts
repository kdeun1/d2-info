import { AxiosResponse } from 'axios';
import { platformInstance, MininumResponseDetails } from '@/api/index';

/**
 * Returns the current version of the manifest as a json object.
 * ref) https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest
 */
const getDestinyManifest = (): Promise<AxiosResponse<MininumResponseDetails>> => platformInstance.get('/Destiny2/Manifest/');

export {
  getDestinyManifest,
};
