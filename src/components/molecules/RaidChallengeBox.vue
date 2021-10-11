<template>
  <milestone-template
    img-src="https://www.bungie.net/common/destiny2_content/icons/8b1bfd1c1ce1cab51d23c78235a6e067.png"
    title="Raid Challenge"
  >
    <template #default>
      <div class="raid-challenge-box--body">
        <div
          v-for="raidInfo in raidInfoList"
          :key="raidInfo"
          class="raid-challenge-box--body-cell"
          :class="[
            `raid-challenge-box--body-cell__${raidInfo.clsName}`,
            { 'raid-challenge-box--body-cell__active': selectedRaidName === raidInfo.clsName }
          ]"
          :title="raidInfo.title"
          @click="clickRaidBox(raidInfo.clsName)"
        >
          <sup
            class="raid-challenge-box--raid-name"
          >
            {{ raidInfo.title }}
          </sup>
          <sup
            v-if="raidInfo.challengePhase"
            class="raid-challenge-box--raid-challenge-phase"
          >
            {{ raidInfo.challengePhase }} Phase
          </sup>
        </div>
      </div>
    </template>
    <template #description>
      <hr class="raid-challenge-box--description-hr">
      <i class="el-icon-document" />
      template
    </template>
  </milestone-template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MilestoneTemplate from '@/components/templates/MilestoneTemplate.vue';

export default defineComponent({
  name: 'RaidChallengeBox',
  components: {
    MilestoneTemplate,
  },
  setup() {
    const selectedRaidName = ref<string>('vault-of-glass');
    const raidInfoList = ref([
      {
        title: '유리 금고',
        clsName: 'vault-of-glass',
        challengePhase: 2,
      },
      {
        title: '딥스톤 무덤',
        clsName: 'deep-stone-crypt',
        challengePhase: 3,
      },
      {
        title: '구원의 정원',
        clsName: 'garden-of-salvation',
        challengePhase: 1,
      },
      {
        title: '마지막 소원',
        clsName: 'last-wish',
        challengePhase: 1,
      },
    ]);
    const clickRaidBox = (raidClsName: string) => {
      selectedRaidName.value = raidClsName;
    };

    return {
      selectedRaidName,
      raidInfoList,
      clickRaidBox,
    };
  },
});
</script>

<style scoped lang="scss">
$raid-challenge-gap: 8px;

.raid-challenge-box {
  &--body {
    display: flex;
    justify-content: space-between;
    gap: $raid-challenge-gap;
    flex-wrap: wrap;
  }

  &--body-cell {
    position: relative;
    width: calc(25% - #{$raid-challenge-gap});
    height: 93px;
    border-radius: 15px;
    background-size: cover;
    background-position: center;
    cursor: pointer;

    &__last-wish {
      background-image: url('https://www.bungie.net/img/destiny_content/pgcr/raid_beanstalk.jpg');
    }
    &__garden-of-salvation {
      background-image: url('https://www.bungie.net/img/destiny_content/pgcr/raid_garden_of_salvation.jpg');
    }
    &__deep-stone-crypt {
      background-image: url('https://www.bungie.net/img/destiny_content/pgcr/europa-raid-deep-stone-crypt.jpg');
    }
    &__vault-of-glass {
      background-image: url('https://www.bungie.net/img/destiny_content/pgcr/vault_of_glass.jpg');
    }

    &__active {
      border: 2px solid #409EFF;
    }
  }

  &--body-cell-inner {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1680px) {
    &--body-cell {
      width: calc(50% - #{$raid-challenge-gap});
    }
  }
  @media (max-width: 1280px) {
    &--body-cell {
      width: calc(50% - #{$raid-challenge-gap});
    }
  }
  @media (max-width: 900px) {
    &--body-cell {
      width: calc(100% - #{$raid-challenge-gap});
    }
  }

  &--description-hr {
    margin-bottom: 8px;
    border: 1px solid #eeeeee;
  }

  &--raid-name {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 80px;
    border-radius: 10px;
    text-align: center;
    background-color: #409EFF;
    color: white;
    font-size: 11px;
  }

  &--raid-challenge-phase {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 55px;
    border-radius: 10px;
    text-align: center;
    background-color: #909399;
    color: white;
    font-size: 12px;
  }
}
</style>
