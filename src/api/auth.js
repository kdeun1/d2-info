import { codeInstance } from '@/api/index';
import { useStore } from 'vuex';

function genToken() {
  const store = useStore();
  const authCode = store.getters['authorization/getAuthCode'];
  const form = new URLSearchParams();
  form.append('client_id', process.env.VUE_APP_OAUTH_CLIENT_ID);
  form.append('grant_type', 'authorization_code');
  form.append('code', authCode);
  return codeInstance.post(null, form);
}

export {
  // eslint-disable-next-line import/prefer-default-export
  genToken,
};
