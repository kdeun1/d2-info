<template>
  <div class="character-card">
    <div
      class="character-emblem-img"
      :style="{
        'background-image': `url('https://www.bungie.net${info.emblemBackgroundPath}')`
      }"
    >
      <div class="character-class">
        {{ classToName(info.classHash) }}
      </div>
      <div class="character-light">
        {{ info.light }}
      </div>
    </div>
    <div class="character-detail-area">
      <div>
        <h3>최근 접속한 시간</h3>
        <p>{{ getDateLastPlayed(info.dateLastPlayed) }}</p>
      </div>
      <br>
      <canvas
        :id="`stats_${hash}`"
        width="350"
        height="350"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Chart from 'chart.js';
import { getFormatDate } from '@/common';

export default {
  name: 'CharacterCard',
  components: {
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    hash: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const statsData = ref([0, 0, 0, 0, 0, 0]);

    const drawChart = () => {
      const ctx = document.getElementById(`stats_${props.hash}`);
      const computedStats = computed(() => props.info.stats);
      statsData.value[4] = computedStats.value['144602215'];
      statsData.value[1] = computedStats.value['392767087'];
      statsData.value[3] = computedStats.value['1735777505'];
      statsData.value[2] = computedStats.value['1943323491'];
      statsData.value[0] = computedStats.value['2996146975'];
      statsData.value[5] = computedStats.value['4244567218'];

      const computedEmblemColor = computed(() => props.info.emblemColor);

      const options = {
        type: 'radar',
        data: {
          labels: ['기동력', '생존력', '회복력', '의지', '지능', '힘'],
          datasets: [{
            label: '케릭터 스텟',
            backgroundColor: `rgba(${computedEmblemColor.value.red},${computedEmblemColor.value.green},${computedEmblemColor.value.blue},0.2)`,
            borderColor: `rgba(${computedEmblemColor.value.red},${computedEmblemColor.value.green},${computedEmblemColor.value.blue},1)`,
            pointBackgroundColor: `rgba(${computedEmblemColor.value.red},${computedEmblemColor.value.green},${computedEmblemColor.value.blue},1)`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgba(${computedEmblemColor.value.red},${computedEmblemColor.value.green},${computedEmblemColor.value.blue},1)`,
            data: statsData.value,
          }],
        },
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
              stepSize: 20,
              min: 0,
              max: 100,
            },
          },
          // tooltips: {
          //   mode: 'label',
          //   callbacks: {
          //     label(tooltipItem, data) {
          //       return `${data.datasets[0].data[tooltipItem.index]}%`;
          //     },
          //   },
          // },
        },
      };
      // eslint-disable-next-line no-new
      new Chart(ctx, options);
    };

    onMounted(() => {
      drawChart();
    });

    const classToName = (classHash) => {
      if (classHash.toString() === '3655393761') {
        return '타이탄';
      }
      if (classHash.toString() === '2271682572') {
        return '워록';
      }
      if (classHash.toString() === '671679327') {
        return '헌터';
      }
      return null;
    };
    const getDateLastPlayed = (date) => getFormatDate(new Date(date));

    return {
      classToName,
      getDateLastPlayed,
    };
  },
};
</script>

<style lang="scss">
.character-card {
  width: 350px;
  padding: 20px 10px;
  margin: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);
  cursor: pointer;

  &.is-select {
    border: 4px solid #FF0000;
  }
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
</style>
