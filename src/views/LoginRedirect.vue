<template>
  <div class="about">
    <h1>로그인 리다이렉트 페이지</h1>
    <div>contents</div>
  </div>
</template>

<script>
import { getToken } from '@/api/auth';

export default {
  name: 'LoginRedirect',
  components: {
  },
  setup() {
    const init = async () => {
      const res = await getToken();
      debugger;
      console.log(`About res : ${res}`);
    };

    init();
  },
};
</script>

<style lang="scss">
.milestone-box-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
