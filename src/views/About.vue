<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button
      @click="getManifestData"
    >
      클릭 시 manifest 파일을 가져옴
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getDestinyManifest } from '@/api/destiny2';

export default defineComponent({
  name: 'About',
  setup() {
    const getManifestData = async (): Promise<void> => {
      try {
        const { data } = await getDestinyManifest();
        console.log(data);
      } catch (e) {
        console.log(`Manifest 파일을 가져오지 못했습니다 : ${e}`);
      }
    };

    return {
      getManifestData,
    };
  },
});
</script>
