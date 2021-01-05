<template>
  <div class="contents">
    <h2>설정</h2>
    <div class="contents-body">
      <p>해당 사이트는 PC 최신 크롬버전을 권장합니다.</p>
      <br><br>
      <p>에러가 발생하거나 데이터 갱신이 정상적이지 않은 경우 아래 버튼 클릭 후 브라우저 F5 해주세요.</p>
      <br><br>
      <el-button @click.once="deleteAllLocalStorage">
        localStorage 데이터 모두 삭제하기
      </el-button>
      <br><br><br>
      <p>Created by. 데스티니 가디언즈 DTDT 클랜 더강이</p>
      <br><br><br>
      <p>Github Source: https://github.com/kdeun1/d2-info</p>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'Setting',
  components: {
  },
  setup() {
    const deleteAllLocalStorage = async () => {
      await localStorage.removeItem('manifest');
      await localStorage.removeItem('milestone');
      await localStorage.removeItem('authorization');
      await localStorage.removeItem('token');
      await localStorage.removeItem('user');
      await localStorage.removeItem('profile');
      await router.push({ name: 'Setting' });
    };

    return {
      deleteAllLocalStorage,
    };
  },
};
</script>

<style lang="scss">
</style>
