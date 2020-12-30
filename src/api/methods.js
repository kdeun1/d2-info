import axios from 'axios';
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

export {
  getDestinyManifest,
  getPublicMilestones,
  getJson,
  getCurrentBungieNetUser,
};
