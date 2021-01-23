<template>
  <summary-panel>
    <template #title>
      승천 도전
    </template>
    <template #content>
      {{ currentInfo.location }}
    </template>
    <template #desc>
      <el-tooltip
        class="item"
        effect="dark"
        :content="currentInfo.desc"
        placement="top"
      >
        <p>{{ currentInfo.desc }}</p>
      </el-tooltip>
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
  name: 'DreamingCityAscendantPanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
    const rotationInfo = [
      {
        location: '아펠리온의 무덤',
        desc: '검은 양파 4개 부신 후 중앙에 보호막이 벗겨진 수정파편 부수기',
      },
      {
        location: '에실라의 정원',
        desc: '주변에 흩어진 3개의 빛의 구체를 중앙 몰수된 제단에 넣고 기사 3마리 처치',
      },
      {
        location: '케레스의 스파인',
        desc: '부유한 발판을 타고 석상 머리 위로 올라가 방패보스 처치',
      },
      {
        location: '전령의 은둔지',
        desc: '부유한 발판을 타고 신전 가운데의 칼을 뽑고 기사 3마리 처치',
      },
      {
        location: '사라진 희망의 만',
        desc: '지저에 떠있는 돌을 타고 내려간 뒤 신전에서 마법사 2마리 처치',
      },
      {
        location: '별빛의 방',
        desc: '목표지점까지 안전하게 도달한 뒤 거대 기사보스 처치',
      },
    ];
    const currentDateTime = new Date().getTime();
    const firstDateTime = new Date('2020-12-23 02:00:00').getTime();
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
</style>
