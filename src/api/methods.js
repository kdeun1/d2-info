import { baseInstance, platformInstance } from './index';

function getDestinyManifest() {
  return platformInstance.get('/Destiny2/Manifest/');
}

function getPublicMilestones() {
  return platformInstance.get('/Destiny2/Milestones/');
}

function getJson(url) {
  return baseInstance.get(url);
}

export {
  getDestinyManifest,
  getPublicMilestones,
  getJson,
};
