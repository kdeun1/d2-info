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
import MilestoneBox from '@/components/MilestoneBox';

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
    const currentLevelIdx = ref(2);
    const modifierIdx = ref(0);
    const { activities } = store.getters['milestone/getPublicMilestonesByKey'](props.modelValue);

    const currentLevel = computed(() => levelArr[currentLevelIdx.value]);
    const milestoneInfo = reactive({
      hero: {
        activityHash: activities[1].activityHash,
        hashProperty: hashProperty[activities[1].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(activities[1].activityHash),
        modifierHashes: activities[1].modifierHashes,
      },
      legend: {
        activityHash: activities[2].activityHash,
        hashProperty: hashProperty[activities[2].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(activities[2].activityHash),
        modifierHashes: activities[2].modifierHashes,
      },
      master: {
        activityHash: activities[3].activityHash,
        hashProperty: hashProperty[activities[3].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(activities[3].activityHash),
        modifierHashes: activities[3].modifierHashes,
      },
      grandMaster: {
        activityHash: activities[4].activityHash,
        hashProperty: hashProperty[activities[4].activityHash],
        definition: store.getters
          .getDestinyActivityDefinitionByKey(activities[4].activityHash),
        modifierHashes: activities[4].modifierHashes,
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
