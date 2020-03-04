<template>
  <div id="workshop_body">
    <div style="min-height: 100vh;width: 15%;" id="workshop_nav">
      <ul>
        <li @click="$router.push('/client/myshop/myshop')">
          <v-icon>mdi-home</v-icon> 管理ツールトップ
        </li>
        <li @click="$router.push('/client/myshop/orderlist')" class="check">
          <v-icon>mdi-format-list-checks</v-icon> 注文一覧
        </li>
        <li @click="$router.push('/client/myshop/sales')">
          <v-icon>mdi-chart-bar</v-icon> 売上一覧
        </li>
        <li @click="$router.push('/client/myshop/sales_trend')">
          <v-icon>mdi-chart-arc</v-icon> 売上傾向表
        </li>
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
      <v-btn color="info" icon :loading="loading" v-if="loading" large></v-btn>
      <v-content v-if="!loading">
        <div id="sub_title">
          <h3>注文No.{{$route.query.number}}</h3>
          <div class="flex-grow-1"></div>
          <v-btn
            color="success"
            text
            @click="$router.push(`/client/myshop/order_print/${$route.params.order}`)"
          >
            <v-icon>mdi-cash-100</v-icon>領収書発行
          </v-btn>
          <v-btn
            color="success"
            text
            @click="$router.push(`/client/myshop/delivery/${$route.params.order}`)"
          >
            <v-icon>mdi-package-variant</v-icon>納品書発行
          </v-btn>
          <v-btn
            color="success"
            text
            @click="$router.push(`/client/myshop/invoice/${$route.params.order}`)"
            style="margin-right: 20px;"
          >
            <v-icon>mdi-ferry</v-icon>インボイス発行
          </v-btn>
          <v-btn
            color="grey"
            dark
            @click="$router.push('/client/myshop/orderlist')"
            depressed
          >注文一覧へ戻る</v-btn>
        </div>
        <v-card flat>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <h5>注文者名:</h5>
                  <h4 style="padding-bottom: 20px;">{{ orderlist[0] ? orderlist[0].user_name:'' }}</h4>
                  <h5>お届け先国:</h5>
                  {{ orderlist[0] ? orderlist[0].countory:'' }}
                  <br />
                </v-flex>
                <v-flex xs12 md6>
                  <h5>お届け郵便番号:</h5>
                  {{ orderlist[0] ? orderlist[0].post_address:'' }}
                  <br />
                  <h5 style="padding-top: 20px;">お届け先住所:</h5>
                  {{ orderlist[0] ? orderlist[0].address:'' }}
                  <br />
                  <h5 style="padding-top: 20px;">注文日:</h5>
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
                    <th style="color: #111;text-align: center;">商品画像</th>
                    <th style="color: #111;text-align: center;">商品名</th>
                    <th style="color: #111;text-align: center;">個数</th>
                    <th style="color: #111;text-align: center;">単価</th>
                    <th style="color: #111;text-align: center;">梱包状態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in details" :key="index">
                    <td style="color: #111;text-align: center;">{{item.product_number}}</td>
                    <td style="color: #111;text-align: center;">
                      <v-lazy-image
                        :src="item.product_img"
                        style="width: 50px;height: 50px;object-fit: cover;"
                      />
                    </td>
                    <td style="color: #111;text-align: center;">{{item.product_name}}</td>
                    <td style="color: #111;text-align: center;">{{item.count}}</td>
                    <td style="color: #111;text-align: center;">{{exprice(item.price)}}円</td>
                    <td
                      style="display: flex;justify-content: center;box-sizing: border-box;padding-bottom:60px;"
                    >
                      <v-checkbox disabled v-model="item.proccess"></v-checkbox>
                      <v-btn
                        :color="item.proccess ? 'red':'info'"
                        @click="processcheck(index)"
                        style="color: #fff;margin-top: 15px;"
                        depressed
                      >{{ item.proccess ? '解除':'完了' }}</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <!-- v-if="orderlist[0] ? checkStatus:''" -->
            <v-layout row wrap justify-center v-if="end_data[0] ? checkStatus:''">
            <!-- <v-layout row wrap justify-center v-if="this.end_data[0].status == 0 ? this.end_data[0].status:null"> -->
              <v-btn color="success" @click="dialog = true" depressed>発送完了</v-btn>
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
              <v-btn color="success" @click="shipping_compReq">はい</v-btn>
              <!-- <v-btn color="success" @click="complete_dialog = true">はい</v-btn> -->
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
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: "auth",
  head() {
    return {
      title: '工房管理'
    }
  },
  data() {
    return {
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
    if (!this.loginuserdata.user_data.shop_id) return;
    var r1 = this.getOrderlist({ wsid: this.loginuserdata.user_data.shop_id });
    var r2 = this.getOrderdetail({
      wsid: this.loginuserdata.user_data.shop_id,
      order_number: this.$route.params.order
    });
    var r3 = await r1;
    var r4 = await r2;
    this.loading = false;
    await this.get_order_listsReq();
  },
  methods: {
    exprice(val) {
      return val.toLocaleString();
    },
    async get_order_listsReq(){
      let order_data = {
        order_num: this.$route.params.order,
        shop_id: this.details[0].shop_id
      }
      console.log(order_data)
      await this.get_order_lists({order_data});
    },
    async processcheck(i) {
      //削除アップデート
      var payload = {
        which: this.details[i].proccess,
        product_id: this.details[i].product_id,
        order: this.details[i].order_number,
        target: i
      };
      await this.proccessUp({ payload });
    },
    // 正都が書いたコード
    async shipping_compReq() {
      let flg = 0;
      for (var i = 0; i < this.details.length; i++) {
        console.log(this.details[i].proccess);
        if (this.details[i].proccess === 0) {
          flg = 1;
          if (flg === 1) {
            alert("梱包が完了していない商品があります");
            this.dialog = false;
          }
        }
      }
      if (flg === 0) {
        const shipping_data = {
          data: this.details
        };
        try {
          console.log(shipping_data.data);
          await this.shipping_comp({ shipping_data });
          this.complete_dialog = true
        } catch (e) {
          console.log("エラー発生");
          console.log(e);
        }
      }
    },
    ...mapActions("workshop_manage", [
      "getOrderdetail",
      "getOrderlist",
      "proccessUp",
      "shipping_comp",
      "get_order_lists"
    ])
  },
  computed: {
    checkStatus() {
      return this.end_data[0].status == 0 ? true : false;
    },
    ...mapGetters("workshop_manage", ["workshop_data", "orderlist", "details", "end_data"]),
    ...mapGetters(["loginuserdata"])
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
  border: 1.2px solid #dee5ec;
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

#sub_title {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1.2px solid #e6e6e6;
  margin-bottom: 10px;
}

.v-lazy-image {
  opacity: 0;
  transition: opacity 0.4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>