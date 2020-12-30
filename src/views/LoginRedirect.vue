<template>
  <div class="about">
    <h1>로그인 리다이렉트 페이지</h1>
    <div>contents</div>
    <br>
    <button @click="a">
      TEST 'getCurrentBungieNetUser'
    </button>
    <br><br><br><br>
    <div>
      val : {{ val }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { genToken } from '@/api/auth';
import { getCurrentBungieNetUser } from '@/api/methods';

export default {
  name: 'LoginRedirect',
  components: {
  },
  setup() {
    const store = useStore();

    const init = async () => {
      const { data } = await genToken();
      await store.commit('token/setToken', data);
      await store.commit('authorization/deleteAuth');
      console.log(`About res : ${data}`);
    };

    const val = ref(null);
    const a = async () => {
      debugger;
      val.value = await getCurrentBungieNetUser();
      console.log(val.value);
    };

    init();

    return {
      a,
      val,
    };
  },
};
</script>

<style lang="scss">
.milestone-box-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
