<template>
  <v-container grid-list-xs style="min-height: 100vh;">
    <v-content>
      <v-content>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 md10>
              <v-card-title primary-title>
                <v-icon>mdi-cart</v-icon>カート
              </v-card-title>
            </v-flex>
            <v-flex xs12 md2>
              <v-card-title primary-title><v-btn color="success" style="width: 100%;" @click="$router.push('/customer/cart/cartBuy')">カート内商品を購入</v-btn></v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-card-text style="min-height: 80vh;">
            <v-layout row wrap>
              <v-flex
                xs12
                md4
                v-for="(item, index) in products"
                :key="index"
                style="padding: 0 10px 20px 10px;"
              >
                <v-card>
                  <v-card-text>
                    <v-btn color="error" outlined @click="cartKill(index)"><v-icon hover color="red">mdi-close</v-icon></v-btn>
                  </v-card-text>
                  <v-img :src="item.src" class="target" @click="$router.push(`/customer/product/${item.title}`)"></v-img>
                  <v-card-text class="target" @click="$router.push(`/customer/product/${item.title}`)" style="font-weight: bold;height: 10px;">{{item.title}}</v-card-text>
                  <v-card-text class="target" style="height : 10px;" @click="$router.push(`/customer/product/${item.title}`)">
                    <v-layout row wrap align-center>
                      <v-rating
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        v-model="item.rating"
                        readonly
                        size="19px"
                        half-increments
                      ></v-rating>
                      ({{item.rating}})
                    </v-layout>
                  </v-card-text>
                  <v-card-text>
                    <nuxt-link :to="`customer/workshop/${item.creater}`">{{item.creater}}</nuxt-link>
                  </v-card-text>
                  <v-card-text style="height: 8px;">¥{{item.price}}</v-card-text>
                  <v-card-text>
                    <v-chip
                      class="ma-2"
                      color="primary"
                      label
                      text-color="white"
                      v-for="(item, index) in item.tags"
                      :key="index"
                    >
                      <v-icon left>mdi-label</v-icon>
                      {{item}}
                    </v-chip>
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
  data() {
    return {
      products: [
        {
          title: "陶器01",
          src: "https://picsum.photos/id/11/500/300",
          rating: 4.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ゆう工房"
        },
        {
          title: "やばいこけし",
          src: "https://picsum.photos/id/11/500/300",
          rating: 2.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "サバンナ工房"
        },
        {
          title: "話題の組紐",
          src: "https://picsum.photos/id/11/500/300",
          rating: 4.9,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "北九州組み紐工房"
        }
      ]
    };
  },
  mounted() {
    this.cart_upreq()
  },
  methods:{
    
    async cart_upreq(){
      var p_data = {
        product_id : this.$route.params.product
      }
      console.log(p_data);

      try{
        await this.getproductdetails({p_data})
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
    },

    circleOpen(){
      this.circle = true
      FYU.add("7u5u1lu09a", "fyu_7u5u1lu09a", { nologo: 1 });
    },
    reload() {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
    },
    ...mapActions('products',['getproductdetails']),
    ...mapActions([])
  },
  computed: {
    ...mapGetters('products',['productdetails']),
    ...mapGetters(['loginuserdata'])
  }
  // methods:{
  //     cartKill(i){
  //         this.products.splice(i,1)
  //     }
  // }
};
</script>

<style>
.target {
  cursor: pointer;
}
</style>