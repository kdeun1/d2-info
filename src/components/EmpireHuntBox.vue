<template>
  <milestone-box
    :background-image-style="{
      'background-image': `url('https://www.bungie.net${currentEmpireHuntInfo.definition.pgcrImage}')`
    }"
    :title="filteredName(currentEmpireHuntInfo.definition.displayProperties.name)"
  >
    <template #label>
      <i
        @click="changeLevel('prev')"
        class="nightfall-label-arrow el-icon-caret-left"
      />
      <div class="nightfall-label">
        {{ currentLevel.label }}
      </div>
      <i
        @click="changeLevel('next')"
        class="nightfall-label-arrow el-icon-caret-right"
      />
    </template>
    <template #property>
      <img
        class="nightfall-property-icon type"
        src="../style/icons/nightfall/arc.png"
      >
      <p class="nightfall-property-label">
        {{ currentEmpireHuntInfo.hashProperty.arc }}
      </p>
      <img
        class="nightfall-property-icon type"
        src="../style/icons/nightfall/void.png"
      >
      <p class="nightfall-property-label">
        {{ currentEmpireHuntInfo.hashProperty.void }}
      </p>
      <img
        class="nightfall-property-icon type"
        src="../style/icons/nightfall/solar.png"
      >
      <p class="nightfall-property-label">
        {{ currentEmpireHuntInfo.hashProperty.solar }}
      </p>
      <img
        class="nightfall-property-icon"
        src="../style/icons/nightfall/championsBarrier.png"
      >
      <p class="nightfall-property-label">
        {{ currentEmpireHuntInfo.hashProperty.barrier }}
      </p>
      <img
        class="nightfall-property-icon"
        src="../style/icons/nightfall/championsUnstoppable.png"
      >
      <p class="nightfall-property-label">
        {{ currentEmpireHuntInfo.hashProperty.unstoppable }}
      </p>
      <img
        class="nightfall-property-icon"
        src="../style/icons/nightfall/championsOverload.png"
      >
      <p class="nightfall-property-label">
        {{ currentEmpireHuntInfo.hashProperty.overload }}
      </p>
    </template>
    <template #modifier>
      <div
        v-for="(info, idx) in modifierInfo"
        :key="info"
        class="nightfall-modifierHashes"
        :class="{ selected: modifierIdx === idx }"
        :style="{
          'background-image': `url('https://www.bungie.net${info.icon}')`,
        }"
        @click="changeModifierIdx(idx)"
      />
    </template>
    <template #description>
      <p>{{ currentModifierInfo.name }} - {{ currentModifierInfo.description }}</p>
    </template>
  </milestone-box>
</template>

<script>
import { reactive, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { hashProperty } from '@/common';
import MilestoneBox from '@/components/common/MilestoneBox';

export default {
  name: 'EmpireHuntBox',
  components: {
    MilestoneBox,
  },
  props: {
  },
  setup() {
    const store = useStore();

    const levelArr = [
      {
        label: '숙련',
        value: 'adept',
      },
      {
        label: '영웅 1220',
        value: 'hero',
      },
      {
        label: '전설 1250',
        value: 'legend',
      },
      {
        label: '마스터 1280',
        value: 'master',
      },
    ];
    const empireHuntHashes = {
      theTechnocrat: { // 기술사관
        adept: 5517247,
        hero: 5517244,
        legend: 5517245,
        master: 5517242,
      },
      theDarkPriestess: { // 어둠의 여사제
        adept: 2205920672,
        hero: 2205920675,
        legend: 2205920674,
        master: 2205920677,
      },
      theWarrior: { // 전사
        adept: 4173217516,
        hero: 4173217519,
        legend: 4173217518,
        master: 4173217513,
      },
    };

    const currentLevelIdx = ref(3);
    const modifierIdx = ref(0);
    const currentLevel = computed(() => levelArr[currentLevelIdx.value]);
    const characterActivities = computed(() => store.getters['profile/getCharacterActivities'] || []);
    const currentEmpireHunt = computed(() => {
      let result = null;
      if (characterActivities.value
        .some((v) => v.activityHash === empireHuntHashes.theTechnocrat.adept)) {
        result = 'theTechnocrat';
      } else if (characterActivities.value
        .some((v) => v.activityHash === empireHuntHashes.theDarkPriestess.adept)) {
        result = 'theDarkPriestess';
      } else if (characterActivities.value
        .some((v) => v.activityHash === empireHuntHashes.theWarrior.adept)) {
        result = 'theWarrior';
      }
      return result;
    });

    const empireHuntInfo = reactive({
      adept: {
        activityHash: empireHuntHashes[currentEmpireHunt.value]?.adept,
        hashProperty: hashProperty[empireHuntHashes[currentEmpireHunt.value]?.adept],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(empireHuntHashes[currentEmpireHunt.value]?.adept),
        modifierHashes: characterActivities.value
          .find((v) => v.activityHash === empireHuntHashes[currentEmpireHunt.value]?.adept)
          .modifierHashes,
      },
      hero: {
        activityHash: empireHuntHashes[currentEmpireHunt.value]?.hero,
        hashProperty: hashProperty[empireHuntHashes[currentEmpireHunt.value]?.hero],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(empireHuntHashes[currentEmpireHunt.value]?.hero),
        modifierHashes: characterActivities.value
          .find((v) => v.activityHash === empireHuntHashes[currentEmpireHunt.value]?.hero)
          .modifierHashes,
      },
      legend: {
        activityHash: empireHuntHashes[currentEmpireHunt.value]?.legend,
        hashProperty: hashProperty[empireHuntHashes[currentEmpireHunt.value]?.legend],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(empireHuntHashes[currentEmpireHunt.value]?.legend),
        modifierHashes: characterActivities.value
          .find((v) => v.activityHash === empireHuntHashes[currentEmpireHunt.value]?.legend)
          .modifierHashes,
      },
      master: {
        activityHash: empireHuntHashes[currentEmpireHunt.value]?.master,
        hashProperty: hashProperty[empireHuntHashes[currentEmpireHunt.value]?.master],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(empireHuntHashes[currentEmpireHunt.value]?.master),
        modifierHashes: characterActivities.value
          .find((v) => v.activityHash === empireHuntHashes[currentEmpireHunt.value]?.master)
          .modifierHashes,
      },
    });
    const currentEmpireHuntInfo = computed(
      () => empireHuntInfo[currentLevel.value.value],
    );
    const modifierInfo = computed(() => currentEmpireHuntInfo.value.modifierHashes
      .reduce((acc, cur) => {
        const { displayProperties } = store.getters.getDestinyActivityModifierDefinitionByKey(cur);
        acc.push(displayProperties);
        return acc;
      }, []));
    const currentModifierInfo = computed(() => modifierInfo.value[modifierIdx.value]);

    const changeModifierIdx = (idx) => {
      modifierIdx.value = idx;
    };
    const changeLevel = (step) => {
      if (step === 'prev' && +currentLevelIdx.value > 1) {
        currentLevelIdx.value--;
        changeModifierIdx(0);
      } else if (step === 'next' && +currentLevelIdx.value < 3) {
        currentLevelIdx.value++;
        changeModifierIdx(0);
      }
    };

    const filteredName = (name) => {
      const nameList = name.split(': ');
      return `${nameList[0]} - ${nameList[1]}`;
    };

    return {
      modifierIdx,
      currentLevel,
      characterActivities,
      empireHuntInfo,
      currentEmpireHuntInfo,
      modifierInfo,
      currentModifierInfo,
      changeModifierIdx,
      changeLevel,
      filteredName,
    };
  },
};
</script>

<style lang="scss">
.nightfall-label-arrow {
  color: white;
  font-size: 18px;
  cursor: pointer;
}
.nightfall-label {
  width: 120px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  background-color: white;
  border-radius: 6px;
  text-align: center;
}
.nightfall-property-label {
  padding: 0 7px;
}
.nightfall-property-icon {
  width: 15px;
  height: 15px;

  &.type {
    background-color: black;
  }
}
.nightfall-modifierHashes {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: contain;
  border-radius: 50%;
  cursor: pointer;

  &.selected {
    border: 1px solid red;
  }
}
</style>
