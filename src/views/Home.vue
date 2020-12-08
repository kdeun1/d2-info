<template>
  <div class="home">
    <h3>all manifest</h3>
    <br>
    {{ manifestObj.DestinyMilestoneDefinition }}
    <br>
    {{ manifestObj.DestinyActivityDefinition }}
    <br>
    {{ manifestObj.DestinyActivityModifierDefinition }}
    <br><br><br><br><br>
    <h3>milestone</h3>
    <br>
    {{ milestone }}
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { getDestinyManifest, getPublicMilestones, getManifestMilestone } from '@/api/methods';

export default {
  name: 'Home',
  components: {
  },
  setup() {
    const manifestObj = reactive({
      DestinyMilestoneDefinition: null,
      DestinyActivityDefinition: null,
      DestinyActivityModifierDefinition: null,
    });
    const milestone = ref(null);

    const store = useStore();

    const initManifest = async () => {
      try {
        const result = await getDestinyManifest();
        if (result?.data?.Response?.jsonWorldComponentContentPaths?.ko) {
          await store.commit('setDestinyManifest', result.data.Response.jsonWorldComponentContentPaths.ko);
          manifestObj.DestinyMilestoneDefinition = store.getters.getDestinyManifestByKey('DestinyMilestoneDefinition');
          manifestObj.DestinyActivityDefinition = store.getters.getDestinyManifestByKey('DestinyActivityDefinition');
          manifestObj.DestinyActivityModifierDefinition = store.getters.getDestinyManifestByKey('DestinyActivityModifierDefinition');
        }
      } catch (e) {
        console.log(e);
      }
    };

    const initMilestone = async () => {
      try {
        const result = await getPublicMilestones();
        if (result?.data?.Response) {
          await store.commit('setPublicMilestones', result.data.Response);
          milestone.value = store.getters.getPublicMilestones;
        }
      } catch (e) {
        console.log(e);
      }
    };

    const initDestinyMilestoneDefinition = async () => {
      const result = await getManifestMilestone(manifestObj.DestinyMilestoneDefinition);
      if (result) {
        await store.commit('setDestinyMilestoneDefinition', result);
      }
    };

    const initDestinyActivityDefinition = async () => {
      const result = await getManifestMilestone(manifestObj.DestinyActivityDefinition);
      if (result) {
        await store.commit('setDestinyActivityDefinition', result);
      }
    };

    const initDestinyActivityModifierDefinition = async () => {
      const result = await getManifestMilestone(manifestObj.DestinyActivityModifierDefinition);
      if (result) {
        await store.commit('setDestinyActivityModifierDefinition', result);
      }
    };

    const asyncInit = async () => {
      await initManifest();
      await initMilestone();
      await initDestinyMilestoneDefinition();
      await initDestinyActivityDefinition();
      await initDestinyActivityModifierDefinition();
    };

    asyncInit();

    return {
      manifestObj,
      milestone,
    };
  },
};
</script>
