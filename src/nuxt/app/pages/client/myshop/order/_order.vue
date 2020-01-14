<template>
　<div id="workshop_body">
    <v-container grid-list-xs style="min-height: 100vh;width: 15%;" id="workshop_nav">
      <ul>
        <li @click="$router.push('/client/myshop/myshop')">
          <v-icon>mdi-home</v-icon> 管理ツールトップ
        </li>
        <li @click="$router.push('/client/myshop/orderlist')" class="check">
          <v-icon>mdi-format-list-checks</v-icon> 注文一覧
        </li>
        <li @click="$router.push('/client/myshop/sales')"><v-icon>mdi-chart-bar</v-icon> 売上一覧</li>
        <li @click="$router.push('/client/myshop/sales_trend')"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
        <li @click="$router.push('/client/myshop/products')">
          <v-icon>mdi-format-list-bulleted</v-icon> 商品一覧・在庫状況
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
      <v-btn color="info" icon :loading="loading" v-if="loading" large></v-btn>
      <v-content v-if="!loading">
        <div id="sub_title">
          <h3>注文No.{{$route.params.order}}</h3>
          <div class="flex-grow-1"></div>
          <v-btn color="grey" dark @click="$router.push('/client/myshop/orderlist')">注文一覧へ戻る</v-btn>
        </div>
        <v-card>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <h5>注文者名:</h5>
                  <h4>{{ orderlist[0] ? orderlist[0].user_name:'' }}</h4>
                </v-flex>
                <v-flex xs12 md6>
                  <h5>お届け先国:</h5>
                  {{ orderlist[0] ? orderlist[0].countory:'' }}<br>
                  <h5>お届け郵便番号:</h5>
                  {{ orderlist[0] ? orderlist[0].post_address:'' }}<br>
                  <h5>お届け先住所:</h5>
                  {{ orderlist[0] ? orderlist[0].address:'' }}<br>
                  <h5>注文日:</h5>
                  {{ orderlist[0] ? orderlist[0].buy_date:'' }}
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card-text>
            <v-card-title primary-title>注文商品</v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <th style="color: #111;text-align: center;">商品番号</th>
                    <th style="color: #111;text-align: center;">商品名</th>
                    <th style="color: #111;text-align: center;">個数</th>
                    <th style="color: #111;text-align: center;">単価</th>
                    <th style="color: #111;text-align: center;">梱包状態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in details" :key="index">
                    <td style="color: #111;text-align: center;">{{item.product_number}}</td>
                    <td style="color: #111;text-align: center;">{{item.product_name}}</td>
                    <td style="color: #111;text-align: center;">{{item.count}}</td>
                    <td style="color: #111;text-align: center;">{{exprice(item.price)}}円</td>
                    <td style="display: flex;justify-content: center;box-sizing: border-box;padding-bottom:60px;">
                      <v-checkbox v-model="item.proccess"></v-checkbox>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <!-- v-if="orderlist[0] ? checkStatus:''" -->
            <v-layout row wrap justify-center v-if="orderlist[0] ? checkStatus:''">
              <v-btn color="success" @click="dialog = true">発送完了</v-btn>
              <v-btn color="white" @click="$router.push(`/client/myshop/order_print/${$route.params.order}`)">領収書発行</v-btn>
              <v-btn color="white" @click="$router.push(`/client/myshop/delivery/${$route.params.order}`)">納品書発行</v-btn>
              <v-btn color="white" @click="$router.push(`/client/myshop/invoice/${$route.params.order}`)">インボイス発行</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>
      <v-dialog
        v-model="dialog"
        scrollable
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-text style="text-align: center;">
            <v-icon color="info" size="55px">mdi-help</v-icon>
          </v-card-text>
          <v-card-text style="text-align: center;">発送完了状態にしますか？</v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-center>
              <v-btn color="success" @click="complete_dialog = true">はい</v-btn>
              <v-btn @click="dialog = false">いいえ</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="complete_dialog"
        scrollable
        persistent
        :overlay="false"
        max-width="600px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-text style="text-align: center;">
            <v-icon color="success" size="55px">mdi-check</v-icon>
          </v-card-text>
          <v-card-text style="text-align: center;">発送完了状態にしました</v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-center>
              <v-btn color="success" @click="$router.push('/client/myshop/orderlist')">OK</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
　</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      shop_id: 1,
      loading: true,
      dialog: false,
      complete_dialog: false,
      orderInfo: {
        orderName: "Xavier",
        date: 20190828,
        address: "~~~~",
        isCheck: true
      }
    };
  },
  async mounted() {
    var r1 = this.getOrderlist({ wsid: this.shop_id });
    var r2 = this.getOrderdetail({ wsid: this.shop_id,order_number: this.$route.params.order });
    var r3 = await r1;
    var r4 = await r2;
    this.loading = false
  },
  methods: {
    exprice(val){
      return val.toLocaleString();
    },
    ...mapActions("workshop_manage", ["getOrderdetail","getOrderlist"])
  },
  computed: {
    checkStatus(){
      return this.orderlist[0].status==0 ? true:false
    },
    ...mapGetters("workshop_manage", ["workshop_data","orderlist","details"])
  }
};
</script>

<style>
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