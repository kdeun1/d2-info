<template>
  <main-header />
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
import MainHeader from '@/components/Header';

export default {
  components: {
    MainHeader,
  },
  setup() {
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

main {
  width: 1140px;
  margin: 0 auto;
  padding-top: 70px;
}

@media (max-width: 1025px) {
  main {
    width: 100%;
  }
}

.contents {
  padding: 50px 10px 30px;

  > h2 {
    text-align: left;
    margin-bottom: 20px;
  }

  .contents-body {
    padding: 30px 0;
    text-align: left;
  }
}
</style>
