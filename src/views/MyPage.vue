<template>
  <div class="contents">
    <h2>마이 페이지</h2>
    <div class="contents-body">
      <div class="my-page-area">
        <div class="my-page-nav">
          <div class="my-page-nav-header">
            <h3>Bungie.net 프로필</h3>
          </div>
          <div class="my-page-nav-body">
            <div
              class="profile-box"
              v-for="info in bungieAccounts"
              :key="info"
              @click="clickAccount(info.membershipType)"
            >
              <div
                class="platform-icon"
                :class="getPlatformName(info.membershipType)"
              />
              <div>
                {{ info.displayName }}
              </div>
            </div>
          </div>
        </div>
        <div class="my-page-contents">
          <div class="my-page-contents-header">
            <h3>저장된 프로필</h3>
          </div>
          <div class="my-page-nav-body">
            displayName : {{ currentAccount.displayName }}
            <br>
            platform : {{ platformList[currentAccount.membershipType - 1] }}
          </div>
        </div>
      </div>
      <div>
        <profile-currencies-area />
      </div>
      <div class="my-page-area">
        <character-card
          v-for="(info, key) in characters"
          :key="key"
          :info="info"
          :hash="key"
          :class="{ 'is-select': selectedCharacterId === key }"
        />
      </div>
      <div class="my-page-area">
        sdf
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getProfile } from '@/api/methods';
import CharacterCard from '@/components/CharacterCard';
import ProfileCurrenciesArea from '@/components/ProfileCurrenciesArea';

export default {
  name: 'MyPage',
  components: {
    CharacterCard,
    ProfileCurrenciesArea,
  },
  setup() {
    const store = useStore();
    const platformList = ['xbox', 'playstation', 'steam', 'stadia', 'twitch'];

    const bungieAccounts = computed(() => store.getters['user/getBungieAccount']);
    const currentAccount = computed(() => store.getters['user/getCurrentBungieAccount']);
    const selectedCharacterId = computed(() => store.getters['profile/getCharacterId']);

    const characters = ref({});

    const init = async () => {
      try {
        const result = await getProfile();
        const { Response } = result.data;
        await store.commit('profile/setAllProfile', Response);
        characters.value = store.getters['profile/getCharacters'];
      } catch (e) {
        console.log(e);
      }
    };

    init();

    const getPlatformName = (idx) => platformList[idx - 1];
    const clickAccount = (membershipId) => {
      store.commit('user/setCurrentMembershipType', membershipId);
    };

    return {
      platformList,
      bungieAccounts,
      currentAccount,
      selectedCharacterId,
      characters,
      getPlatformName,
      clickAccount,
    };
  },
};
</script>

<style lang="scss">
.my-page-area {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.my-page-nav {
  position: relative;
  width: 200px;
  padding: 10px;

  &-header {
    height: 40px;
  }
}
.profile-box {
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #EEE;
  align-items: center;
  cursor: pointer;
}
.platform-icon {
  width: 25px;
  height: 25px;
}
.my-page-contents {
  flex: 1;
  padding: 10px;

  &-header {
    height: 40px;
  }
}

.character-card {
  width: 350px;
  border: 1px solid #EEEEEE;
  padding: 20px 10px;
  margin: 10px;
}
.character-emblem-img {
  position: relative;
  width: 100%;
  height: 66px;
  background-size: cover;
}
.character-class {
  position: absolute;
  top: 10px;
  left: 50px;
  font-size: 23px;
  color: white;
  font-weight: bold;
}
.character-light {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;
  color: yellow;
}

.platform-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  background-size: cover;

  &.xbox {
    background-image: url('../style/icons/platform/xbox.png');
  }
  &.playstation {
    background-image: url('../style/icons/platform/playstation.png');
  }
  &.steam {
    background-image: url('../style/icons/platform/steam.png');
  }
  &.stadia {
    background-image: url('../style/icons/platform/stadia.png');
  }
  &.twitch {
    background-image: url('../style/icons/platform/twitch.png');
  }
}
</style>
