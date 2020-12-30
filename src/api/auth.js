import { authInstance } from '@/api/index';
import { useStore } from 'vuex';

function getToken() {
  const store = useStore();
  const authCode = store.getters['auth/getAuthCode'];
  return authInstance.post(`/client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&grant_type=authorization_code&code=${authCode}`);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  getToken,
};
