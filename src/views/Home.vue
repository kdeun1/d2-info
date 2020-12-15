<template>
  <div class="home">
    <h3>milestone</h3>
    <br>
    <el-button
      @click="refreshMilestone"
    >
      주간 리셋 갱신
    </el-button>
    <br>
    갱신 시간 : {{ currentTime }}
    <br>
    주간 리셋 시간 : {{ weeklyRange }}
    <br>
    <br>
    <div
      v-for="list in computedMilestone"
      :key="list.milestoneHash"
    >
      {{ list }}
      <br><br>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { acceptMilestoneHash, getFormatDate, weeklyDateRange } from '@/common';

export default {
  name: 'Home',
  components: {
  },
  setup() {
    const milestone = ref({});
    const computedMilestone = computed(() => Object.values(milestone.value)
      .filter((v) => acceptMilestoneHash.includes(v.milestoneHash)));
    const currentTime = ref('');
    const weeklyRange = ref('');
    const store = useStore();

    const initMilestone = () => {
      console.log('Home.vue / initMilestone');
      store
        .dispatch('initMilestone')
        .then(() => { console.log('SUCCESS'); })
        .catch((e) => console.log(e));
    };

    const refreshMilestone = async () => {
      console.log('refreshMilestone');
      try {
        milestone.value = store.getters.getPublicMilestones;
      } catch (e) {
        console.log(`[initMilestone] ${e}`);
      } finally {
        currentTime.value = getFormatDate(new Date());
        weeklyRange.value = weeklyDateRange(new Date());
      }
    };

    onMounted(async () => {
      await initMilestone();
    });

    return {
      milestone,
      computedMilestone,
      refreshMilestone,
      currentTime,
      weeklyRange,
    };
  },
};
</script>
