<template>
  <div class="loading">
    <h3>LOADING...</h3>
    <br><br><br>
    <p>현재 로그인 정보를 가져오는 중입니다.</p>
    <br><br>
    <img src="@/style/loading.gif">
    <br><br>
    <p>bungie.net이 접속이 안되거나, API 호출 에러가 나는 경우에는 접속이 안될 수 있습니다.</p>
    <br><br>
    <p>권장사항 : Chrome 브라우저</p>
    <br>
  </div>
</template>

<script>
export default {
  name: 'LoadingComp',
  props: {
  },
  setup() {
  },
};
</script>
