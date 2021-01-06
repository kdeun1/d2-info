<template>
  <div class="contents">
    <loading-comp />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import router from '@/router';
import { genToken } from '@/api/auth';
import { getCurrentBungieNetUser, getBungieAccount, getMembershipsForCurrentUser } from '@/api/methods';
import LoadingComp from '@/components/LoadingComp';

export default {
  name: 'LoginRedirect',
  components: {
    LoadingComp,
  },
  setup() {
    const store = useStore();

    const getToken = async () => {
      try {
        const { data } = await genToken();
        await store.commit('token/setToken', data);
        // await localStorage.removeItem('authorization');
      } catch (e) {
        console.log(`[LoginRedirect.vue] getToken : ${e}`);
      }
    };

    const getCurrentUserInfo = async () => {
      try {
        const { data } = await getCurrentBungieNetUser();
        await store.commit('user/setCurrentBungieNetUser', data.Response);
      } catch (e) {
        console.log(`[LoginRedirect.vue] getCurrentUserInfo : ${e}`);
      }
    };

    const getBungieAccountInfo = async () => {
      try {
        const { data } = await getBungieAccount();
        await store.commit('user/setBungieAccount', data.Response.destinyMemberships);
      } catch (e) {
        console.log(`[LoginRedirect.vue] getBungieAccountInfo : ${e}`);
      }
    };

    const getMembershipsForCurrentUserInfo = async () => {
      try {
        const { data } = await getMembershipsForCurrentUser();
        await store.commit('user/setMembershipsForCurrentUser', data.Response.destinyMemberships);
      } catch (e) {
        console.log(`[LoginRedirect.vue] getMembershipsForCurrentUserInfo : ${e}`);
      }
    };

    const init = async () => {
      try {
        await getToken();
        await getCurrentUserInfo();
        await getBungieAccountInfo();
        await getMembershipsForCurrentUserInfo();
        // await localStorage.removeItem('authorization');
        await router.push({ name: 'MyPage' });
      } catch (e) {
        console.log(`[LoginRedirect.vue] init : ${e}`);
      }
    };

    init();

    return {
    };
  },
};
</script>

<style lang="scss">
</style>
