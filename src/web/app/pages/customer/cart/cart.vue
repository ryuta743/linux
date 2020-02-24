<template>
  <v-container grid-list-xs style="min-height: 100vh;">
    <v-content>
      <v-content>
        <v-card flat>
          <v-layout row wrap>
            <v-flex xs12 md10>
              <v-card-title primary-title>
                <v-icon>mdi-cart</v-icon>カート
              </v-card-title>
            </v-flex>
            <v-flex xs12 md2>
              <v-card-title primary-title><v-btn depressed color="success" style="width: 100%;" @click="$router.push('/customer/cart/cartBuy')">カート内商品を購入</v-btn></v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-card-text style="min-height: 500px;">
            <v-layout row wrap>
              <div id ="null_cart" v-if="getcartdata.length==0">
                <img src="/grey_logo.png" style="width: 100px;">
                <p>カートに商品がありません</p>
              </div>
              <v-flex
                xs12
                md3
                v-for="(item, index) in getcartdata"
                :key="index"
                style="padding: 0 10px 20px 10px;"
              >
                <v-card>
                  <v-card-text style="display: flex;">
                    <v-btn color="error" outlined @click="cartKill(index)" small><v-icon hover color="red">mdi-close</v-icon></v-btn>
                    <div class="item_count">
                      <input type="number" v-model="item.count" style="width: 30px;">個
                    </div>
                  </v-card-text>
                  <div class="product_img">
                    <v-lazy-image :src="item.product_img" class="target" @click="$router.push(`/customer/product/${item.product_id}`)" style="width: 100%;height: 100%;object-fit: cover;" />
                  </div>
                  <v-card-text class="target" @click="$router.push(`/customer/product/${item.product_id}`)" style="height: 10px;color: #707070;">{{truncate(item.product_name,16)}}</v-card-text>
                  <v-card-text class="target" @click="$router.push(`/customer/product/${item.product_id}`)">
                    <div class="product_price" style="color: #707070;">{{ '¥' + exprice(item.price) }}</div>
                    <div class="product_rate">
                      <v-layout row wrap align-center>
                        <v-rating
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          v-model="rate"
                          readonly
                          size="13px"
                          half-increments
                        ></v-rating>
                      </v-layout>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-content>
    </v-content>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
middleware: 'auth',
  data() {
    return {
      rate: 5,
      products: [
        {
          title: "陶器01",
          src: "https://ichi-point.jp/wp-content/uploads/2018/11/HR91003.jpg",
          rating: 4.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ゆう工房"
        },
        {
          title: "やばいこけし",
          src: "https://ichi-point.jp/wp-content/uploads/2018/09/KG92006_11.jpg",
          rating: 2.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "サバンナ工房"
        },
        {
          title: "話題の組紐",
          src: "https://ichi-point.jp/wp-content/uploads/2018/07/BS99004_img.jpg",
          rating: 4.9,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "北九州組み紐工房"
        }
      ]
    };
  },
  mounted() {
    this.get_cartdataReq()
  },
  methods:{
    async cartKill(index){
      const userid = this.loginuserdata.user_data.user_id;
      console.log(index)
      const del_data = {
        userid : this.loginuserdata.user_data.user_id,
        product_id : this.getcartdata[index].product_id
      }
      console.log(del_data)
      try{
        await this.del_cart({del_data})
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
      await this.get_cartdataReq();
    },
    async get_cartdataReq(){
      const userid = this.loginuserdata.user_data.user_id;
      try{
        await this.get_cartdata({userid})
      }catch(e){
        console.log( 'エラー発生' + e )
      }
    },
    exprice(val){
      return val.toLocaleString();
    },
    
    // async cart_upreq(){
    //   var p_data = {
    //     product_id : this.$route.params.product
    //   }
    //   console.log(p_data);

    //   try{
    //     await this.getproductdetails({p_data})
    //   }catch(e){
    //     console.log('エラー発生')
    //     console.log(e)
    //   }
    // },

    circleOpen(){
      this.circle = true
      FYU.add("7u5u1lu09a", "fyu_7u5u1lu09a", { nologo: 1 });
    },
    reload() {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
    },
    ...mapActions('products',['getproductdetails']),
    ...mapActions('carts',['get_cartdata','del_cart']),
  },
  computed: {
    ...mapGetters('products',['productdetails']),
    ...mapGetters('carts',['getcartdata','del_result']),
    ...mapGetters(['loginuserdata'])
  }
  // methods:{
  //     cartKill(i){
  //         this.products.splice(i,1)
  //     }
  // }
};
</script>

<style scoped>
#null_cart{
  text-align: center;
  font-size: 1em;
  width:500px;
  margin-left: 300px;
  margin-top: 150px;
}

#null_cart img{
  opacity: 0.3;
}

.target {
  cursor: pointer;
}

.product_img{
  width: 100%;
  height: 200px;
}

.product_rate{
  width: 100%;
  height: 20px;
}

.product_price{
  box-sizing: border-box;
  padding-left: 5px;
}

.item_count{
  padding-left: 10px;
  padding-top: 4px;
  color: #777;
}
</style>