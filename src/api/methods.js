import axios from 'axios';
import store from '@/store';
import { platformInstance, tokenInstance } from './index';

function getDestinyManifest() {
  return platformInstance.get('/Destiny2/Manifest/');
}

function getPublicMilestones() {
  return platformInstance.get('/Destiny2/Milestones/');
}

function getJson(url) {
  return axios.get(url);
}

function getCurrentBungieNetUser() {
  return tokenInstance.get('/User/GetCurrentBungieNetUser/');
}

function getBungieAccount() {
  // const membershipId = '4611686018485555033';
  const { membershipId } = store.getters['user/getCurrentBungieNetUser'];
  return platformInstance.get(`/User/GetBungieAccount/${membershipId}/254/`);
}

function getMembershipsForCurrentUser() {
  return tokenInstance.get('/User/getMembershipsForCurrentUser/');
}

function getProfileCurrenciesInventory() {
  const membershipsForCurrentUser = store.getters['user/getMembershipsForCurrentUser'];
  const membership = membershipsForCurrentUser
    .find((v) => v.LastSeenDisplayNameType === v.membershipType)
    || { membershipId: null, membershipType: null };
  const { membershipId, membershipType } = membership;
  return tokenInstance.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=102,103`);
}

function getCharacterActivities(characterId) {
  const membershipsForCurrentUser = store.getters['user/getMembershipsForCurrentUser'];
  const membership = membershipsForCurrentUser
    .find((v) => v.LastSeenDisplayNameType === v.membershipType)
    || { membershipId: null, membershipType: null };
  const { membershipId, membershipType } = membership;
  return tokenInstance.get(`/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=204`);
}

function getProfile() {
  // const membershipType = store.getters['user/getCurrentMembershipType'];
  // const { membershipId } = store.getters['user/getCurrentBungieNetUser'];
  const membershipsForCurrentUser = store.getters['user/getMembershipsForCurrentUser'];
  const membership = membershipsForCurrentUser
    .find((v) => v.LastSeenDisplayNameType === v.membershipType)
    || { membershipId: null, membershipType: null };
  const { membershipId, membershipType } = membership;
  // const membershipId = '4611686018485555033';
  // const membershipType = 3;
  // eslint-disable-next-line max-len
  // return tokenInstance.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,102,103,104,200,201,202,204,205,300,301,302,303,304,305,306,307,308,309,310,700,800,900,1000,1100`);
  return tokenInstance.get(`/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,102,103,200`);
}

// getCurrentBungieNetUser 결과와 동일
function getBungieNetUserById(membershipId) {
  return tokenInstance.get(`/User/GetBungieNetUserById/${membershipId}`);
}

function getVendors(membershipType, destinyMembershipId) {
  return tokenInstance.get(`/Destiny2/${membershipType}/Profile/${destinyMembershipId}`);
}

export {
  getDestinyManifest,
  getPublicMilestones,
  getJson,
  getCurrentBungieNetUser,
  getBungieAccount,
  getMembershipsForCurrentUser,
  getProfileCurrenciesInventory,
  getCharacterActivities,
  getProfile,
  getBungieNetUserById,
  getVendors,
};
