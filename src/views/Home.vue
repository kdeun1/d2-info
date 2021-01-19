<template>
  <div
    v-loading="!apiStatus.finishManifest || !apiStatus.finishMilestone"
    class="contents"
  >
    <h2>HOME</h2>
    <div class="home-body">
      <ellipsed-zone-box icon-class="ellipsedZone" />
      <nightmare-box icon-class="fallenCouncilNightmare" />
      <dreaming-city-curse-box icon-class="blindWell" />
      <dreaming-city-ascendant-box icon-class="ascendant" />
    </div>
    <div>
      <br><br>
      <p>최초 접속 시 번지넷과의 데이터 통신으로 인해 로딩이 존재합니다.</p>
      <br><br>
      <p>해당 사이트는 PC 기준 최신버전 크롬 브라우저를 권장합니다.</p>
      <br><br>
      <p>로그인을 하면 주간 리셋 정보를 볼 수 있습니다.</p>
      <br><br>
      <p>한국 시간 새벽2시 전후로 로딩이 오래 걸릴 수 있습니다.</p>
      <br><br>
      <p>우측 상단에 '로그인'을 해야 정상적으로 데이터를 볼 수 있습니다.</p>
      <br><br>
      <p>데이터 갱신이 이상한 경우 '설정' 메뉴로 가셔서 데이터 삭제 후 F5 눌러주세요.</p>
      <br><br><br>
      <p>Created by. 더강이</p>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { getDestinyManifest } from '@/api/methods';
import { isRefreshLocalStorage } from '@/common';
import EllipsedZoneBox from '@/components/EllipsedZoneBox';
import NightmareBox from '@/components/NightmareBox';
import DreamingCityCurseBox from '@/components/DreamingCityCurseBox';
import DreamingCityAscendantBox from '@/components/DreamingCityAscendantBox';

export default {
  name: 'Home',
  components: {
    EllipsedZoneBox,
    NightmareBox,
    DreamingCityCurseBox,
    DreamingCityAscendantBox,
  },
  setup() {
    const store = useStore();
    const apiStatus = reactive({
      finishManifest: false,
      finishMilestone: false,
    });
    let timer;
    let milestoneTimer;

    const initManifest = async () => {
      try {
        const res = await getDestinyManifest();
        const { version } = res.data.Response;
        const { isDestinyManifest } = store.getters;
        const localStorageVersion = store.getters.getDestiny2ManifestVersion;
        if (!isDestinyManifest || (version !== localStorageVersion)) {
          await store.dispatch('initManifest');
          await store.commit('setDestiny2ManifestVersion', version);
          await store.dispatch('initDestinyMilestoneDefinition');
          await store.dispatch('initDestinyActivityDefinition');
          await store.dispatch('initDestinyActivityModifierDefinition');
          clearTimeout(timer);
        }
        apiStatus.finishManifest = true;
      } catch (e) {
        console.log(`[App.vue] initManifest : ${e}`);
        timer = setTimeout(() => {
          initManifest();
        }, 3000);
      }
    };

    const initMilestone = async () => {
      try {
        const milestoneTimestamp = store.getters['milestone/getTimestamp'];
        if (!milestoneTimestamp) {
          await store.dispatch('milestone/initMilestone');
          await store.commit('milestone/setTimestamp', new Date());
          clearTimeout(milestoneTimer);
        } else {
          const milestoneDate = new Date(milestoneTimestamp);
          const isRefresh = isRefreshLocalStorage(milestoneDate);
          const isPublicMilestones = store.getters['milestone/isPublicMilestones'];
          if (!isPublicMilestones || isRefresh) {
            await store.dispatch('milestone/initMilestone');
            await store.commit('milestone/setTimestamp', new Date());
            clearTimeout(milestoneTimer);
          }
        }
        apiStatus.finishMilestone = true;
      } catch (e) {
        console.log(`[App.vue] initMilestone : ${e}`);
        milestoneTimer = setTimeout(() => {
          initMilestone();
        }, 4000);
      }
    };

    const init = async () => {
      await initManifest();
      await initMilestone();
    };

    init();

    return {
      apiStatus,
    };
  },
};
</script>

<style lang="scss">
.home-body {
  display: flex;
  flex-wrap: wrap;
}
.home-summary-box {
  position: relative;
  width: calc(33.33% - 20px);
  height: 120px;
  padding: 15px 25px;
  margin: 10px;
  text-align: left;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.15);
}

@media (max-width: 1025px) {
  .home-summary-box {
    width: calc(50% - 20px);
  }
}

@media (max-width: 500px) {
  .home-summary-box {
    width: calc(100% - 20px);
  }
}

.home-summary-bottom {
  display: flex;
  padding-top: 15px;
  font-size: 13px;
  align-items: flex-end;

  > div {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid black;
    text-align: center;
  }
  >.desc {
    color: #f5365c;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;

    > p {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  >.planet {
    color: #2dce89;
  }
  >.dlc {
    color: #5E72E4;
    border-right: none;
  }
}

.home-summary-row {
  position: relative;
  height: 50px;

  >.title {
    color: #8898aa;
    font-weight: bold;
  }
  >.content {
    font-size: 20px;
    font-weight: bold;
  }
}

.home-summary-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #0e0e0e;
  background-size: cover;

  &.ellipsedZone {
    background-image: url('../style/icons/home/ellipsedZone.png');
  }
  &.fallenCouncilNightmare {
    background-image: url('../style/icons/home/fallenCouncilNightmare.jpg');
  }
  &.blindWell {
    background-image: url('../style/icons/home/blindWell.png');
  }
  &.ascendant {
    background-image: url('../style/icons/home/ascendant.png');
  }
}
</style>
