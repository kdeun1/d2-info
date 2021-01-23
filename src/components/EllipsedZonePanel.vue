<template>
  <summary-panel>
    <template #title>
      일식지역
    </template>
    <template #content>
      {{ currentLocation }}
    </template>
    <template #planet>
      유로파
    </template>
    <template #dlc>
      빛의 저편
    </template>
  </summary-panel>
</template>

<script>
import { computed } from 'vue';
import SummaryPanel from '@/components/common/SummaryPanel';

export default {
  name: 'EllipsedZonePanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const rotation = ['카드모스 마루', '아스테리온 심연', '이븐타이드 폐허'];
    const currentDateTime = new Date().getTime();
    const firstDateTime = new Date('2021-01-13 02:00:00').getTime();
    const currentLocation = computed(() => rotation[
      Math.floor((currentDateTime - firstDateTime) / ONE_WEEK_MS) % rotation.length
    ]);

    return {
      rotation,
      currentLocation,
    };
  },
};
</script>

<style lang="scss">
</style>
