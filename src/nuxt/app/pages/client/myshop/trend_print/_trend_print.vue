<template>
  <div class="container">
    <h2 id="graphtitle" class="mincho">{{ $route.params.trend_print }}年度12月・売上傾向表</h2>
    <div id="date" class="mincho">天職工房 2020年12月27日</div>
    <div id="trend_chart">
                <doughnut :chart-data="datacollection" :options="options" style="position: relative; width:650px;"></doughnut>
                <div id="table">
                    <h4 style="text-align: center;padding-bottom: 10px;" class="mincho">2019年12月の売上傾向</h4>
                    <v-simple-table>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td class="mincho">{{index!=3 ? index + 1 + '位':''}}</td>
                                <td class="mincho">{{item.name}}</td>
                                <td class="mincho">{{item.count}}個</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </div>
    <form style="width: 100%;">
      <div style="width: 100%;margin: 20px 0 20px 0;text-align: center;" class="no-print">
        <v-btn color="info" width="200px" @click="print">印刷</v-btn>
        <a href="../sales_trend"><v-btn color="grey" width="200px">キャンセル</v-btn></a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datacollection: null,
      options:{
          responsive: true,
          legend:{
              position: 'bottom'
          }
      },
      items:[
          {
              name: '商品名1',
              count: 42
          },
          {
              name: '商品名2',
              count: 33
          },
          {
              name: '商品名3',
              count: 15
          },
          {
              name: 'その他',
              count: 20
          }
      ]
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
        labels: ['商品名1', '商品名2', '商品名3', 'その他'],
        datasets: [
          {
            data: [42,33,15,20],
            backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#c1e4e9']
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

<style scoped>
a{
  text-decoration: none;
}

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

.mincho {
  font-family: serif;
}

.container {
  font-family: "ヒラギノ明朝 ProN W6", "HiraMinProN-W6", "HG明朝E", "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
  padding: 20px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 950px;
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

#trend_body{
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 85vh;
    border: 1.2px solid #e1e1e1;
    background-color: #ffffff;
}

#trend_chart{
    clear: both;
    display: flex;
    align-items: center;
    width:900px;
    height: 200px;
}

#table{
    width: 250px;
}
</style>
