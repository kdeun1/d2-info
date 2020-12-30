<template>
  <div class="about">
    <h1>로긴 성공하고 오는 페이지</h1>
    <div>contents</div>
  </div>
</template>

<script>
import { genToken } from '@/api/auth';

export default {
  name: 'About',
  components: {
  },
  setup() {
    const init = async () => {
      const res = await genToken();
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
