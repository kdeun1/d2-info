<template>
  <div class="about">
    <h1>로그인 페이지</h1>
    <div>contents</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  setup() {
    const init = () => {
      window.location.href = `${process.env.VUE_APP_OAUTH_URL}?client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&response_type=code`;
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
