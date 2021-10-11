<template>
  <header>
    <div class="current-menu-name">
      MAIN
    </div>
    <div class="spacer" />
    <el-button
      class="el-icon-menu header-icon"
      round
      @click="changeNavi(true)"
    />
    <el-button
      class="el-icon-house header-icon"
    />
  </header>
  <nav
    :class="{ 'is-active': isActiveNavi }"
  >
    <div class="navigation-drawer">
      <div class="site-icon">
        [] D2-INFO
      </div>
      <hr>
      <ul>
        <li>
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            About
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <main>
    <section>
      <router-view />
    </section>
    <footer>
      <div>
        GITHUB
      </div>
      <div>
        ABOUT ME
      </div>
    </footer>
  </main>
  <div
    v-show="isActiveNavi"
    class="navigation-overlay"
    @click="changeNavi(false)"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useManifestJson } from '@/composables/useManifestJson';

export default defineComponent({
  name: 'App',
  setup() {
    const {
      manifestVersion,
      componentContentPaths,
    } = useManifestJson();

    const jsonSuffixVersion = computed(() => {
      const pathObj: { [key: string] :any } = componentContentPaths.value;
      if (Object.keys(pathObj).length) {
        const firstPathKey = Object.keys(pathObj)[0];
        const firstPathValue = pathObj[firstPathKey];
        return firstPathValue?.split(`${firstPathKey}-`)[1]?.split('.json')[0];
      }
      return null;
    });

    const isActiveNavi = ref(false);
    const changeNavi = (flag: boolean) => {
      isActiveNavi.value = flag;
    };

    return {
      manifestVersion,
      jsonSuffixVersion,
      isActiveNavi,
      changeNavi,
    };
  },
});
</script>

<style lang="scss">
$nav-width: 250px;
$header-height: 75px;

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

header {
  position: absolute;
  display: flex;
  left: $nav-width;
  width: calc(100% - #{$nav-width});
  height: $header-height;
  padding: 0 20px;
  background-color: #f0f2f5;
  align-items: center;

  .header-icon {
    width: 40px;
    height: 40px;
    padding: 0 !important;
    margin: 0 16px;
    font-size: 24px;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),
    0 1px 1px 0 rgba(0,0,0,.14),
    0 1px 3px 0 rgba(0,0,0,.12);
  }

  .current-menu-name {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spacer {
    flex-grow: 1 !important;
  }
}

nav {
  position: fixed;
  width: $nav-width;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 33px 20px;
  background-color: #ffffff;
  opacity: 1;
  visibility: visible;
  z-index: 1;

  .site-icon {
    padding: 10px 15px;
  }
}

main {
  display: flex;
  flex-direction: column;
  padding: 80px 0 0 $nav-width;
  background-color: #f0f2f5;
}

@media screen and (max-width: 1024px) {
  header {
    left: 0;
    width: 100%;
  }
  nav {
    width: 0;
    transition-duration: 0.35s, 0.25s, 0.25s;
    transition-delay: 0.1s;
    visibility: hidden;
    opacity: 0;

    &.is-active {
      width: $nav-width;
      opacity: 1;
      visibility: visible;
      transition-duration: 0.15s, 0.25s, 0.25s;
    }
  }
  main {
    padding: 80px 0 0 0;
  }
}
@media screen and (min-width: 1024px) {
  .el-icon-menu {
    display: none !important;
  }
}

section {
  padding: 0 20px;
}

footer {
  display: flex;
  padding: 10px 20px;
  background-color: #f0f2f5;
  gap: 20px;
}

.navigation-drawer {
  display: flex;
  flex-direction: column;
}

.navigation-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #141414;
  opacity: 0.5;
}
</style>
