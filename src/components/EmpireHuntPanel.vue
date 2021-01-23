<template>
  <summary-panel>
    <template #title>
      제국 사냥
    </template>
    <template #icon>
      <div
        class="home-summary-icon"
        :class="currentInfo.iconClass"
      />
    </template>
    <template #content>
      {{ currentInfo.boss }}
    </template>
    <template #desc>
      <div class="type-wrapper">
        <template v-if="currentInfo.type.arc">
          <img
            class="icon"
            src="../style/icons/nightfall/arc.png"
          >
          <p class="label">
            {{ currentInfo.type.arc }}
          </p>
        </template>
        <template v-if="currentInfo.type.void">
          <img
            class="icon"
            src="../style/icons/nightfall/void.png"
          >
          <p class="label">
            {{ currentInfo.type.void }}
          </p>
        </template>
        <template v-if="currentInfo.type.solar">
          <img
            class="icon"
            src="../style/icons/nightfall/solar.png"
          >
          <p class="label">
            {{ currentInfo.type.solar }}
          </p>
        </template>
        <template v-if="currentInfo.type.barrier">
          <img
            class="icon"
            src="../style/icons/nightfall/championsBarrier.png"
          >
          <p class="label">
            {{ currentInfo.type.barrier }}
          </p>
        </template>
        <template v-if="currentInfo.type.unstoppable">
          <img
            class="icon"
            src="../style/icons/nightfall/championsUnstoppable.png"
          >
          <p class="label">
            {{ currentInfo.type.unstoppable }}
          </p>
        </template>
        <template v-if="currentInfo.type.overload">
          <img
            class="icon"
            src="../style/icons/nightfall/championsOverload.png"
          >
          <p class="label">
            {{ currentInfo.type.overload }}
          </p>
        </template>
      </div>
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
import { hashProperty } from '@/common';
import SummaryPanel from '@/components/common/SummaryPanel';

export default {
  name: 'EmpireHuntPanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const rotationInfo = [
      {
        boss: '어둠의 여사제 크리디스',
        iconClass: 'empireHuntTheDarkPriestess',
        type: hashProperty[2205920677],
      },
      {
        boss: '전사 파일랙스',
        iconClass: 'empireHuntTheWarrior',
        type: hashProperty[4173217513],
      },
      {
        boss: '기술사관 프락시스',
        iconClass: 'empireHuntTheTechnocrat',
        type: hashProperty[5517242],
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
