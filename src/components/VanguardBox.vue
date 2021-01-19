<template>
  <milestone-box
    class="vanguard-box"
    :title="'선봉대 공격전'"
  >
    <template #label>
      <div class="vanguard-label">
        랜덤 맵
      </div>
    </template>
    <template #property />
    <template #modifier>
      <div
        v-for="(info, idx) in modifierInfo"
        :key="info"
        class="vanguard-modifierHashes"
        :class="{
          selected: modifierIdx === idx,
          'is-arc': info.hash === 3215384520,
          'is-void': info.hash === 3362074814,
          'is-solar': info.hash === 2558957669,
          'is-stasis': info.hash === 644078431,
        }"
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
import { useStore } from 'vuex';
import MilestoneBox from '@/components/common/MilestoneBox';
import { ref, computed } from 'vue';

export default {
  name: 'VanguardBox',
  components: {
    MilestoneBox,
  },
  props: {
    modelValue: {
      type: Number,
      default: 1437935813,
    },
  },
  setup(props) {
    const store = useStore();

    const activity = store.getters['milestone/getPublicMilestonesByKey'](props.modelValue).activities[0];
    const { activityHash, modifierHashes } = activity;
    const vanguardInfo = store.getters.getDestinyActivityDefinitionByKey(activityHash);
    const modifierInfo = computed(() => modifierHashes.reduce((acc, cur) => {
      const { displayProperties } = store.getters.getDestinyActivityModifierDefinitionByKey(cur);
      acc.push({ ...displayProperties, hash: cur });
      return acc;
    }, []));
    const modifierIdx = ref(0);
    const currentModifierInfo = computed(() => modifierInfo.value[modifierIdx.value]);

    const changeModifierIdx = (idx) => {
      modifierIdx.value = idx;
    };

    return {
      vanguardInfo,
      modifierIdx,
      modifierInfo,
      changeModifierIdx,
      currentModifierInfo,
    };
  },
};
</script>

<style lang="scss">
.vanguard-box {
  background-image: url('../style/icons/vanguard/vanguard_bg.png');
}
.vanguard-label {
  width: 120px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  background-color: white;
  border-radius: 6px;
  text-align: center;
}
.vanguard-modifierHashes {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: contain;
  border-radius: 50%;
  cursor: pointer;

  &.selected {
    //box-shadow: 10px 10px 30px #000808;
    border: 1px solid red;
  }
  &.is-solar {
    background-color: #F0631E;
  }
  &.is-arc {
    background-color: #7AECF3;
  }
  &.is-void {
    background-color: #B185DF;
  }
  &.is-stasis {
    background-color: #304C9A;
  }
}
</style>
