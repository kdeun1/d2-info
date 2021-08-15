import { platformInstance } from '@/api/index';

const getDestinyManifest = () => platformInstance.get('/Destiny2/Manifest/');

export {
  getDestinyManifest,
};
