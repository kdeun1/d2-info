<template>
  <milestone-box
    class="crucible-box"
    title="시련의 장"
  >
    <template #label>
      <div class="crucible-label">
        랜덤 맵
      </div>
    </template>
    <template #property />
    <template #modifier>
      <div
        v-for="(info, idx) in modifierInfo"
        :key="info"
        class="crucible-modifierHashes"
        :class="{
          selected: modifierIdx === idx,
          [info.className]: true,
        }"
        @click="changeModifierIdx(idx)"
      />
    </template>
    <template #description>
      <div>{{ currentModifierInfo.name }} - {{ currentModifierInfo.description }}</div>
    </template>
  </milestone-box>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MilestoneBox from '@/components/MilestoneBox';

export default {
  name: 'CrucibleBox',
  components: {
    MilestoneBox,
  },
  props: {
    modelValue: {
      type: Number,
      default: 3312774044,
    },
  },
  setup(props) {
    const store = useStore();

    const { activities } = store.getters['milestone/getPublicMilestonesByKey'](props.modelValue);

    const crucibleHashToName = {
      1717505396: 'control', // 점령
      1957660400: 'elimination', // 제거
      2259621230: 'rumble', // 난투
      540869524: 'clash', // 격돌
      3847433434: 'mayhem', // 아수라장
      1683791010: 'ironBanner', // 강철깃발
      142028034: 'showdown', // 대결
    };

    const modifierInfo = computed(() => activities.reduce((acc, cur) => {
      const { displayProperties } = store.getters
        .getDestinyActivityDefinitionByKey(cur.activityHash);
      if (Object.keys(crucibleHashToName).includes(cur.activityHash.toString())) {
        acc.push({
          ...displayProperties,
          hash: cur.activityHash,
          className: crucibleHashToName[cur.activityHash] || null,
        });
      }
      return acc;
    }, []));

    const modifierIdx = ref(0);
    const currentModifierInfo = computed(() => modifierInfo.value[modifierIdx.value]);
    const changeModifierIdx = (idx) => {
      modifierIdx.value = idx;
    };

    return {
      modifierInfo,
      modifierIdx,
      changeModifierIdx,
      currentModifierInfo,
    };
  },
};
</script>

<style lang="scss">
.crucible-box {
  background-image: url('../style/icons/crucible/crucible_bg.jpg');
}
.crucible-label {
  width: 120px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  background-color: white;
  border-radius: 6px;
  text-align: center;
}
.crucible-modifierHashes {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  cursor: pointer;

  &.selected {
    border: 1px solid red;
  }
  &.control {
    background-image: url('../style/icons/crucible/control.png');
  }
  &.elimination {
    background-image: url('../style/icons/crucible/elimination.png');
  }
  &.rumble {
    background-image: url('../style/icons/crucible/rumble.png');
  }
  &.clash {
    background-image: url('../style/icons/crucible/clash.png');
  }
  &.mayhem {
    background-image: url('../style/icons/crucible/mayhem.png');
  }
  &.ironBanner {
    background-image: url('../style/icons/crucible/ironBanner.png');
  }
  &.showdown {
    background-image: url('../style/icons/crucible/showdown.png');
  }
}
</style>
