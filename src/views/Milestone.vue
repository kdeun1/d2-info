<template>
  <div class="home">
    <h3>주간 리셋</h3>
    <br>
    <div v-if="milestoneFormatDate">
      데이터 패치 시간 : {{ milestoneFormatDate }}
    </div>
    <br>
    <div v-if="milestoneWeeklyRange">
      주간 리셋 시간
      <el-tooltip
        class="item"
        effect="dark"
        content="대략 새벽 2시에 번지넷 데이터가 업데이트 되나, 해당 주간 리셋은 새벽 2시 30분 기준으로 데이터를 갱신합니다."
        placement="top"
      >
        <i class="el-icon-alarm-clock" />
      </el-tooltip>
      : {{ milestoneWeeklyRange }}
    </div>

    <br><hr><br>
    <div class="milestone-body">
      <div class="milestone-box-wrapper">
        <nightfall-box />
        <vanguard-box />
        <crucible-box />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
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

    const milestone = computed(() => store.getters['milestone/getPublicMilestones']);
    const computedMilestone = computed(() => Object.values(milestone.value || {})
      .filter((v) => acceptMilestoneHash.includes(v.milestoneHash)));
    const milestoneTime = computed(() => new Date(store.getters['milestone/getTimestamp']));
    const milestoneFormatDate = computed(() => getFormatDate(milestoneTime.value));
    const milestoneWeeklyRange = computed(() => weeklyDateRange(milestoneTime.value));

    return {
      milestone,
      computedMilestone,
      milestoneFormatDate,
      milestoneWeeklyRange,
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
