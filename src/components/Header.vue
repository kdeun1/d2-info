<template>
  <nav>
    <div class="nav-area">
      <div class="nav-menu-wrapper">
        <div
          class="nav-menu"
          :class="{ 'is-select': currentMenu === 'Home' }"
          @click="clickMenu('Home')"
        >
          HOME
        </div>
        <div
          class="nav-menu"
          :class="{ 'is-select': currentMenu === 'Milestone' }"
          @click="clickMenu('Milestone')"
        >
          주간 리셋
        </div>
        <div
          class="nav-menu"
          :class="{ 'is-select': currentMenu === 'Setting' }"
          @click="clickMenu('Setting')"
        >
          설정
        </div>
        <div
          v-if="isAuth"
          class="nav-menu"
          :class="{ 'is-select': currentMenu === 'MyPage' }"
          @click="clickMenu('MyPage')"
        >
          MyPage
        </div>
        <div
          v-if="!isAuth"
          class="nav-menu user"
          @click="redirectLoginPage"
        >
          <i class="el-icon-user" />
          로그인
        </div>
        <div
          v-else
          class="nav-menu user"
        >
          <el-dropdown>
            <div>
              <i class="el-icon-user-solid" />
              {{ userDisplayName }} 님
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div
                    class="user-dropdown"
                    @click="clickLogout"
                  >
                    <i class="el-icon-close" />
                    Logout
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
  name: 'Header',
  components: {
  },
  props: {
  },
  setup() {
    const store = useStore();

    const currentMenu = computed(() => router.currentRoute.value.name);
    const userDisplayName = computed(() => store.getters['user/getCurrentBungieNetUser']?.displayName);
    const isAuth = computed(() => store.getters['authorization/isAuth']);

    const clickMenu = (menuName) => {
      router.push({ name: `${menuName}` });
    };
    const redirectLoginPage = () => {
      window.location.href = `${process.env.VUE_APP_OAUTH_URL}?client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&response_type=code`;
    };
    const clickLogout = async () => {
      await store.commit('authorization/deleteAuth');
      await localStorage.removeItem('user');
      await localStorage.removeItem('token');
      await clickMenu('Setting');
    };

    return {
      currentMenu,
      userDisplayName,
      isAuth,
      clickMenu,
      redirectLoginPage,
      clickLogout,
    };
  },
};
</script>

<style lang="scss">
nav {
  position: fixed;
  width: 100%;
  height: 70px;
  background-color: #0e0e0e;
  z-index: 10;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav-area {
  width: 1140px;
  height: 100%;
  margin: 0 auto;
  color: white;
}

@media (max-width: 1025px) {
  .nav-area {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: white;
  }
}

.nav-menu-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding-right: 70px;
}

.nav-menu {
  width: 100px;
  height: 70px;
  line-height: 70px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.user {
    position: absolute;
    top: 0;
    right: 0;
    white-space: nowrap;
    overflow: hidden;

    > * {
      font-size: 15px;
      color: white;
    }
  }

  &.is-select {
    border-bottom: 5px solid purple;
  }
}

.user-dropdown {
  display: flex;
  min-width: 120px;
  align-items: center;

  &.is-select {
    background-color: #0e0e0e;
    color: white;
  }
}
</style>
