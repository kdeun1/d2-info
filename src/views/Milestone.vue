<template>
  <div class="home">
    <h3>주간 리셋</h3>
    <br>
    화면 갱신 시간 : {{ apiStatus.currentTime }}
    <br>
    localStorage 데이터 시간 : {{ localStorageMilestoneFormatDate }}
    <br>
    주간 리셋 시간
    <el-tooltip
      class="item"
      effect="dark"
      content="대략 새벽 2시에 번지넷 데이터가 업데이트 되나, 해당 주간 리셋은 새벽 2시 30분 기준으로 데이터를 갱신합니다."
      placement="top"
    >
      <i class="el-icon-alarm-clock" />
    </el-tooltip>
    : {{ apiStatus.weeklyRange }}
    <br><hr><br>
    <div
      v-loading="!apiStatus.isFinish"
      class="milestone-body"
    >
      <div
        v-if="apiStatus.isFinish"
        class="milestone-box-wrapper"
      >
        <nightfall-box />
        <vanguard-box />
        <crucible-box />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, reactive, computed,
  onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { acceptMilestoneHash, getFormatDate, weeklyDateRange } from '@/common';
import NightfallBox from '@/components/NightfallBox';
import VanguardBox from '@/components/VanguardBox';
import CrucibleBox from '@/components/CrucibleBox';

export default {
  name: 'Milestone',
  components: {
    NightfallBox,
    VanguardBox,
    CrucibleBox,
  },
  setup() {
    const store = useStore();
    const milestone = ref({});
    const apiStatus = reactive({
      currentTime: '',
      weeklyRange: '',
      isFinish: false,
    });
    let timer;

    const computedMilestone = computed(() => Object.values(milestone.value || {})
      .filter((v) => acceptMilestoneHash.includes(v.milestoneHash)));
    const localStorageMilestoneDate = computed(() => store.getters['milestone/getTimestamp']);
    const localStorageMilestoneFormatDate = computed(
      () => getFormatDate(new Date(localStorageMilestoneDate.value)),
    );

    /*
      새벽 2시 30분 기준으로 새로운 데이터를 불러와야하는지 확인하는 로직
     */
    const isDiffCurrentDate = (date) => {
      const compareDateInfo = {
        hour: date.getHours(),
        min: date.getMinutes(),
        ms: date.getTime(),
      };
      const currentDate = new Date();
      const currentDateInfo = {
        hour: currentDate.getHours(),
        min: currentDate.getMinutes(),
        ms: currentDate.getTime(),
      };
      let result = false; // 변경이 필요없음
      if (Math.abs(compareDateInfo.ms - currentDateInfo.ms) > 86400000) {
        result = true;
      } else if (compareDateInfo.hour < 2 && currentDateInfo.hour > 2) {
        result = true;
      } else if (compareDateInfo.min < 30 && currentDateInfo.min >= 30) {
        result = true;
      }
      return result;
    };

    const initMilestone = async () => {
      try {
        const isPublicMilestones = store.getters['milestone/isPublicMilestones'];
        if (!isPublicMilestones) {
          if (localStorageMilestoneDate.value) {
            const isDiff = isDiffCurrentDate(localStorageMilestoneDate.value);
            if (isDiff) {
              await store.dispatch('milestone/initMilestone');
              store.commit('milestone/setTimestamp', new Date());
              clearTimeout(timer);
            }
          } else {
            await store.dispatch('milestone/initMilestone');
            store.commit('milestone/setTimestamp', new Date());
            clearTimeout(timer);
          }
        }
        apiStatus.isFinish = true;
        milestone.value = store.getters['milestone/getPublicMilestones'];
      } catch (e) {
        console.log(`[Milestone.vue] initMilestone : ${e}`);
        timer = setTimeout(() => {
          initMilestone();
        }, 5000);
      } finally {
        apiStatus.currentTime = getFormatDate(new Date());
        apiStatus.weeklyRange = weeklyDateRange(new Date());
      }
    };

    const getDisplayProperty = (hash) => {
      const { displayProperties } = store.getters.getDestinyMilestoneDefinitionByKey(hash);
      return {
        name: displayProperties.name,
        description: displayProperties.description,
        icon: displayProperties.icon,
      };
    };

    initMilestone();

    onBeforeMount(() => {
      clearTimeout(timer);
    });

    return {
      milestone,
      computedMilestone,
      apiStatus,
      localStorageMilestoneFormatDate,
      getDisplayProperty,
    };
  },
};
</script>

<style lang="scss">
.milestone-body {
  min-height: 300px;
}
.el-icon-alarm-clock {
  cursor: pointer;
}
.milestone-box-wrapper {

}
</style>
