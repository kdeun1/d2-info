<template>
  <div
    class="milestone-box"
    :style="backgroundImageStyle"
  >
    <div class="milestone-box-body">
      <div class="milestone-box-title">
        {{ title }}
      </div>
      <div class="milestone-box-label">
        <slot name="label" />
      </div>
      <div class="milestone-box-property">
        <slot name="property" />
      </div>
      <div class="milestone-box-modifier">
        <slot name="modifier" />
      </div>
      <div class="milestone-box-description">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MilestoneBox',
  components: {
  },
  props: {
    backgroundImageStyle: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: null,
    },
  },
  setup() {
  },
};
</script>

<style lang="scss">
.milestone-box {
  display: inline-block;
  position: relative;
  width: 350px;
  height: 350px;
  border: 1px solid #918d97;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
}
.milestone-box-body {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 250px;
  padding: 10px;
  margin: 90px 10px 10px 10px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: left;
}
.milestone-box-title {
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 23px;
  color: white;
}
.milestone-box-label {
  display: flex;
  width: 100%;
  height: 18px;
}
.milestone-box-property {
  display: flex;
  height: 30px;
  padding: 0 20px;
  font-size: 13px;
  color: white;
  justify-content: space-around;
  align-items: center;
}
.milestone-box-modifier {
  display: flex;
  height: 80px;
  margin-bottom: 5px;
  flex-flow: wrap;
  align-content: space-around;
  justify-content: space-around;
}
.milestone-box-description {
  height: 55px;
  padding: 1px;
  border-radius: 4px;
  border: 1px solid white;
  font-size: 13px;
  color: white;
  overflow: hidden;
}
</style>
