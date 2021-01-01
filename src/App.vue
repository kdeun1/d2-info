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
          Setting
        </div>
        <div
          v-if="!userDisplayName"
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
                <el-dropdown-item
                  v-for="info in bungieAccounts"
                  :key="info.membershipId"
                >
                  <div
                    class="user-dropdown"
                    :class="{ 'is-select': info.membershipType === currentMembershipType }"
                  >
                    <div
                      class="platform-icon"
                      :class="platformList[info.membershipType - 1]"
                    />
                    {{ info.displayName }} ({{ info.membershipId }})
                  </div>
                </el-dropdown-item>
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
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
  components: {
  },
  setup() {
    const store = useStore();
    const platformList = ['xbox', 'playstation', 'steam', 'stadia', 'twitch'];

    const currentMenu = computed(() => router.currentRoute.value.name);
    const userDisplayName = computed(() => store.getters['user/getCurrentBungieNetUser']?.displayName);
    const bungieAccounts = computed(() => store.getters['user/getBungieAccount']);
    const currentMembershipType = computed(() => store.getters['user/getCurrentMembershipType']);

    const clickMenu = (menuName) => {
      router.push({ name: `${menuName}` });
    };
    const redirectLoginPage = () => {
      window.location.href = `${process.env.VUE_APP_OAUTH_URL}?client_id=${process.env.VUE_APP_OAUTH_CLIENT_ID}&response_type=code`;
    };
    const clickLogout = () => {
      // localStorage 지우는 로직
      clickMenu('Setting');
    };

    return {
      platformList,
      currentMenu,
      userDisplayName,
      bungieAccounts,
      currentMembershipType,
      clickMenu,
      redirectLoginPage,
      clickLogout,
    };
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  border: 0;
  user-select: none;
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

.platform-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  background-size: cover;

  &.xbox {
    background-image: url('./style/icons/platform/xbox.png');
  }
  &.playstation {
    background-image: url('./style/icons/platform/playstation.png');
  }
  &.steam {
    background-image: url('./style/icons/platform/steam.png');
  }
  &.stadia {
    background-image: url('./style/icons/platform/stadia.png');
  }
  &.twitch {
    background-image: url('./style/icons/platform/twitch.png');
  }
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
  padding: 30px 0;
}
</style>
