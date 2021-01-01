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
  const { membershipId } = store.getters['user/getCurrentBungieNetUser'];
  return platformInstance.get(`/User/GetBungieAccount/${membershipId}/254/`);
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
  getBungieNetUserById,
  getVendors,
};
