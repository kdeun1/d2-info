<template>
  <div class="character-activities-area">
    sdf
  </div>
</template>

<script>
// import { useStore } from 'vuex';
import { getCharacterActivities } from '@/api/methods';

export default {
  name: 'CharacterActivitiesArea',
  components: {
  },
  props: {
    characterHash: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // const store = useStore();

    const init = async () => {
      try {
        const result = await getCharacterActivities(props.characterHash);
        const { availableActivities } = result?.data?.Response?.activities?.data;
        const validActivities = availableActivities.filter((v) => v.challenges && v.modifierHashes);
        console.log(validActivities);
      } catch (e) {
        console.log(e);
      }
    };

    init();

    return {
    };
  },
};
</script>

<style lang="scss">
.character-activities-area {
  display: flex;
}
</style>
