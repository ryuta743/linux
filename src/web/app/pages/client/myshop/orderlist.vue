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
    <v-container grid-list-xs style="max-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-btn color="info" icon :loading="loading" v-if="loading" large></v-btn>
      <v-content v-if="!loading">
        <div id="sub_title">
          <h3>
            <v-icon>mdi-format-list-checks</v-icon>
            注文一覧{{orderlist.length!=0 ? orderlist[0].shop_name:''}}
          </h3>
        </div>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">注文No</th>
              <th style="color: #111;">注文者</th>
              <th style="color: #111;">注文日</th>
              <th style="color: #111;">処理状態</th>
              <th style="color: #111;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderlist" :key="index">
              <td>{{orderlist[0] ? orderlist.length - index:''}}</td>
              <td>{{item.user_name}}</td>
              <td>{{item.buy_date}}</td>
              <td>{{item.status==1 ? '発送済み':'未発送'}}</td>
              <td>
                <v-btn
                  color="primary"
                  outlined
                  @click="$router.push(`order/${item.order_number}?number=${orderlist.length - index}`)"
                >注文明細をみる</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
middleware: 'auth',

  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    //if(this.loginuserdata.user_data)
    await this.getOrderlist({ wsid: this.loginuserdata.user_data.shop_id });
    this.loading = false
  },
  methods: {
    ...mapActions("workshop_manage", ["getShopdata", "getOrderlist"])
  },
  computed: {
    ...mapGetters("workshop_manage", ["workshop_data","orderlist"]),
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

#sub_title {
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1.2px solid #e6e6e6;
  margin-bottom: 10px;
}
</style>