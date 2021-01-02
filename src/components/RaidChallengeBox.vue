<template>
  <milestone-box
    class="raid-challenge-box"
    :title="'레이드 챌린지'"
  >
    <template #label>
      <div class="raid-challenge-label">
        랜덤 맵
      </div>
    </template>
    <template #property />
    <template #modifier>
      <div
        v-for="(info, idx) in raidInfo"
        :key="info"
        class="raid-challenge-modifierHashes"
        :class="{
          selected: selectedIdx === idx,
          [info.className]: true,
        }"
        @click="clickRaidIcon(idx)"
      >
        <div class="raid-challenge-week">
          {{ info.week }}
        </div>
      </div>
    </template>
    <template #description>
      <p>
        {{ selectedRaidInfo.name }}({{ selectedRaidInfo.week }}주차)
        - {{ selectedRaidInfo.challenge.desc }}
      </p>
    </template>
  </milestone-box>
</template>

<script>
import { ref, computed } from 'vue';
import MilestoneBox from '@/components/MilestoneBox';

export default {
  name: 'RaidChallengeBox',
  components: {
    MilestoneBox,
  },
  props: {
  },
  setup() {
    const lastWishChallenge = [
      {
        week: 1,
        name: '소환 의식',
        desc: '오우거 3마리를 소환, 처치 후 클리어',
      },
      {
        week: 2,
        name: '마녀 찾아내기',
        desc: '보스의 레이저 공격을 맞지 않고 클리어',
      },
      {
        week: 3,
        name: '영원한 전투',
        desc: '소환된 미니 오우거를 잡지 않고 클리어',
      },
      {
        week: 4,
        name: '접근 금지',
        desc: '리븐의 힘(기사)이 검은 벽 통과 전 제거 후 클리어',
      },
      {
        week: 5,
        name: '기억의 힘',
        desc: '한 번 공격한 눈을 같은 사람이 다시 공격하지 않기',
      },
    ];
    const gardenOfSalvationChallenge = [
      {
        week: 1,
        name: '잔재',
        desc: '보스방에 있는 사이클롭스 2마리 잡지않기',
      },
      {
        week: 2,
        name: '사슬의 고리',
        desc: '살아있는 모든 사람이 거의 동시에 깨달음 버프 받기',
      },
      {
        week: 3,
        name: '정상을 향해',
        desc: '티끌 10개씩 3번 보관하기',
      },
      {
        week: 4,
        name: '0에서 100',
        desc: '10초 이내에 탑에 총 티끌 30개 넣기',
      },
    ];
    const deepStoneCryptChallenge = [
      {
        week: 1,
        name: '붉은 방랑자',
        desc: '화력팀 전원이 조작패널 2개씩 치고 클리어',
      },
      {
        week: 2,
        name: '복제의 복제',
        desc: '복제 디버프를 없애기 위해 에어로크를 사용하지 않기',
      },
      {
        week: 3,
        name: '다양한 재주',
        desc: '전원이 조작/스캐너/억압 증강 버프 한 번씩 사용',
      },
      {
        week: 4,
        name: '네 핵심',
        desc: '보스 다리에서 드랍되는 공 4개 한꺼번에 집어넣기',
      },
    ];
    const firstWeekDateTime = {
      lastWish: new Date('2020-12-30 02:00:00').getTime(),
      gardenOfSalvation: new Date('2020-12-30 02:00:00').getTime(),
      deepStoneCrypt: new Date('2020-12-16 02:00:00').getTime(),
    };
    const currentDateTime = new Date().getTime();
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

    const raidInfo = ref([
      {
        name: '마지막 소원',
        className: 'lastWish',
        week: Math.ceil((currentDateTime - firstWeekDateTime.lastWish) / ONE_WEEK_MS),
        challenge: lastWishChallenge[
          Math.floor((currentDateTime - firstWeekDateTime.lastWish) / ONE_WEEK_MS)
        ],
      },
      {
        name: '구원의 정원',
        className: 'gardenOfSalvation',
        week: Math.ceil((currentDateTime - firstWeekDateTime.gardenOfSalvation) / ONE_WEEK_MS),
        challenge: gardenOfSalvationChallenge[
          Math.floor((currentDateTime - firstWeekDateTime.gardenOfSalvation) / ONE_WEEK_MS)
        ],
      },
      {
        name: '딥스톰 무덤',
        className: 'deepStoneCrypt',
        week: Math.ceil((currentDateTime - firstWeekDateTime.deepStoneCrypt) / ONE_WEEK_MS),
        challenge: deepStoneCryptChallenge[
          Math.floor((currentDateTime - firstWeekDateTime.deepStoneCrypt) / ONE_WEEK_MS)
        ],
      },
    ]);

    const selectedIdx = ref(0);
    const selectedRaidInfo = computed(() => raidInfo.value[selectedIdx.value]);

    const clickRaidIcon = (idx) => {
      selectedIdx.value = idx;
    };

    return {
      raidInfo,
      selectedIdx,
      selectedRaidInfo,
      clickRaidIcon,
    };
  },
};
</script>

<style lang="scss">
.raid-challenge-box {
  background-image: url('../style/icons/raid/raid_bg.jpg');
}
.raid-challenge-label {
  width: 120px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  background-color: white;
  border-radius: 6px;
  text-align: center;
}
.raid-challenge-modifierHashes {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: contain;
  border-radius: 50%;
  cursor: pointer;

  &.selected {
    //box-shadow: 10px 10px 30px #000808;
    border: 1px solid red;
  }
  &.lastWish {
    background-image: url('../style/icons/raid/lastWish.jpg');
  }
  &.gardenOfSalvation {
    background-image: url('../style/icons/raid/gardenOfSalvation.jpg');
  }
  &.deepStoneCrypt {
    background-image: url('../style/icons/raid/deepStoneCrypt.jpg');
  }
}
.raid-challenge-week {
  position: absolute;
  bottom: -4px;
  right: -3px;
  width: 16px;
  height: 16px;
  background-color: white;
  color: black;
  font-size: 13px;
  border: 1px solid black;
  border-radius: 50%;
  text-align: center;
}
</style>
