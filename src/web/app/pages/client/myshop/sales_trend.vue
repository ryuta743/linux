<template>
  <div id="workshop_body">
    <div style="min-height: 100vh;width: 15%;" id="workshop_nav">
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
    </div>
    <v-container grid-list-xs style="min-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-content>
        <div id="sub_title">
          <h3><v-icon>mdi-chart-arc</v-icon>売上傾向表</h3>
          <div class="flex-grow-1"></div>
          <v-btn color="info" depressed @click="$router.push(`/client/myshop/trend_print/${year}`)"><v-icon>mdi-file</v-icon>売上傾向表を印刷する</v-btn>
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
                    <h4 style="text-align: center;padding-bottom: 10px;">{{ year }}年{{ month }}月の売上傾向</h4>
                    <v-simple-table>
                        <tbody>
                            <tr v-for="(item, index) in trends" :key="index">
                                <td>{{index!=3 ? index + 1 + '位':''}}</td>
                                <td style="font-size: 11px;width: 128px;">{{ trends[index] != undefind ? item.product_name:''}}</td>
                                <td>{{ trends[index] != undefind ? item.datacount:'' }}個</td>
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
import {mapGetters,mapActions} from 'vuex'

export default {
middleware: 'auth',

  data() {
    return {
      year: null,
      month: null,
      years:[2019,2020,2021],
      months:[1,2,3,4,5,6,7,8,9,10,11,12],
      datacollection: null,
      options:{
          responsive: true,
          legend:{
              position: 'bottom'
          }
      },
      
    };
  },
  async mounted() {
      if(!this.loginuserdata.user_data) return
      await this.getTrend({wsid:this.loginuserdata.user_data.shop_id})
      var today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth() + 1;
      if (process.client) {
        if(this.trends[2] != undefined){
          this.fillData();
        }
      }
      
  },
  methods:{
      fillData() {
      this.datacollection = {
        labels: [this.trends[0].product_name, this.trends[1].product_name, this.trends[2].product_name, 'その他'],
        datasets: [
          {
            data: [this.trends[0].datacount,this.trends[1].datacount,this.trends[2].datacount,this.trends[3].datacount],
            backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#c1e4e9']
          }
        ]
      };
    },
    ...mapActions('workshop_manage',['getTrend'])
  },
  computed:{
    ...mapGetters('workshop_manage',['trends']),
    ...mapGetters(['loginuserdata'])
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
  padding-top: 40px;
  padding-left: 10px;
  border: 1.2px solid #DEE5EC;
  border-width: 1.2px 1.2px 1.2px 0;
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