<template>
  <div id="workshop_body">
    <v-container grid-list-xs style="min-height: 100vh;width: 15%;" id="workshop_nav">
      <ul>
        <li @click="$router.push('/client/myshop/myshop')">
          <v-icon>mdi-home</v-icon> 管理ツールトップ
        </li>
        <li @click="$router.push('/client/myshop/orderlist')">
          <v-icon>mdi-format-list-checks</v-icon> 注文一覧
        </li>
        <li @click="$router.push('/client/myshop/sales')"><v-icon>mdi-chart-bar</v-icon> 売上一覧</li>
        <li @click="$router.push('/client/myshop/sales_trend')" class="check"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
        <li @click="$router.push('/client/myshop/products')">
          <v-icon>mdi-format-list-bulleted</v-icon> 商品一覧・在庫状況
        </li>
        <li @click="$router.push('/client/myshop/discount')">
          <v-icon>mdi-cash-usd</v-icon> セット割引
        </li>
        <li @click="$router.push('/client/myshop/productadd')">
          <v-icon>mdi-plus</v-icon> 新規商品登録
        </li>
        <li @click="$router.push('/client/myshop/productdel')">
          <v-icon>mdi-close</v-icon> 商品編集・削除
        </li>
        <li @click="$router.push('/client/myshop/chat')">
          <v-icon>mdi-chat</v-icon> チャットメッセージ
        </li>
      </ul>
    </v-container>
    <v-container grid-list-xs style="min-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-content>
        <div id="sub_title">
          <h3><v-icon>mdi-chart-arc</v-icon>売上傾向表</h3>
          <div class="flex-grow-1"></div>
          <v-btn color="info" @click="$router.push(`/client/myshop/trend_print/${year}`)"><v-icon>mdi-file</v-icon>売上傾向表を印刷する</v-btn>
        </div>
        
        <div id="trend_body">
            <div id="selector">
                <v-select
                    style="width: 200px;float: left;margin-right: 20px;"
                    :items="years"
                    v-model="year"
                    label="年"
                ></v-select>
                <v-select
                    style="width: 200px;float: left;margin-right: 20px;"
                    :items="months"
                    v-model="month"
                    label="月"
                ></v-select>
                <v-btn
                    style="width: 50px;float: left;margin-top: 10px;"
                    label="月"
                    text=""
                >変更</v-btn>
            </div>
            <div id="trend_chart">
                <doughnut :chart-data="datacollection" :options="options" style="position: relative; width:650px;"></doughnut>
                <div id="table">
                    <h4 style="text-align: center;padding-bottom: 10px;">2019年12月の売上傾向</h4>
                    <v-simple-table>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td>{{index!=3 ? index + 1 + '位':''}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.count}}個</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </div>
        </div>

      </v-content>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: '',
      month: '',
      years:['2019','2020','2021'],
      months:[1,2,3,4,5,6,7,8,9,10,11,12],
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
  methods:{
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
  }
};
</script>

<style>
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
    height: 400px;
}

#selector{
    box-sizing: border-box;
    padding: 25px;
    width: 100%;
}

#table{
    width: 250px;
}

#workshop_body {
  display: flex;
  width: 100%;
}

#workshop_nav {
  border: 1.2px solid #dee5ec;
  background-color: #ffffff;
}

#workshop_nav ul {
  list-style: none;
}

#workshop_nav li {
  font-size: 12px;
  cursor: pointer;
  color: #777777;
  margin-bottom: 30px;
}

#workshop_nav li:hover {
  cursor: pointer;
  color: rgb(66, 185, 0);
}
#workshop_nav li.check {
  color: rgb(66, 185, 0);
}

#sub_title{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1.2px solid #e6e6e6;
  margin-bottom: 10px;
}
</style>