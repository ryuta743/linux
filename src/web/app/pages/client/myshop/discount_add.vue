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
      <v-btn color="info" icon :loading="loading" v-if="loading" large></v-btn>
      <v-content v-if="!loading">
        <div id="sub_title">
          <h3>
            <v-icon>mdi-cash-usd</v-icon>
            セット割引追加
          </h3>
        </div>
        <div id="controller">
            <v-btn color="info" text @click="$router.push('/client/myshop/discount')"><v-icon>mdi-arrow-left-circle</v-icon>セット割引一覧へ戻る</v-btn>
        </div>
        <div>
              <div v-show="alert"><v-btn color="success" text>追加に成功しました!</v-btn></div>
              <form @submit.prevent @submit="addSaleReq" style="display: flex;width: 620px;">
                <v-text-field
                  label="セット名"
                  v-model="setname"
                  outlined
                  style="width: 300px;"
                ></v-text-field>
                <v-text-field
                  label="割引率(%)"
                  v-model="rate"
                  outlined
                  style="width: 100px;margin-left:10px;"
                ></v-text-field>
                <v-btn type="submit" color="info" style="width: 200;height: 55px;margin-left: 10px;">セット追加</v-btn>
              </form>
        </div>
        <div id="addItems">
            <div v-for="(item, index) in addItems" :key="index" class="addItem">
                <v-lazy-image :src="products[item].product_img"></v-lazy-image>
                <div id="detective">
                    <h5 class="product_name">{{products[item].product_number + '.' + products[item].product_name}}</h5>
                    <div class="product_price">単価:{{exprice(products[item].price) + '円'}}</div>
                    <div></div>
                </div>
            </div>
        </div>
        <v-simple-table style="margin-top: 20px;">
            <thead>
                <tr>
                    <th>　</th>
                    <th style="color: #111;">商品番号</th>
                    <th style="color: #111;">商品名</th>
                    <th style="color: #111;">単価</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="index">
                    <td style="color: #111;"><v-btn :color="checkState(index)!==false ? 'error':'info'" outlined @click="changeState(index)"> {{ checkState(index)!==false ? '解除':'追加' }}</v-btn></td>
                    <td style="color: #111;">{{item.product_number}}</td>
                    <td style="color: #111;">{{item.product_name}}</td>
                    <td style="color: #111;">{{exprice(item.price) + '円'}}</td>
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
  data() {
    return {
      addItems: [],
      loading: true,
      shop_id: 1,
      setname: '',
      rate: 0,
      alert: false
    };
  },
  async mounted() {
    await this.getProduct({ wsid: this.shop_id });
    this.loading = false
  },
  methods: {
    exprice(val){
      return val.toLocaleString();
    },
    changeState(index){
        console.log('target' + this.checkState(index))
      if(this.checkState(index) !== false){
          console.log('addItemsにすでにある時の処理')
          const target = this.checkState(index);
          this.addItems.splice(target,1);
      }else{
          console.log('addItemsにない時の処理')
          this.addItems.push(index);
      }
    },
    checkState(index){
      if(this.addItems.indexOf(index) != -1) return this.addItems.indexOf(index)
      return false
    },
    async addSaleReq(){
      const payload = {
        items: this.addItems,
        products: this.products,
        wsid: this.shop_id,
        salename: this.setname,
        rate: this.rate
      }
      const result = await this.addSale({payload});
      if(result) this.alert = true
      this.addItems = [];
      this.setname = "";
      this.rate = 0;
    },
    ...mapActions("workshop_manage", ["getShopdata", "getProduct","getSale","addSale"])
  },
  computed: {
    ...mapGetters("workshop_manage", ["sales","products"])
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

#addItems{
    background-color: #e1e1e1;
    display: flex;
    width: 100%;
    height: 200px;
    border: 1px solid #e9e9e9;
}

#detective{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 300px;
}

.addItem{
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 5px;
    width: 50%;
    background-color: #ffffff;
    height: 200px;
}

.product_name{
    text-align: center;
    border-bottom: 1.2px solid #777777;
    width: 280px;
}

.v-lazy-image {
  background-color: #555555;
  width: 200px;
  height: 200px;
  object-fit: scale-down;
  opacity: 0;
  transition: opacity .4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>