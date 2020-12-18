<template>
  <div class="home">
    <h3>HOME</h3>
    <br>
    <div>
      <h3>INFO</h3>
      <br><hr><br>
      <p>현재 정상적으로 데이터를 가져오지 못했습니다.</p>
      <br>
      <p>데이터 다시 가져오기</p>
      <br>
      <el-button
        type="warning"
      >
        REFRESH
      </el-button>
      <br><br>
      <p>Chrome 브라우저 사용 & 브라우저 리프래쉬 F5 해주세요!</p>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  setup() {
  },
};
</script>

<style lang="scss">
</style>
