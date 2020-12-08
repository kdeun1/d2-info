import { emptyInstance, publicInstance } from './index';

function getDestinyManifest() {
  return publicInstance.get('/Destiny2/Manifest/');
}

function getPublicMilestones(option = null) {
  return publicInstance.get('/Destiny2/Milestones/', option);
}

function getManifestMilestone(url) {
  return emptyInstance.get(url);
}

export {
  getDestinyManifest,
  getPublicMilestones,
  getManifestMilestone,
};
