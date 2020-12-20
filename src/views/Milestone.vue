<template>
  <div class="home">
    <h3>주간 리셋</h3>
    <br>
    갱신 시간 : {{ apiStatus.currentTime }}
    <br>
    주간 리셋 시간
    <el-tooltip
      class="item"
      effect="dark"
      content="정확히는 수요일 새벽 2시에 업데이트 됩니다."
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
      milestone : {{ milestone }}
      <hr>
      <div
        v-for="list in computedMilestone"
        :key="list.milestoneHash"
      >
        {{ list }}
        <br><br>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, reactive, computed,
  onMounted, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { acceptMilestoneHash, getFormatDate, weeklyDateRange } from '@/common';

export default {
  name: 'Milestone',
  components: {
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

    const initMilestone = async () => {
      try {
        const isPublicMilestones = store.getters['milestone/isPublicMilestones'];
        if (!isPublicMilestones) {
          await store.dispatch('milestone/initMilestone');
          clearTimeout(timer);
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

    onMounted(() => {
      initMilestone();
    });

    onBeforeMount(() => {
      clearTimeout(timer);
    });

    return {
      milestone,
      computedMilestone,
      apiStatus,
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
</style>
