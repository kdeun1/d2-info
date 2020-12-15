<template>
  <div class="nav">
    HEADER
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </div>
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import { useStore } from 'vuex';

export default {
  components: {
  },
  setup() {
    const store = useStore();

    const initManifest = async () => {
      console.log('App.vue / initManifest');
      try {
        await store.dispatch('initManifest');
      } catch (e) {
        console.log(`[App.vue] initManifest : ${e}`);
      }
    };

    initManifest();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
