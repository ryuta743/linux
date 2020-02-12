<template>
  <v-layout>
    <v-flex xs12 sm12 md12>
      <div id="top">
            <img src="../static/topimg.png" alt="メインビジュアル" style="width: 100%;height: 600px;object-fit: cover;opacity: 1;">
            <div id="madejp">
              <img src="../static/madejp.png" alt="madeinjapan">
              <div class="madechar">受け継がれる意志</div>
              <div class="madechar">受け継がれる技術</div>
            </div>
      </div>
      
      <div id="top_body">
        <div id="pickup_ws">
          <div class="contents_title">今月の天職Pickup工房</div>
          <div id="ws_info">
            <img src="../static/topimg.png" alt="workshop_img" style="width: 550px;height: 350px;object-fit: cover;" />
            <div id="ws_detail">
              <div id="ws_title">天職工房</div>
              <div id="ws_description">
                江戸時代からの伝統を守る工房です。橋のような手頃なものから甲冑のような装飾品まで幅広く、シンプルかつ丁寧にをモットーに制作しています。
              </div>
              <div id="ws_rate">
                <v-rating
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  v-model="ws_rate"
                  readonly
                  half-increments
                  size="20px"
                ></v-rating>
              </div>
            </div>
          </div>
        </div>

        <div id="new_pro">
          <div class="contents_title">新着商品</div>
          <div id="new_products">
            <v-card  id="product" @click="$router.push(`/customer/product/${item.product_id}`)" flat v-for="(item, index) in data" :key="index" v-if="index < 5">
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
                      v-model="ws_rate"
                      size="14px"
                      readonly
                      half-increments
                  ></v-rating>
                </div>
              </v-card-text>      
            </v-card>
          </div>
        </div>

        <div id="new_pro">
          <div class="contents_title">人気商品</div>
          <div id="new_products">
            <v-card id="product" @click="$router.push(`/customer/product/${item.product_id}`)" flat v-for="(item, index) in popproducts" :key="index">
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
                      v-model="ws_rate"
                      size="14px"
                      readonly
                      half-increments
                  ></v-rating>
                </div>
              </v-card-text>      
            </v-card>
          </div>
        </div>

        <div id="finding">
          <div class="contents_title">商品を見つける</div>
          <div id="genres">
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
            <div class="genre"></div>
          </div>
        </div>

      </div>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import {mapActions,mapGetters} from 'vuex';

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async mounted() {
    await  this.get_newproductReq()
  },
  data() {
    return {
      ws_rate: 5,
      pickups: [
        {
          title: "日本刀",
          src: "https://picsum.photos/id/11/500/300",
          description: "ここに説明が入ります"
        },
        {
          title: "こけし",
          src: "https://picsum.photos/id/11/500/300",
          description: "ここに説明が入ります"
        },
        {
          title: "組紐",
          src: "https://picsum.photos/id/11/500/300",
          description: "ここに説明が入ります"
        }
      ],
      newproducts: [
        {
          product_id: 1,
          product_name: "陶器01",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/08/IM_KG02001-01.jpg",
          rating: 4.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ゆう工房"
        },
        {
          product_id: 1,
          product_name: "やばいこけし",
          product_img: "https://ichi-point.jp/wp-content/uploads/2017/05/HR71009-2-600x600.jpg",
          rating: 2.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "サバンナ工房"
        },
        {
          product_id: 1,
          product_name: "話題の組紐",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/07/BS99004_img.jpg",
          rating: 4.9,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "北九州組み紐工房"
        },
        {
          product_id: 1,
          product_name: "組紐",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/09/KG92006_11.jpg",
          rating: 4.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
        {
          product_id: 1,
          product_name: "組紐",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/11/HR91003.jpg",
          rating: 3.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        }
      ],
      popproducts: [
        {
          product_id: 1,
          product_name: "陶器01",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/08/IM_KG02001-01.jpg",
          rating: 4.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ゆう工房"
        },
        {
          product_id: 1,
          product_name: "やばいこけし",
          product_img: "https://ichi-point.jp/wp-content/uploads/2017/05/HR71009-2-600x600.jpg",
          rating: 2.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "サバンナ工房"
        },
        {
          product_id: 1,
          product_name: "話題の組紐",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/07/BS99004_img.jpg",
          rating: 4.9,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "北九州組み紐工房"
        },
        {
          product_id: 1,
          product_name: "組紐",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/09/KG92006_11.jpg",
          rating: 4.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        },
        {
          product_id: 1,
          product_name: "組紐",
          product_img: "https://ichi-point.jp/wp-content/uploads/2018/11/HR91003.jpg",
          rating: 3.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報"
        }
      ],
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  },
  methods:{
    async get_newproductReq(){
      await this.get_newproduct();
    },
    exprice(val){
      return val.toLocaleString();
    },
    ...mapActions('products',['get_newproduct']),
  },
  computed:{
    ...mapGetters('products',['data'])
  }
};
</script>

<style scoped>
#top{
  position: relative;
  width: 100%;
  height: 600px;
  background-color: black;
}

#top #madejp{
  position: absolute;
  margin: auto 0;
  top: 200px;
  left: 30px
}

.madechar{
  font-size: 20px;
  margin-bottom: 8px;
  color: #fff;
}

#top_body{
  width: 1200px;
  margin: 0 auto;
}

#pickup_ws{
  margin-top: 20px;
  width: 100%;
}

.contents_title{
  width: 100%;
  padding: 15px 0 15px 0;
  font-size: 28px;
  color: #444;
  letter-spacing: 1px; 
  border-bottom: 1.2px solid #e8e8e8;
}

#ws_info{
  margin-top: 20px;
  display: flex;
  width: 100%;
}

#ws_detail{
  width: 650px;
  margin-left: 50px;
}

#ws_title{
  font-size: 30px;
  letter-spacing: 4px;
  padding-left: 10px;
  padding-bottom: 30px; 
}

#ws_description{
  width: 400px;
  line-height: 32px;
  letter-spacing: 2px;
  height: 200px;
  color: #444;
}

#new_pro{
  margin-top: 50px;
}

#new_products{
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: space-between
}

#product{
  width: 220px;
  margin-bottom: 20px;
}

#product_img{
  width: 100%;
  height: 220px; 
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

#finding{
  margin-top: 50px;
  widows: 100%;
}

#genres{
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.genre{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  width: 205px;
  height: 90px;
  margin-bottom: 40px;
  font-size: 18px;
  background-color: #DEE5ED;
  color: #666;
}
</style>