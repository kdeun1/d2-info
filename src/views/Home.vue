<template>
  <div
    v-loading="!apiStatus.finishManifest || !apiStatus.finishMilestone"
    class="contents"
  >
    <h2>HOME</h2>
    <div class="contents-body">
      <p>최초 접속 시 번지넷과의 데이터 통신으로 인해 로딩이 존재합니다.</p>
      <br><br>
      <p>해당 사이트는 PC 기준 최신버전 크롬 브라우저를 권장합니다.</p>
      <br><br>
      <p>로그인을 하면 주간 리셋 정보를 볼 수 있습니다.</p>
      <br><br>
      <p>한국 시간 새벽2시 전후로 로딩이 오래 걸릴 수 있습니다.</p>
      <br><br>
      <p>데이터 갱신이 이상한 경우 '설정' 메뉴로 가셔서 데이터 삭제 후 F5 눌러주세요.</p>
      <br><br><br>
      <p>Created by. 더강이</p>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { getDestinyManifest } from '@/api/methods';
import { isRefreshLocalStorage } from '@/common';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const apiStatus = reactive({
      finishManifest: false,
      finishMilestone: false,
    });
    let timer;
    let milestoneTimer;

    const getManifest = async () => {
      try {
        await store.dispatch('initManifest');
        await store.dispatch('initDestinyMilestoneDefinition');
        await store.dispatch('initDestinyActivityDefinition');
        await store.dispatch('initDestinyActivityModifierDefinition');
        clearTimeout(timer);
        apiStatus.finishManifest = true;
      } catch (e) {
        console.log(`[App.vue] getManifest : ${e}`);
        timer = setTimeout(() => {
          getManifest();
        }, 3000);
      }
    };

    const initManifest = async () => {
      try {
        const res = await getDestinyManifest();
        const { version } = res.data.Response;
        const { isDestinyManifest } = store.getters;
        const localStorageVersion = store.getters.getDestiny2ManifestVersion;
        if (!isDestinyManifest || (version !== localStorageVersion)) {
          await store.dispatch('initManifest');
          await store.commit('setDestiny2ManifestVersion', version);
          await store.dispatch('initDestinyMilestoneDefinition');
          await store.dispatch('initDestinyActivityDefinition');
          await store.dispatch('initDestinyActivityModifierDefinition');
          clearTimeout(timer);
        }
        apiStatus.finishManifest = true;
      } catch (e) {
        console.log(`[App.vue] initManifest : ${e}`);
        timer = setTimeout(() => {
          initManifest();
        }, 3000);
      }
    };

    const getMilestone = async () => {
      try {
        await store.dispatch('milestone/initMilestone');
        await store.commit('milestone/setTimestamp', new Date());
        clearTimeout(milestoneTimer);
        apiStatus.finishMilestone = true;
      } catch (e) {
        console.log(`[App.vue] getMilestone : ${e}`);
        milestoneTimer = setTimeout(() => {
          getMilestone();
        }, 4000);
      }
    };

    const initMilestone = async () => {
      try {
        const milestoneTimestamp = store.getters['milestone/getTimestamp'];
        if (!milestoneTimestamp) {
          await store.dispatch('milestone/initMilestone');
          await store.commit('milestone/setTimestamp', new Date());
          clearTimeout(milestoneTimer);
        } else {
          const milestoneDate = new Date(milestoneTimestamp);
          const isRefresh = isRefreshLocalStorage(milestoneDate);
          const isPublicMilestones = store.getters['milestone/isPublicMilestones'];
          if (!isPublicMilestones || isRefresh) {
            await store.dispatch('milestone/initMilestone');
            await store.commit('milestone/setTimestamp', new Date());
            clearTimeout(milestoneTimer);
          }
        }
        apiStatus.finishMilestone = true;
      } catch (e) {
        console.log(`[App.vue] initMilestone : ${e}`);
        milestoneTimer = setTimeout(() => {
          initMilestone();
        }, 4000);
      }
    };

    const init = async () => {
      await initManifest();
      await initMilestone();
    };

    init();

    return {
      apiStatus,
      getManifest,
      getMilestone,
    };
  },
};
</script>

<style lang="scss">
</style>
