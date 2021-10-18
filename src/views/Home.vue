<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <div class="home-top-area">
      <raid-challenge-box />
      <milestone-template />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RaidChallengeBox from '@/components/molecules/RaidChallengeBox.vue';
import MilestoneTemplate from '@/components/templates/MilestoneTemplate.vue';

export default defineComponent({
  name: 'Home',
  components: {
    RaidChallengeBox,
    MilestoneTemplate,
  },
});
</script>

<style scoped lang="scss">
.home-top-area {
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
}
</style>
