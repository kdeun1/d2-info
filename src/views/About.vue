<template>
  <milestones />
  <div class="about">
    <h1>This is an about page</h1>
    <button
      @click="getPublicMilestones"
    >
      클릭 시 milestoneInfo 파일을 가져옴
    </button>
    <br>
    {{ milestoneInfo }}
    <hr>
    <button
      @click="getTest"
    >
      클릭 시 realtime database 파일을 가져옴
    </button>
    <br>
    <hr>
    <button
      @click="getDestinyActivityDefinition(2468202005)"
    >
      클릭 시 getDestinyActivityDefinition 데이터를 가져옴
    </button>
    <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMilestones } from '@/composables/useMilestones';
import { getTest, getDestinyActivityDefinition } from '@/db/firebaseDb';
import Milestones from '@/components/Milestones.vue';

export default defineComponent({
  name: 'About',
  components: { Milestones },
  setup() {
    const {
      milestoneInfo,
      getPublicMilestones,
    } = useMilestones();

    return {
      milestoneInfo,
      getPublicMilestones,
      getTest,
      getDestinyActivityDefinition,
    };
  },
});
</script>
