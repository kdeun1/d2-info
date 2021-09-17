<template>
  <header>
    <p>version : {{ manifestVersion }}</p>
    <p>jsonSuffixVersion : {{ jsonSuffixVersion }}</p>
  </header>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useManifestJson } from '@/composables/useManifestJson';

export default defineComponent({
  name: 'App',
  setup() {
    const {
      manifestVersion,
      componentContentPaths,
    } = useManifestJson();

    const jsonSuffixVersion = computed(() => {
      const pathObj: { [key: string] :any } = componentContentPaths.value;
      if (Object.keys(pathObj).length) {
        const firstPathKey = Object.keys(pathObj)[0];
        const firstPathValue = pathObj[firstPathKey];
        return firstPathValue?.split(`${firstPathKey}-`)[1]?.split('.json')[0];
      }
      return null;
    });

    return {
      manifestVersion,
      jsonSuffixVersion,
    };
  },
});
</script>

<style lang="scss">
#header {
  height: 80px;
}
</style>
