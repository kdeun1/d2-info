<template>
  <div class="home">
    <h3>주간 리셋</h3>
    <br>
    <el-button
      v-show="isError"
      @click="refreshMilestone"
    >
      주간 리셋 리프레쉬
    </el-button>
    <br>
    갱신 시간 : {{ currentTime }}
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
    : {{ weeklyRange }}
    <br><hr><br>
    <div v-if="!isError">
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
    <div v-else>
      <p>현재 정상적으로 주간리셋 데이터를 가져오지 못했습니다.</p>
      <br>
      <p>주간 리셋 리프레쉬 버튼을 다시 클릭해주세요!</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { acceptMilestoneHash, getFormatDate, weeklyDateRange } from '@/common';

export default {
  name: 'Milestone',
  components: {
  },
  setup() {
    const store = useStore();
    const isError = ref(false);
    const milestone = ref({});
    const computedMilestone = computed(() => Object.values(milestone.value)
      .filter((v) => acceptMilestoneHash.includes(v.milestoneHash)));
    const currentTime = ref('');
    const weeklyRange = ref('');

    const initMilestone = async () => {
      try {
        await store.dispatch('initMilestone');
        milestone.value = store.getters.getPublicMilestones;
      } catch (e) {
        isError.value = true;
        console.log(`[initMilestone] ${e}`);
      } finally {
        currentTime.value = getFormatDate(new Date());
        weeklyRange.value = weeklyDateRange(new Date());
      }
    };

    const refreshMilestone = () => {
      isError.value = false;
      initMilestone();
    };

    onMounted(() => {
      initMilestone();
    });

    return {
      isError,
      milestone,
      computedMilestone,
      refreshMilestone,
      currentTime,
      weeklyRange,
    };
  },
};
</script>

<style lang="scss">
.el-icon-alarm-clock {
  cursor: pointer;
}
</style>
