<template>
  <div class="home-summary-box">
    <div class="home-summary-row">
      <div
        class="home-summary-icon"
        :class="iconClass"
      />
      <h4 class="title">
        <slot name="title" />
      </h4>
      <span class="content">
        <slot name="content" />
      </span>
    </div>
    <div class="home-summary-bottom">
      <template v-if="$slots.desc">
        <div class="desc">
          <slot name="desc" />
        </div>
      </template>
      <template v-if="$slots.planet">
        <div class="planet">
          <slot name="planet" />
        </div>
      </template>
      <template v-if="$slots.dlc">
        <div class="dlc">
          <slot name="dlc" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryBox',
  components: {
  },
  props: {
    iconClass: {
      type: String,
      default: null,
    },
  },
  setup() {
  },
};
</script>

<style lang="scss">
</style>
