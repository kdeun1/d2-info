<template>
  <summary-panel>
    <template #title>
      잊혀진 구역 (유로파 or 발사기지)
    </template>
    <template #content>
      마스터 - {{ currentInfo.master.lostSector }}
      <p class="difficulty">
        ({{ currentInfo.master.exoticPart }})
      </p>
      <br>
      전설 - {{ currentInfo.legend.lostSector }}
      <p class="difficulty">
        ({{ currentInfo.legend.exoticPart }})
      </p>
    </template>
    <template #planet>
      {{ currentInfo.master.location }}
      /
      {{ currentInfo.legend.location }}
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
  name: 'LostSectorEuropaPanel',
  components: {
    SummaryPanel,
  },
  props: {
  },
  setup() {
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    const lostSectors = [
      '숨겨진 공허',
      '벙커 E15',
      '파멸',
      '엑소더스 정원 2A',
      '벨레스 미궁',
    ];
    const locations = [
      '유로파',
      '유로파',
      '유로파',
      '발사기지',
      '발사기지',
    ];
    const exoticParts = [
      '머리',
      '다리',
      '팔',
      '가슴',
    ];
    const currentDateTime = new Date().getTime();
    const masterDateTime = new Date('2021-01-24 02:00:00').getTime();
    const legendDateTime = new Date('2021-01-23 02:00:00').getTime();
    const currentInfo = computed(() => ({
      master: {
        lostSector: lostSectors[
          Math.floor((currentDateTime - masterDateTime) / ONE_DAY_MS) % lostSectors.length
        ],
        location: locations[
          Math.floor((currentDateTime - masterDateTime) / ONE_DAY_MS) % locations.length
        ],
        exoticPart: exoticParts[
          Math.floor((currentDateTime - masterDateTime) / ONE_DAY_MS) % exoticParts.length
        ],
      },
      legend: {
        lostSector: lostSectors[
          Math.floor((currentDateTime - legendDateTime) / ONE_DAY_MS) % lostSectors.length
        ],
        location: locations[
          Math.floor((currentDateTime - legendDateTime) / ONE_DAY_MS) % lostSectors.length
        ],
        exoticPart: exoticParts[
          Math.floor((currentDateTime - legendDateTime) / ONE_DAY_MS) % lostSectors.length
        ],
      },
    }));

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
</style>
