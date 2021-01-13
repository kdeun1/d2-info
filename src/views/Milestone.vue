<template>
  <div
    v-loading="!apiStatus.finishMilestone || !apiStatus.finishCharacters"
    class="contents"
  >
    <h2>주간 리셋</h2>
    <div class="contents-body">
      <div v-if="milestoneFormatDate">
        데이터 패치 시간 : {{ milestoneFormatDate }}
      </div>
      <br>
      <div v-if="milestoneWeeklyRange">
        주간 리셋 기간
        <el-tooltip
          class="item"
          effect="dark"
          content="대략 새벽 2시에 번지넷 데이터가 업데이트됩니다."
          placement="top"
        >
          <i class="el-icon-alarm-clock" />
        </el-tooltip>
        : {{ milestoneWeeklyRange }}
      </div>
      <br><br><br>
      <h3>케릭터 선택</h3><br>
      <div class="character-card-wrapper">
        <character-card
          v-for="(info, key) in characters"
          :key="key"
          :short-mode="true"
          :info="info"
          :hash="key"
          :class="{ 'is-select': selectedCharacterId === key }"
        />
      </div>
      <br><br><br>
      <h3>로테이션</h3><br>
      <div class="milestone-body">
        <div class="milestone-box-wrapper">
          <nightfall-box />
          <vanguard-box />
          <crucible-box />
          <raid-challenge-box />
          <empire-hunt-box />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { acceptMilestoneHash, getFormatDate, weeklyDateRange } from '@/common';
import { getProfile, getPublicMilestones } from '@/api/methods';
import CharacterCard from '@/components/CharacterCard';
import NightfallBox from '@/components/NightfallBox';
import VanguardBox from '@/components/VanguardBox';
import CrucibleBox from '@/components/CrucibleBox';
import RaidChallengeBox from '@/components/RaidChallengeBox';
import EmpireHuntBox from '@/components/EmpireHuntBox';

export default {
  name: 'Milestone',
  components: {
    CharacterCard,
    NightfallBox,
    VanguardBox,
    CrucibleBox,
    RaidChallengeBox,
    EmpireHuntBox,
  },
  setup() {
    let milestoneTimer = null;
    let charactersTimer = null;

    const store = useStore();

    const apiStatus = reactive({
      finishMilestone: false,
      finishCharacters: false,
    });
    const milestone = ref({});
    const characters = ref({});
    const characterActivities = ref({});
    const selectedCharacterId = computed(() => store.getters['profile/getCharacterId']);

    const initMilestone = async () => {
      try {
        const res = await getPublicMilestones();
        milestone.value = res.data.Response.publicMilestones;
        clearTimeout(milestoneTimer);
        apiStatus.finishMilestone = true;
      } catch (e) {
        console.log(`[Milestone.vue] initMilestone : ${e}`);
        milestoneTimer = setTimeout(() => {
          initMilestone();
        }, 4000);
      }
    };

    const computedMilestone = computed(() => Object.values(milestone.value || {})
      .filter((v) => acceptMilestoneHash.includes(v.milestoneHash)));
    const milestoneTime = computed(() => new Date(store.getters['milestone/getTimestamp']));
    const milestoneFormatDate = computed(() => getFormatDate(milestoneTime.value));
    const milestoneWeeklyRange = computed(() => weeklyDateRange(milestoneTime.value));

    const initCharacter = async () => {
      try {
        const result = await getProfile();
        const { Response } = result.data;
        await store.commit('profile/setAllProfile', Response);
        characters.value = store.getters['profile/getCharacters'];
        characterActivities.value = store.getters['profile/getCharacterActivities'];
        clearTimeout(charactersTimer);
        apiStatus.finishCharacters = true;
      } catch (e) {
        console.log(`[Milestone.vue] initCharacter : ${e}`);
        charactersTimer = setTimeout(() => {
          initCharacter();
        }, 4000);
      }
    };

    const activityWithModifierHashes = computed(
      () => characterActivities.value[selectedCharacterId.value]?.availableActivities
        .filter((v) => v.modifierHashes),
    );

    // console.log(`activityWithModifierHashes : ${activityWithModifierHashes.value}`);

    initMilestone();
    initCharacter();

    return {
      apiStatus,
      milestone,
      characters,
      selectedCharacterId,
      computedMilestone,
      milestoneFormatDate,
      milestoneWeeklyRange,
      activityWithModifierHashes,
    };
  },
};
</script>

<style lang="scss">
.milestone-body {
  min-height: 300px;
}
.el-icon-alarm-clock {
  cursor: pointer;
}
.milestone-box-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.character-card-wrapper {
  display: flex;
  padding: 0 25px;
}
</style>
