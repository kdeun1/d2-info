<template>
  <summary-panel>
    <template #title>
      악몽사냥
    </template>
    <template #content>
      {{ currentLocation }}
    </template>
    <template #desc>
      <el-tooltip
        class="item"
        effect="dark"
        :content="currentDescription"
        placement="top"
      >
        <p>{{ currentDescription }}</p>
      </el-tooltip>
    </template>
    <template #planet>
      달
    </template>
    <template #dlc>
      그림자 요새
    </template>
  </summary-panel>
</template>

<script>
import { computed } from 'vue';
import SummaryPanel from '@/components/common/SummaryPanel';

export default {
  name: 'NightmareZonePanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const rotation = [
      '슬픔의 안식처',
      '빛의 닻',
      '지옥문',
      '궁수의 시위',
    ];
    const description = [
      '크로타의 맹세 조르탈의 악몽',
      '미스락스의 공포 호르키스의 악몽',
      '시부 아라스의 발톱 작스의 악몽',
      '몰락자 의회',
    ];
    const currentDateTime = new Date().getTime();
    const firstDateTime = new Date('2020-12-23 02:00:00').getTime();
    const currentLocation = computed(() => rotation[
      Math.floor((currentDateTime - firstDateTime) / ONE_WEEK_MS) % rotation.length
    ]);
    const currentDescription = computed(() => description[
      Math.floor((currentDateTime - firstDateTime) / ONE_WEEK_MS) % rotation.length
    ]);

    return {
      rotation,
      currentLocation,
      currentDescription,
    };
  },
};
</script>

<style lang="scss">
</style>
