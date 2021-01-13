<template>
  <div class="character-activities-area">
    <div class="vendors-area lordSaladin">
      살라딘
    </div>
  </div>
</template>

<script>
// import { useStore } from 'vuex';
import { getVendors } from '@/api/methods';

export default {
  name: 'VendorsArea',
  components: {
  },
  props: {
    characterHash: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // const store = useStore();
    const vendorsHash = [
      895295461, // 살라딘
      2190858386, // 쥴
      69482069, // 자발라
      3603221665, // 샤크스
      672118013, // 벤시-44
      248695599, // 방랑자
      765357505, // 세인트-14
      3361454721, // 테스 에버리스
      // 396892126, // 데브림 케이
      // 1576276905, // 안전장치
      863940356, // 거미
      // 1616085565, // 에리스몬
      2531198101, // 충직한 바릭스
      // 1816541247, // 쇼한
      // 3611983588, // 까마귀
    ];

    const init = async () => {
      try {
        const result = await getVendors(props.characterHash);
        const { data } = result?.data?.Response?.sales;
        const validVendors = Object.keys(data)
          .filter((v) => vendorsHash.includes(v))
          .reduce((acc, cur) => {
            acc[cur] = data[cur];
            return acc;
          }, {});
        console.log(result);
        console.log(data);
        console.log(validVendors);
      } catch (e) {
        console.log(e);
      }
    };

    init();

    return {
      vendorsHash,
    };
  },
};
</script>

<style lang="scss">
.character-activities-area {
  display: flex;
}
.vendors-area {
  width: 300px;
  height: 50px;
  background-size: cover;

  &.lordSaladin {
    background-image: url('https://www.bungie.net/img/destiny_content/vendor/override_large_icons/lord_saladin.jpg');
  }
}
</style>
