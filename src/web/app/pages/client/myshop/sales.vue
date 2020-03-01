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
        <li @click="$router.push('/client/myshop/sales')" class="check"><v-icon>mdi-chart-bar</v-icon> 売上一覧</li>
        <li @click="$router.push('/client/myshop/sales_trend')"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
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
          <h3><v-icon>mdi-chart-bar</v-icon>売上表</h3>
          <div class="flex-grow-1"></div>
          <v-btn color="info" depressed @click="$router.push('/client/myshop/sales_print')"><v-icon>mdi-file</v-icon>売上一覧表を印刷する</v-btn>
        </div>
        <v-simple-table>
              <thead>
                <tr>
                  <th style="color: #111;">商品番号</th>
                  <th style="color: #111;">商品画像</th>
                  <th style="color: #111;">商品名</th>
                  <th style="color: #111;">価格</th>
                  <th style="color: #111;">個数</th>
                  <th style="color: #111;">売上日</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in order_sales" :key="index">
                  <td>{{item.product_number}}</td>
                  <td>
                    <v-lazy-image :src="item.product_img" style="width: 50px;height: 50px;object-fit: cover;" />
                  </td>
                  <td>{{item.product_name}}</td>
                  <td>{{exprice(item.price)}}円</td>
                  <td>{{item.count}}個</td>
                  <td>{{item.record_date}}</td>
                </tr>
              </tbody>
            </v-simple-table>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
middleware: 'auth',

    data(){
        return{
            items:[
                {
                    title:'俺の陶器',
                    price: 3000,
                    num: 2,
                    date: '2019/8/30'
                },
                {
                    title:'陶器01',
                    price: 3000,
                    num: 1,
                    date: '2019/8/29'
                },
                {
                    title:'陶器02',
                    price: 3000,
                    num: 4,
                    date: '2019/8/29'
                }
            ]
        }
    },
    async mounted() {
      if(!this.loginuserdata.user_data.shop_id) return;
      await this.getOrderSales({wsid: this.loginuserdata.user_data.shop_id})
      console.log(this.order_sales)
    },
    methods:{
      exprice(val){
      return val.toLocaleString();
    },
      ...mapActions('workshop_manage',['getOrderSales'])
    },
    computed:{
      ...mapGetters('workshop_manage',['order_sales']),
      ...mapGetters(['loginuserdata'])
    }
};
</script>

<style>
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

.v-lazy-image {
  opacity: 0;
  transition: opacity .4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>