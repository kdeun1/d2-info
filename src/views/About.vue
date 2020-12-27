<template>
  <div class="about">
    <h1>테스트 페이지</h1>
    <nightfall-box />
  </div>
</template>

<script>
import NightfallBox from '@/components/NightfallBox';

export default {
  name: 'About',
  components: {
    NightfallBox,
  },
  setup() {
  },
};
</script>

<style lang="scss">
.milestone-box-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
