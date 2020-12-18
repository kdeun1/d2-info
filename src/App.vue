<template>
  <div class="nav">
    HEADER
    <router-link to="/">
      HOME
    </router-link> |
    <router-link to="/milestone">
      주간 리셋
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </div>
  <main
    v-loading="loading"
    class="main"
  >
    <router-view
      v-if="!isError"
    />
    <div v-else>
      <h3>INFO</h3>
      <br><hr><br>
      <p>현재 정상적으로 데이터를 가져오지 못했습니다.</p>
      <br>
      <p>데이터 다시 가져오기</p>
      <br>
      <el-button
        type="warning"
        @click="clickRefresh"
      >
        REFRESH
      </el-button>
      <br><br>
      <p>Chrome 브라우저 사용 & 브라우저 리프래쉬 F5 해주세요!</p>
      <br>
    </div>
  </main>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
  components: {
  },
  setup() {
    const store = useStore();
    const loading = ref(true);
    let timer;
    const isError = computed({
      get: () => false,
      set: (val) => {
        if (!val) {
          clearTimeout(timer);
        }
      },
    });

    const initManifest = async () => {
      console.log('initManifest');
      try {
        await store.dispatch('initManifest');
        await store.dispatch('initDestinyMilestoneDefinition');
        await store.dispatch('initDestinyActivityDefinition');
        await store.dispatch('initDestinyActivityModifierDefinition');
        await router.push({ path: '/milestone' });
      } catch (e) {
        isError.value = true;
        console.log(`[App.vue] initManifest : ${e}`);
        timer = setTimeout(() => {
          initManifest();
        }, 5000);
      } finally {
        loading.value = false;
      }
    };

    const clickRefresh = () => {
      isError.value = false;
      initManifest();
    };

    initManifest();

    return {
      loading,
      isError,
      clickRefresh,
    };
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
