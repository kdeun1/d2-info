<template>
  <div class="contents">
    <h2>주간 리셋</h2>
    <div class="contents-body">
      <div v-if="milestoneFormatDate">
        데이터 패치 시간 : {{ milestoneFormatDate }}
      </div>
      <br>
      <div v-if="milestoneWeeklyRange">
        주간 리셋 기간
        <el-tooltip
          class="item"
          effect="dark"
          content="대략 새벽 2시에 번지넷 데이터가 업데이트됩니다."
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
          <raid-challenge-box />
        </div>
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
import RaidChallengeBox from '@/components/RaidChallengeBox';

export default {
  name: 'Milestone',
  components: {
    NightfallBox,
    VanguardBox,
    CrucibleBox,
    RaidChallengeBox,
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
