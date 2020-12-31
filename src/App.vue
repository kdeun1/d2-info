<template>
  <nav>
    <a @click="clickMenu('')">
      HOME
    </a> |
    <a @click="clickMenu('Milestone')">
      주간 리셋
    </a> |
  </nav>
  <main>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          v-bind="route.params"
        />
      </keep-alive>
    </router-view>
  </main>
</template>

<script>
import router from '@/router';

export default {
  components: {
  },
  setup() {
    const clickMenu = (menuName) => {
      router.push(`/${menuName}`);
    };

    return {
      clickMenu,
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
