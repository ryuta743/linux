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
        <li @click="$router.push('/client/myshop/sales')">
          <v-icon>mdi-chart-bar</v-icon> 売上一覧
        </li>
        <li @click="$router.push('/client/myshop/sales_trend')">
          <v-icon>mdi-chart-arc</v-icon> 売上傾向表
        </li>
        <li @click="$router.push('/client/myshop/products')">
          <v-icon>mdi-format-list-bulleted</v-icon> 商品一覧・在庫状況
        </li>
        <li @click="$router.push('/client/myshop/discount')" class="check">
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

      <v-dialog
        v-model="dialog"
        transition="dialog-transition"
        max-width="900px"
      >
        <div style="background-color: #ffffff;padding: 20px;">
            <h4 style="color: #4BAf50;"><v-icon color="black">mdi-cash-usd</v-icon>{{ saleitem[0]? saleitem[0].sale_name:'' }}</h4>
            <p style="color: #444;margin-top: 10px;margin-left:10px;">割引率: {{saleitem[0] ? saleitem[0].rate + '%':''}}</p>
        </div>
        <div id="saleitems">
            <div class="saleitem" v-for="(item, index) in saleitem" :key="index">
              <v-lazy-image :src="item ? item.product_img:''"></v-lazy-image>
              <div>
                <h4 style="border-bottom: 1.2px solid #444;">{{item ? item.product_number + '.' +item.product_name:''}}</h4>
                <h5>単価:{{item ? item.price + '円':''}}</h5>
              </div>
            </div>
            <v-btn color="grey" @click="dialog =false">戻る</v-btn>
        </div>
      </v-dialog>

      <v-btn color="info" icon :loading="loading" v-if="loading" large></v-btn>
      <v-content v-if="!loading">
        <div id="sub_title">
          <h3>
            <v-icon>mdi-cash-usd</v-icon>
            セット割引一覧
          </h3>
        </div>
        <div id="controller">
            <v-btn color="success" text @click="$router.push('/client/myshop/discount_add')"><v-icon>mdi-plus</v-icon>セット割引を追加する</v-btn>
        </div>
        <div id="sets">
            <v-simple-table>
            <thead>
                <tr>
                    <th style="color: #111;">　</th>
                    <th style="color: #111;">セット名</th>
                    <th style="color: #111;">割引率</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in sales" :key="index">
                    <td style="color: #111;"><v-btn color="info" outlined @click="getSaleitemReq(item.sale_id)">詳細</v-btn></td>
                    <td style="color: #111;">{{item.sale_name}}</td>
                    <td style="color: #111;">{{item.rate + '%'}}</td>
                </tr>
            </tbody>
            </v-simple-table>
        </div>
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
      shop_id: 1,
      dialog: false,
    };
  },
  async mounted() {
    await this.getSale({ wsid: this.shop_id });
    this.loading = false
  },
  methods: {
    exprice(val){
      return val.toLocaleString();
    },
    async getSaleitemReq(saleid){
      var result = await this.getSaleitem({saleid:saleid})
      console.log(this.saleitem)
      if(result === true) this.dialog = true
    },
    ...mapActions("workshop_manage", ["getShopdata", "getOrderlist","getSale","getSaleitem"])
  },
  computed: {
    ...mapGetters("workshop_manage", ["sales","saleitem"])
  }
};
</script>

<style scoped>
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

#sets{
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
}

#controller{
  padding: 15px 0;
}

#saleitems{
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  width: 900px;
  height: 550px;
  background-color: #ffffff;
}

.saleitem{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 450px;
  height: 500px;
}

.v-lazy-image {
  box-shadow: 0 0 8px gray;
  background-color: #555555;
  width: 400px;
  height: 400px;
  object-fit: scale-down;
  opacity: 0;
  transition: opacity .4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>