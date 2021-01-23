<template>
  <summary-panel>
    <template #title>
      시뮬레이션
    </template>
    <template #content>
      {{ currentInfo.type }}
    </template>
    <template #desc>
      {{ currentInfo.desc }}
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
  name: 'SimulationPanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const rotationInfo = [
      {
        type: '생존',
        desc: '시뮬레이션 히드라 처치',
        iconClass: 'empireHuntTheDarkPriestess',
      },
      {
        type: '민첩성',
        desc: '부유하는 박스 부수기',
        iconClass: 'empireHuntTheWarrior',
      },
      {
        type: '보호',
        desc: '시뮬레이션 관문 군주 처치',
        iconClass: 'empireHuntTheTechnocrat',
      },
    ];
    const currentDateTime = new Date().getTime();
    const firstDateTime = new Date('2021-01-20 02:00:00').getTime();
    const currentInfo = computed(() => rotationInfo[
      Math.floor((currentDateTime - firstDateTime) / ONE_WEEK_MS) % rotationInfo.length
    ]);

    return {
      currentInfo,
    };
  },
};
</script>

<style lang="scss">
.difficulty {
  display: inline;
  font-size: 10px;
}
.type-wrapper {
  display: flex;
  color: black;

  >.label {
    margin: 0 3px;
  }
}
.icon {
  width: 15px;
  height: 15px;
  background-color: black;
}
</style>
