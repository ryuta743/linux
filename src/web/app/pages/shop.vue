<template>
  <v-layout row wrap id="shop_body">

    <div id="bread_list"> <!-- パンくずリスト -->
      <div class="bread"><v-icon>mdi-home</v-icon>トップ</div>
      <div class="bread">></div>
      <div class="bread">ショップ</div>
    </div>

    <v-container grid-list-xs>
      <v-content>
        <h4 style="width: 100%;text-align: center;">詳細検索</h4>
        <div>{{error}}</div>

        <v-layout row wrap justify-center style="padding-top: 10px;">
          <v-flex xs12 md6>
            <form @submit.prevent>
              <v-layout row wrap>
                <v-text-field outlined label="キーワード" v-model="select_data" color="grey"></v-text-field>
                <v-btn type="submit" color="grey" style="height: 55px;" @click="get_select" depressed>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-layout>
            </form>
          </v-flex>
          <div id="advance">
                <label>検索対象:</label>
                <select v-model="selected" id="search_select">
                  <option disabled value="">未選択</option>
                  <option value="0">商品</option>
                  <option value="1">工房</option>
                </select>
                <label style="margin-left: 40px;">表示順(商品):</label>
                <select v-model="howdisp_p" id="search_select">
                  <option disabled value="">未選択</option>
                  <option value="0">価格が安い順</option>
                  <option value="1">評価が高い順</option>
                </select>
                <label style="margin-left: 40px;">表示順(工房):</label>
                <select v-model="howdisp_w" id="search_select">
                  <option disabled value="">未選択</option>
                  <option value="0">新しい順</option>
                  <option value="1">評価が高い順</option>
                </select>
            </div>
        </v-layout>

        <v-divider style="margin-top: 15px;"></v-divider>
      </v-content>
      <v-content>

        <v-layout row wrap id="products">
          
            <div id="products_header">
                <div id="search_word">{{ search_word ? search_word:'新規商品一覧' }}</div>
                <div id="search_count">{{ '-全' + data.length + '件' }}</div>
            </div>

            <v-card id="product" @click="$router.push(`/customer/product/${item.product_id}`)" flat v-for="(item, index) in data" :key="index">
              <div id="product_img">
                <v-lazy-image :src="item.product_img" style="width: 100%;object-fit: cover;height: 100%;vertical-align:bottom"/>
              </div>
              <v-card-text style="heigh: 150px;">
                <div id="product_name">{{item.product_name}}</div>
                <div id="product_price">¥{{exprice(item.price)}}</div>
                <div id="product_rate">
                  <v-rating
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      v-model="rate"
                      size="14px"
                      readonly
                      half-increments
                  ></v-rating>
                </div>
              </v-card-text>      
            </v-card>

            <v-card id="product" @click="$router.push(`/customer/workshop/${item.shop_id}`)" flat v-for="(item, index) in shop_name" :key="index">
              <div id="product_img">
                <v-lazy-image :src="item.shop_img" style="width: 100%;object-fit: cover;height: 100%;vertical-align:bottom"/>
              </div>
              <v-card-text style="heigh: 150px;">
                <div id="product_name">{{item.shop_name}}</div>
                <div id="product_price" style="font-size: 12px;">{{ item.shop_description.slice(0,12) + '...' }}</div>
                <div id="product_rate">
                  <v-rating
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      v-model="rate"
                      size="14px"
                      readonly
                      half-increments
                  ></v-rating>
                </div>
              </v-card-text>      
            </v-card>

        </v-layout>
        

      </v-content>
    </v-container>
  </v-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import { toUnicode } from 'punycode';

export default {
  async mounted() {
  await  this.get_newproductReq()
  },
  data() {
    return {

      selected: '',

      howdisp_p: '',

      howdisp_w: '',

      select_data: '',

      search_word: '',

      error: '',

      rate: 12,

      products: [
        {
          product_id: 1,
          title: "陶器01",
          src: "https://ichi-point.jp/wp-content/uploads/2018/08/IM_KG02001-01.jpg",
          rating: 4.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ゆう工房"
        },
        {
          product_id: 1,
          title: "やばいこけし",
          src: "https://ichi-point.jp/wp-content/uploads/2017/05/HR71009-2-600x600.jpg",
          rating: 2.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "サバンナ工房"
        },
        {
          product_id: 1,
          title: "話題の組紐",
          src: "https://ichi-point.jp/wp-content/uploads/2018/07/BS99004_img.jpg",
          rating: 4.9,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "北九州組み紐工房"
        },
        {
          product_id: 1,
          title: "組紐",
          src: "https://ichi-point.jp/wp-content/uploads/2018/09/KG92006_11.jpg",
          rating: 4.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
        {
          product_id: 1,
          title: "組紐",
          src: "https://ichi-point.jp/wp-content/uploads/2018/11/HR91003.jpg",
          rating: 3.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
        {
          product_id: 1,
          title: "組紐",
          src: "https://ichi-point.jp/wp-content/uploads/2018/05/7d403414bdbdea0df540431119756fb7.jpg",
          rating: 3.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
        {
          product_id: 1,
          title: "やばいこけし",
          src: "https://ichi-point.jp/wp-content/uploads/2018/01/IMG_1490-1.jpg",
          rating: 5.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
        {
          product_id: 1,
          title: "やばいこけし",
          src: "https://picsum.photos/id/11/500/300",
          rating: 5.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },{
          product_id: 1,
          title: "やばいこけし",
          src: "https://ichi-point.jp/wp-content/uploads/2018/01/IMG_1490-1.jpg",
          rating: 5.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
      ]
    };
  },

  methods:{
    async get_select(){
      if(this.select_data == ''){
        this.error = '未入力です'
      }else{
        if(this.selected == 0){
        var payload = {
          product : this.select_data,
        }
        try{
          await this.select_product({payload});
          this.search_word = this.select_data;
        }catch(e){
          console.log('エラー発生'),
          console.log(e)
        }
      }else if(this.selected == 1){
        var payload = {
          work_shop : this.select_data,
        }
        try{
          await this.search_workshop({payload});
          this.search_word = this.select_data;
        }catch(e){
          console.log('エラー発生'),
          console.log(e)
        }
      }
    }
    },
    async get_newproductReq(){
      await this.get_newproduct();
    },
    exprice(val){
      return val.toLocaleString();
    },

    ...mapActions('products',['select_product','get_newproduct']),
    ...mapActions('work_shop',['search_workshop'])
  },

  computed:{
    ...mapGetters('products',['data']),
    ...mapGetters('work_shop',['shop_name'])
  }
};
</script>

<style scoped>
.sawarabi{
  font-family: "Sawarabi Mincho";
}

#bread_list{
  display: flex;
  align-items: flex-end;
  margin: 20px 0;
  width: 100%;
  height: 30px;
  border-bottom: 1.2px solid #e1e1e1;
}

.bread{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 14px;
  cursor: pointer;
  width: 80px;
  color: #444444;
}

.target {
  cursor: pointer;
}

a {
  text-decoration: none;
}

#shop_body{
  width: 1100px;
  margin: 0 auto;
}

#products{
  display: flex;
  min-height: 500px;
}

#products_header{
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
}

#search_word{
  box-sizing: border-box;
  padding-left: 15px;
  font-size: 26px;
  min-width: 50px;
  margin-right: 30px;
}

#search_count{
  font-size: 13px;
  width: 100px
}

#advance{
  color: #444;
}

#search_select{
  width: 70px;
  color: #444444;
  outline: 0;
  border: 1.2px solid grey;
  border-width: 0 0 1.2px 0;
  border-radius: 1px;
}

#product{
  width: 250px;
  margin-bottom: 20px;
  margin-left: 15px
}

#product_img{
  width: 100%;
  height: 250px; 
}

#product_name{
  width: 100%;
  height: 30px;
}

#product_price{
  width: 100%;
  height: 20px;
  box-sizing: border-box;
  padding-left: 8px;
}
</style>