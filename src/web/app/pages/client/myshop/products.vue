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
        <li @click="$router.push('/client/myshop/sales_trend')"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
        <li @click="$router.push('/client/myshop/products')" class="check">
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
          <h3><v-icon>mdi-format-list-bulleted</v-icon>商品一覧・在庫状況</h3>
        </div>

      　<v-card>
            <v-card-text>
                
            <v-layout row wrap>
              <v-flex
                xs12
                md4
                v-for="(item, index) in products"
                :key="index"
                style="padding: 0 10px 20px 10px;"
              >
                <v-card hover>
                  <v-card-text>
                      在庫：{{item.stock}}個
                      <v-btn color="success" icon @click="setStock(item.stock + 1)"><v-icon>mdi-plus</v-icon></v-btn>
                      <v-btn color="red" icon @click="setStock(item.stock - 1)"><v-icon>mdi-minus</v-icon></v-btn>
                      <v-chip color="red" v-if="item.stock < item.safety" dark>安全在庫{{item.safety - item.stock}}個不足</v-chip>
                  </v-card-text>
                  <v-flex xs12 md12>
                    <v-lazy-image style="width: 100%;object-fit: scale-down;min-height: 350px;" :src="item.product_img" @click="$router.push(`/customer/product/${item.product_id}`)"></v-lazy-image>
                  </v-flex>
                  <v-card-text style="font-weight: bold;height: 10px;" @click="$router.push(`/customer/product/${item.product_id}`)">{{item.product_name}}</v-card-text>
                  <v-card-text style="height : 10px;" @click="$router.push(`/customer/product/${item.product_id}`)">
                    <v-layout row wrap align-center @click="$router.push(`/customer/product/${item.product_id}`)">
                      <v-rating
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        v-model="item.stock"
                        readonly
                        size="19px"
                        half-increments
                      ></v-rating>
                      ({{item.stock}})
                    </v-layout>
                  </v-card-text @click="$router.push(`/customer/product/${item.product_name}`)">
                  <v-card-text style="height: 8px;">¥{{exprice(item.price)}}</v-card-text>
                  <v-card-text @click="$router.push(`/customer/product/${item.product_name}`)">
                    <!-- <v-chip
                      class="ma-2"
                      color="primary"
                      label
                      text-color="white"
                      v-for="(item, index) in item.tags"
                      :key="index"
                    >
                      <v-icon left>mdi-label</v-icon>
                      {{item}}
                    </v-chip> -->
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex'
export default {
middleware: 'auth',
  head() {
    return {
      title: '工房管理'
    }
  },
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    if(!this.loginuserdata.user_data.shop_id) return;
    await this.getProduct({ wsid: this.loginuserdata.user_data.shop_id });
    this.loading = false;
  },
  methods:{
    exprice(val){
      return val.toLocaleString();
    },
    ...mapActions('workshop_manage',['getProduct']),
    ...mapMutations('workshop_manage',['setStock'])
  },
  computed:{
    ...mapGetters('workshop_manage',['products']),
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