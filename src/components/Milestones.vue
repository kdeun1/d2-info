<template>
  <div class="milestones">
    {{ a }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getPublicMilestonesAPI } from '@/api/destiny2';

export default defineComponent({
  name: 'Milestones',
  setup() {
    const a = ref(false);

    const getPublicMilestones = async () => {
      try {
        const { data } = await getPublicMilestonesAPI();
        console.log(data.Response);
      } catch (e) {
        console.log(e);
      }
    };

    getPublicMilestones();

    return {
      a,
    };
  },
});
</script>

<style scoped lang="scss">
.milestones {
  display: flex;
}
</style>
