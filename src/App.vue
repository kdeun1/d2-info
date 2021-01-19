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
import MainHeader from '@/components/common/Header';

export default {
  components: {
    MainHeader,
  },
  setup() {
  },
};
/* eslint-disable */
</script>

<style lang="scss">
@font-face {
  font-family: 'NanumSquareRound';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

* {
  padding: 0;
  margin: 0;
  border: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: 'NanumSquareRound', sans-serif;
}

body {
  height: 100vh;
  margin: 0;
  background-color: #eee;
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
