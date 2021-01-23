<template>
  <milestone-box
    :background-image-style="{
      'background-image': `url('https://www.bungie.net${currentNightfall.definition.pgcrImage}')`
    }"
    :title="`황혼전 - ${currentNightfall.definition.displayProperties.description}`"
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
        {{ currentNightfall.hashProperty.arc }}
      </p>
      <img
        class="nightfall-property-icon type"
        src="../style/icons/nightfall/void.png"
      >
      <p class="nightfall-property-label">
        {{ currentNightfall.hashProperty.void }}
      </p>
      <img
        class="nightfall-property-icon type"
        src="../style/icons/nightfall/solar.png"
      >
      <p class="nightfall-property-label">
        {{ currentNightfall.hashProperty.solar }}
      </p>
      <img
        class="nightfall-property-icon"
        src="../style/icons/nightfall/championsBarrier.png"
      >
      <p class="nightfall-property-label">
        {{ currentNightfall.hashProperty.barrier }}
      </p>
      <img
        class="nightfall-property-icon"
        src="../style/icons/nightfall/championsUnstoppable.png"
      >
      <p class="nightfall-property-label">
        {{ currentNightfall.hashProperty.unstoppable }}
      </p>
      <img
        class="nightfall-property-icon"
        src="../style/icons/nightfall/championsOverload.png"
      >
      <p class="nightfall-property-label">
        {{ currentNightfall.hashProperty.overload }}
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
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { hashProperty } from '@/common';
import MilestoneBox from '@/components/common/MilestoneBox';

export default {
  name: 'NightfallBox',
  components: {
    MilestoneBox,
  },
  props: {
    modelValue: {
      type: Number,
      default: 1942283261,
    },
  },
  setup(props) {
    const store = useStore();

    const levelArr = [
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
      {
        label: '그랜드마스터 1300',
        value: 'grandMaster',
      },
    ];
    const theOrdealGrandmasterHashes = [
      54961125, // The Ordeal: Grandmaster: Exodus Crash
      89113250, // The Ordeal: Grandmaster: Broodhold
      207226563, // The Ordeal: Grandmaster: Lake of Shadows
      281497220, // The Ordeal: Grandmaster: The Inverted Spire
      554830595, // The Ordeal: Grandmaster: The Insight Terminus
      707920309, // The Ordeal: Grandmaster: Exodus Crash
      1446478334, // The Ordeal: Grandmaster: The Arms Dealer
      2023667984, // The Ordeal: Grandmaster: Tree of Probabilities
      2168858559, // The Ordeal: Grandmaster: Savathûn's Song
      2694576755, // The Ordeal: Grandmaster: The Insight Terminus
      3100302962, // The Ordeal: Grandmaster: The Corrupted
      3354105309, // The Ordeal: Grandmaster: The Corrupted
      3381711459, // The Ordeal: Grandmaster: The Disgraced
      3449817631, // The Ordeal: Grandmaster: The Scarlet Keep
      3455414851, // The Ordeal: Grandmaster: The Festering Core
      3597372938, // The Ordeal: Grandmaster: Warden of Nothing
      3726640183, // The Ordeal: Grandmaster: The Arms Dealer
      3871967157, // The Ordeal: Grandmaster: Warden of Nothing
      3879949581, // The Ordeal: Grandmaster: Broodhold
      3919254032, // The Ordeal: Grandmaster: Lake of Shadows
      4197461112, // The Ordeal: Grandmaster: The Glassway
    ];
    const currentLevelIdx = ref(2);
    const modifierIdx = ref(0);
    const { activities } = store.getters['milestone/getPublicMilestonesByKey'](props.modelValue);
    const validActivities = activities.filter((v) => !theOrdealGrandmasterHashes
      .includes(v.activityHash));

    const currentLevel = computed(() => levelArr[currentLevelIdx.value]);
    const milestoneInfo = reactive({
      hero: {
        activityHash: validActivities[1].activityHash,
        hashProperty: hashProperty[validActivities[1].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(validActivities[1].activityHash),
        modifierHashes: validActivities[1].modifierHashes,
      },
      legend: {
        activityHash: validActivities[2].activityHash,
        hashProperty: hashProperty[validActivities[2].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(validActivities[2].activityHash),
        modifierHashes: validActivities[2].modifierHashes,
      },
      master: {
        activityHash: validActivities[3].activityHash,
        hashProperty: hashProperty[validActivities[3].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(validActivities[3].activityHash),
        modifierHashes: validActivities[3].modifierHashes,
      },
      grandMaster: {
        activityHash: validActivities[4].activityHash,
        hashProperty: hashProperty[validActivities[4].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(validActivities[4].activityHash),
        modifierHashes: validActivities[4].modifierHashes,
      },
    });
    const currentNightfall = computed(() => milestoneInfo[currentLevel.value.value]);

    const modifierInfo = computed(() => currentNightfall.value.modifierHashes.reduce((acc, cur) => {
      const { displayProperties } = store.getters.getDestinyActivityModifierDefinitionByKey(cur);
      acc.push(displayProperties);
      return acc;
    }, []));
    const currentModifierInfo = computed(() => modifierInfo.value[modifierIdx.value]);

    const changeModifierIdx = (idx) => {
      modifierIdx.value = idx;
    };
    const changeLevel = (step) => {
      if (step === 'prev' && currentLevelIdx.value > 0) {
        currentLevelIdx.value--;
        changeModifierIdx(0);
      } else if (step === 'next' && currentLevelIdx.value < 3) {
        currentLevelIdx.value++;
        changeModifierIdx(0);
      }
    };

    return {
      currentLevel,
      changeLevel,
      milestoneInfo,
      currentNightfall,
      modifierInfo,
      modifierIdx,
      currentModifierInfo,
      changeModifierIdx,
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
