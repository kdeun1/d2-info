<template>
  <milestone-box
    :title="'TEST'"
  >
    <template #label>
      label
    </template>
    <template #property>
      property
    </template>
    <template #modifier>
      modifier
    </template>
    <template #description>
      <p>desc</p>
    </template>
  </milestone-box>
</template>

<script>
import { useStore } from 'vuex';
import MilestoneBox from '@/components/MilestoneBox';

export default {
  name: 'SampleBox',
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

    const a = store.getters['milestone/getPublicMilestonesByKey'](props.modelValue);

    return {
      a,
    };
  },
};
</script>

<style lang="scss">
.nightfall-box {
  position: relative;
  width: 350px;
  height: 350px;
  border: 1px solid #918d97;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
}
.nightfall-body {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 250px;
  padding: 10px;
  margin: 90px 10px 10px 10px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: left;
}
.nightfall-label-area {
  display: flex;
  width: 100%;
  height: 18px;

  > i {
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
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
.nightfall-title {
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 23px;
  color: white;
}
.nightfall-type-area {
  display: flex;
  height: 30px;
  padding: 0 20px;
  font-size: 13px;
  color: white;
  justify-content: space-around;
  align-items: center;

  > p {
    padding: 0 7px;
  }
}
.nightfall-icon {
  width: 15px;
  height: 15px;

  &.type {
    background-color: black;
  }
}
.nightfall-modifierHashes-area {
  display: flex;
  height: 80px;
  margin-bottom: 5px;
  flex-flow: wrap;
  align-content: space-around;
  justify-content: space-around;
}
.nightfall-modifierHashes-scrollBar {
  display: inline;
  width: 100%;
  height: 100%;
}
.nightfall-modifierHashes {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: contain;
  border-radius: 50%;
  cursor: pointer;

  &.selected {
    background-color: red;
  }
}
.nightfall-modifierHashes-description {
  height: 55px;
  padding: 1px;
  border-radius: 4px;
  border: 1px solid white;
  font-size: 13px;
  color: white;
  overflow: hidden;
}
</style>
