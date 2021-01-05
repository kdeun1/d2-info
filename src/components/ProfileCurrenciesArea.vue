<template>
  <div class="currencies-card-area">
    <div class="currencies-card">
      <div class="currencies-icon glimmer" />
      {{ quantity.glimmer }}
    </div>
    <div class="currencies-card">
      <div class="currencies-icon legendaryShards" />
      {{ quantity.legendaryShards }}
    </div>
    <div class="currencies-card">
      <div class="currencies-icon brightDust" />
      {{ quantity.brightDust }}
    </div>
  </div>
  <div class="currencies-card-area">
    <div
      v-for="name in localMaterials"
      :key="name"
      class="currencies-card"
    >
      <div
        class="currencies-icon"
        :class="name"
      />
      {{ quantity[name] }}
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { getProfileCurrenciesInventory } from '@/api/methods';

export default {
  name: 'ProfileCurrenciesArea',
  components: {
  },
  props: {
  },
  setup() {
    const quantity = reactive({
      glimmer: 0,
      legendaryShards: 0,
      brightDust: 0,
      // ===================================
      ducklightShard: 0, // 황혼빛 조각
      phaseglassNeedle: 0, // 위상 유리 바늘
      baryonBough: 0, // 바리온 가지
      ethericSpiral: 0, // 에테르 소용돌이
      simulationSeed: 0, // 시뮬레이션 씨앗
      microphasicDatalattice: 0, // 극소상 데이터 격자
      seraphite: 0, // 세라파이트
      alkaneDust: 0, // 알칸 가루
      heliumFilaments: 0, // 헬륨 필라멘트
      spinmetalLeaves: 0, // 회전금속 잎
      glacialStarwort: 0, // 빙하 별꽃
      // ===================================
      darkFragment: 0, // 어둠 파편
      enhancementCore: 0, // 강화 코어
      enhancementPrism: 0, // 강화 프리즘
      ascendantShard: 0, // 승천 조각
      upgradeModule: 0, // 업그레이드 모듈
      spoilsOfConquest: 0, // 정복의 전리품
      raidBanner: 0, // 레이드 배너
      herealwaysPiece: 0, // 여기늘 조각
    });

    const localMaterials = ref([
      'ducklightShard',
      'phaseglassNeedle',
      'baryonBough',
      'ethericSpiral',
      'simulationSeed',
      'microphasicDatalattice',
      'seraphite',
      'alkaneDust',
      'heliumFilaments',
      'spinmetalLeaves',
      'glacialStarwort',
    ]);

    const init = async () => {
      try {
        const result = await getProfileCurrenciesInventory();
        const { Response } = result.data;
        const { profileCurrencies, profileInventory } = Response;

        quantity.glimmer = profileCurrencies.data.items
          .find((v) => v.itemHash === 3159615086)?.quantity || 0;
        quantity.legendaryShards = profileCurrencies.data.items
          .find((v) => v.itemHash === 1022552290)?.quantity || 0;
        quantity.brightDust = profileCurrencies.data.items
          .find((v) => v.itemHash === 2817410917)?.quantity || 0;

        quantity.ducklightShard = profileInventory.data.items
          .find((v) => v.itemHash === 950899352)?.quantity || 0;
        quantity.phaseglassNeedle = profileInventory.data.items
          .find((v) => v.itemHash === 1305274547)?.quantity || 0;
        quantity.baryonBough = profileInventory.data.items
          .find((v) => v.itemHash === 592227263)?.quantity || 0;
        quantity.ethericSpiral = profileInventory.data.items
          .find((v) => v.itemHash === 1177810185)?.quantity || 0;
        quantity.simulationSeed = profileInventory.data.items
          .find((v) => v.itemHash === 49145143)?.quantity || 0;
        quantity.microphasicDatalattice = profileInventory.data.items
          .find((v) => v.itemHash === 3487922223)?.quantity || 0;
        quantity.seraphite = profileInventory.data.items
          .find((v) => v.itemHash === 31293053)?.quantity || 0;
        quantity.alkaneDust = profileInventory.data.items
          .find((v) => v.itemHash === 2014411539)?.quantity || 0;
        quantity.heliumFilaments = profileInventory.data.items
          .find((v) => v.itemHash === 3592324052)?.quantity || 0;
        quantity.spinmetalLeaves = profileInventory.data.items
          .find((v) => v.itemHash === 293622383)?.quantity || 0;
        quantity.glacialStarwort = profileInventory.data.items
          .find((v) => v.itemHash === 1485756901)?.quantity || 0;

        quantity.darkFragment = profileInventory.data.items
          .find((v) => v.itemHash === 1633854071)?.quantity || 0;
        quantity.enhancementCore = profileInventory.data.items
          .find((v) => v.itemHash === 3853748946)?.quantity || 0;
        quantity.enhancementPrism = profileInventory.data.items
          .find((v) => v.itemHash === 4257549984)?.quantity || 0;
        quantity.ascendantShard = profileInventory.data.items
          .find((v) => v.itemHash === 4257549985)?.quantity || 0;
        quantity.upgradeModule = profileInventory.data.items
          .find((v) => v.itemHash === 2979281381)?.quantity || 0;
        quantity.spoilsOfConquest = profileInventory.data.items
          .find((v) => v.itemHash === 3702027555)?.quantity || 0;
        quantity.raidBanner = profileInventory.data.items
          .find((v) => v.itemHash === 3282419336)?.quantity || 0;
        quantity.herealwaysPiece = profileInventory.data.items
          .find((v) => v.itemHash === 2993288448)?.quantity || 0;
      } catch (e) {
        console.log(`[ProfileCurrenciesArea.vue] init : ${e}`);
      }
    };

    init();

    return {
      quantity,
      localMaterials,
    };
  },
};
</script>

<style lang="scss">
.currencies-card-area {
  display: flex;
  flex-flow: wrap;
}
.currencies-card {
  position: relative;
  width: 120px;
  min-width: 120px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px 0 40px;
  margin: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);
}
.currencies-icon {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  background-size: cover;

  &.glimmer {
    background-image: url('../style/icons/currency/glimmer.png');
  }
  &.brightDust {
    background-image: url('../style/icons/currency/brightDust.png');
  }
  &.legendaryShards {
    background-image: url('../style/icons/currency/legendaryShards.png');
  }

  &.ducklightShard {
    background-image: url('../style/icons/currency/ducklightShard.jpg');
  }
  &.phaseglassNeedle {
    background-image: url('../style/icons/currency/phaseglassNeedle.jpg');
  }
  &.baryonBough {
    background-image: url('../style/icons/currency/baryonBough.jpg');
  }
  &.ethericSpiral {
    background-image: url('../style/icons/currency/ethericSpiral.jpg');
  }
  &.simulationSeed {
    background-image: url('../style/icons/currency/simulationSeed.jpg');
  }
  &.microphasicDatalattice {
    background-image: url('../style/icons/currency/microphasicDatalattice.jpg');
  }
  &.seraphite {
    background-image: url('../style/icons/currency/seraphite.jpg');
  }
  &.alkaneDust {
    background-image: url('../style/icons/currency/alkaneDust.jpg');
  }
  &.heliumFilaments {
    background-image: url('../style/icons/currency/heliumFilaments.jpg');
  }
  &.spinmetalLeaves {
    background-image: url('../style/icons/currency/spinmetalLeaves.jpg');
  }
  &.glacialStarwort {
    background-image: url('../style/icons/currency/glacialStarwort.jpg');
  }
}
</style>
