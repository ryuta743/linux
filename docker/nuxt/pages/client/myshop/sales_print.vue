<template>
  <div class="container">
    <h2 id="graphtitle">2020年度・月別売上総額表</h2>
    <div id="date">天職工房 2020年12月27日</div>
    <bargraph :chart-data="datacollection" :options="options" width="950mm" height="600mm"></bargraph>
    <form>
      <div style="width: 100%;margin: 20px 0 20px 0;text-align: center;" class="no-print">
        <v-btn color="info" width="200px" @click="print">印刷</v-btn>
        <v-btn color="grey" width="200px" @click="$router.push('/client/myshop/sales')">キャンセル</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datacollection: null,
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "(月)"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 15
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    if (process.client) {
      this.fillData();
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [
          {
            label: "売上総額（千円）",
            data: [10, 20, 30, 40, 50, 30, 20, 30, 50, 50, 10, 30],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1
          }
        ]
      };
    },
    print() {
      window.print();
    }
  }
};
</script>

<style>
#graphtitle {
  width: 950px;
  text-align: center;
}

#date {
  width: 950px;
  text-align-last: right;
  color: #666666;
  font-size: 13px;
}

.container {
  padding: 20px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.links {
  padding-top: 15px;
}

@media print {
  .no-print {
    display: none;
  }
}

@page {
  size: A4 landscape;
  margin: 0mm;
}
</style>
