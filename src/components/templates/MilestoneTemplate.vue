<template>
  <div class="milestone-template">
    <div
      v-if="$props.imgSrc"
      class="milestone-template--icon"
    >
      <img
        alt="milestone icon"
        :src="$props.imgSrc"
      >
    </div>
    <div class="milestone-template--title">
      {{ $props.title }}
    </div>
    <div class="milestone-template--body">
      <slot />
    </div>
    <div
      v-if="$slots.description"
      class="milestone-template--description"
    >
      <slot name="description" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MilestoneTemplate',
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
$milestone-template-gap: 12px;

.milestone-template {
  display: block;
  position: relative;
  padding: 20px 80px 20px 20px;
  flex-basis: 100%;
  background-color: white;
  color: black;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

  &--icon {
    position: absolute;
    width: 48px;
    height: 48px;
    top: 0;
    bottom: 0;
    right: 16px;
    margin: auto;
    background-color: #409EFF;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgb(0 0 0 / 12%);

    img {
      width: 100%;
    }
  }

  &--title {
    color: #8c8c8c;
    font-size: 14px;
    margin-bottom: 8px;
  }
  &--body {
    font-size: 14px;
    margin-bottom: 8px;
  }
}

@media (min-width: 600px) {
  .milestone-template {
    flex-basis: calc(50% - #{$milestone-template-gap});
  }
}
@media (min-width: 960px) {
  .milestone-template {
    flex-basis: calc(50% - #{$milestone-template-gap});
  }
}
@media (min-width: 1280px) {
  .milestone-template {
    flex-basis: calc(33.3333% - #{$milestone-template-gap});
  }
}
</style>
