<template>
  <summary-panel>
    <template #title>
      {{ currentInfo.curse }}
    </template>
    <template #content>
      {{ currentInfo.blindWellBoss }}
      <p class="monsterType">
        ({{ currentInfo.blindWellMonsterType }})
      </p>
    </template>
    <template #desc>
      {{ currentInfo.weeklyQuest }}
    </template>
    <template #planet>
      꿈의 도시
    </template>
    <template #dlc>
      포세이큰
    </template>
  </summary-panel>
</template>

<script>
import { computed } from 'vue';
import SummaryPanel from '@/components/common/SummaryPanel';

export default {
  name: 'DreamingCityCursePanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const rotationInfo = [
      {
        curse: '저주가 약할 때',
        weeklyQuest: '수행원 처치',
        blindWellBoss: '시라키스와 바르쿠우리스',
        blindWellMonsterType: '경멸자',
      },
      {
        curse: '저주가 강할 때',
        weeklyQuest: '오라클 엔진',
        blindWellBoss: '크라구르',
        blindWellMonsterType: '군체',
      },
      {
        curse: '저주가 가장 강할 때',
        weeklyQuest: '암흑의 수도원',
        blindWellBoss: '이노미나',
        blindWellMonsterType: '굴복자',
      },
    ];
    const currentDateTime = new Date().getTime();
    const firstDateTime = new Date('2020-12-30 02:00:00').getTime();
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
.monsterType {
  display: inline;
  font-size: 10px;
}
</style>
