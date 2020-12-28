<template>
  <nav v-loading="!apiStatus.isFinish">
    <router-link to="/">
      HOME
    </router-link> |
    <router-link to="/milestone">
      주간 리셋
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </nav>
  <main>
    <router-view
      v-if="apiStatus.isFinish"
    />
    <loading-comp
      v-else
    />
  </main>
</template>

<script>
import { reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { getDestinyManifest } from '@/api/methods';
import LoadingComp from '@/components/LoadingComp';

export default {
  components: {
    LoadingComp,
  },
  setup() {
    const store = useStore();
    const apiStatus = reactive({
      isFinish: false,
    });
    let timer;

    const initManifest = async () => {
      try {
        const res = await getDestinyManifest();
        const { version } = res.data.Response;
        const { isDestinyManifest } = store.getters;
        const localStorageVersion = store.getters.getDestiny2ManifestVersion;
        if (!isDestinyManifest || (version !== localStorageVersion)) {
          await store.dispatch('initManifest');
          await store.commit('setDestiny2ManifestVersion', version);
          await store.dispatch('initDestinyMilestoneDefinition');
          await store.dispatch('initDestinyActivityDefinition');
          await store.dispatch('initDestinyActivityModifierDefinition');
          clearTimeout(timer);
        }
        apiStatus.isFinish = true;
      } catch (e) {
        console.log(`[App.vue] initManifest : ${e}`);
        timer = setTimeout(() => {
          initManifest();
        }, 5000);
      }
    };

    initManifest();

    onBeforeMount(() => {
      clearTimeout(timer);
    });

    return {
      apiStatus,
    };
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  border: 0;
  user-select: none;
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

main {
  width: 1140px;
  margin: 0 auto;
}

@media (max-width: 1025px) {
  main {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
