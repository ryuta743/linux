<template>
  <v-layout row wrap style="">
    
    <dir id="random_body">
      <div id="shopper" @click="shopper_click">
        {{ mall[0] ? mall[0][0].shop_name:'' }}
        <v-layout row wrap>
          <div><img :src="products_data[0] ? products_data[0][0].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[0] ? products_data[0][1].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[0] ? products_data[0][2].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
        </v-layout>      
        <img src="../static/man1.png" alt="行商人" style="width: 100%;object-fit: cover;">
      </div>
      <div id="shopper2" @click="shopper_click">
        {{ mall[1] ? mall[1][0].shop_name:'' }}
        <v-layout row wrap>
          <div><img :src="products_data[1] ? products_data[1][0].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[1] ? products_data[1][1].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[1] ? products_data[1][2].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
        </v-layout> 
        <img src="../static/man2.png" alt="行商人" style="width: 100%;object-fit: cover;">
      </div>
      <div id="shopper3" @click="shopper_click">
        {{ mall[2] ? mall[2][0].shop_name:'' }}
        <v-layout row wrap>
          <div><img :src="products_data[2] ? products_data[2][0].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[2] ? products_data[2][1].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[2] ? products_data[2][2].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
        </v-layout> 
        <img src="../static/man1.png" alt="行商人" style="width: 100%;object-fit: cover;">
      </div>
      <div id="shopper4" @click="shopper_click">
        {{ mall[3] ? mall[3][0].shop_name:'' }}
        <v-layout row wrap>
          <div><img :src="products_data[3] ? products_data[3][0].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[3] ? products_data[3][1].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
          <div><img :src="products_data[3] ? products_data[3][2].product_img:''" alt="商品1" style="width:  100px;height: 100px;object-fit: cover;"></div>
        </v-layout> 
        <img src="../static/man2.png" alt="行商人" style="width: 100%;object-fit: cover;">
      </div>
    </dir>


    <h5 style="width: 100%;text-align: center;" @click="move_shopper">ランダムモール</h5>
    <h4 style="width: 100%;text-align: center;">RANDOM MALL</h4>
    <h4 style="width: 100%;text-align: center;padding-bottom: 10px;">
      <v-btn color="info" style="border-radius: 300px;" @click="get_workshopReq">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </h4>
    <!-- <v-flex xs12 md6 v-for="(item, index) in items" :key="index" @click="$router.push(`/customer/workshop/${item.title}`)"> -->
    <v-flex xs12 md6 v-for="(item, index) in items" :key="index" @click="$router.push(`/customer/workshop/${item.shop_id}`)">
      <v-hover v-slot:default="{ hover }">
        <v-card>
          <v-img :src="item.src" style="width: 100%;height: 100%;object-fit: cover;" />
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out black lighten-4 v-card--reveal display-3 white--text target"
              style="height: 100%;"
            >
              <div>
                <div style="text-align: center;padding-bottom: 5px;font-size: 40px;">{{item.title}}</div>
                <!-- <v-flex xs12 md12 style="font-size: 20px;">{{ item.description }}</v-flex> -->
                <v-layout row wrap justify-center>
                  <v-flex md3 v-for="(product, index) in item.products" :key="index" style="padding: 5px;">
                    <v-card style="padding: 3px;" hover>
                      <v-img :src="product.src" />
                    </v-card>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
  head: {
    script: [
      { src: "https://code.jquery.com/jquery-3.3.1.js" }
    ],
  },
  async mounted() {
    this.move_shopper();
    console.log(this.mall)
  },
  data() {
    return {
      items: [
        {
          shop_id: null,
          title: null,
          // title: "宮崎ガラス細工",
          src: "https://picsum.photos/500/300?random=3",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        },
        {
          shop_id: null,
          title: null,
          src: "https://picsum.photos/500/300?random=3",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        },
        {
          shop_id: null,
          title: null,
          src: "https://picsum.photos/500/300?random=3",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        },
        {
          shop_id: null,
          title: null,
          src: "https://picsum.photos/500/300?random=4",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        }
      ]
    };
  },
  methods:{
    async get_workshopReq(){
      try{
        await this.shop_count()
        console.log(this.shop_countdata.count_data)
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
      var random_id = []
      for(var i=0; i<4;){
        var min = 1 ;
        var max = this.shop_countdata.count_data;
        var randam = Math.floor( Math.random() * (max + 1 - min) ) + min ;
        if(random_id.indexOf(randam) === -1){
          random_id.push(randam)
          i++
        }
      }
      try{
        await this.mall_init()
        await this.products_list_init()
        await this.random_mall({random_id})
        console.log(this.mall)
        await this.products_list({random_id})
        console.log(this.products_data)
        for(var c=0; c<4; c++){
          this.items[c].shop_id = this.mall[c][0].shop_id
          this.items[c].title = this.mall[c][0].shop_name
          this.items[c].src = this.mall[c][0].shop_img
          this.items[c].description = this.mall[c][0].shop_description
          console.log(this.items[c].title)
          for(var z=0; z<3; z++){
            this.items[c].products[z] = this.products_data[c][z].product_img
            console.log(this.items[c].products[z])
          }
        }
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
    },
    shopper_click(){
      alert('商品がクリックされました')
    },
    async move_shopper(){
      await this.get_workshopReq();
      $('#shopper').css({'left':'-300px'});
      $('#shopper2').css({'right':'-300px'});
      $('#shopper3').css({'left':'-2000px'});
      $('#shopper4').css({'right':'-2300px'});

      $('#shopper').animate({'left':'2000px'},13000);
      $('#shopper2').animate({'right':'2000px'},16000);
      $('#shopper3').animate({'left':'2000px'},24000);
      $('#shopper4').animate({'right':'2000px'},24000);
      setTimeout(this.move_shopper,26000);
    },
    ...mapActions('work_shop',['random_mall','mall_init','shop_count']),
    ...mapActions('products',['products_list','products_list_init']),
  },
  computed:{
    ...mapGetters('work_shop',['mall','shop_countdata']),
    ...mapGetters('products',['products_data']),
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  top: 0;
  bottom: 0;
  justify-content: center;
  opacity: 0.99;
  position: absolute;
  width: 100%;
}

.target {
  cursor: pointer;
}

.reload {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

#random_body{
  position: relative;
  width: 100%;
  height: 80vh;
}

#shopper{
  position: absolute;
  left: -300px;
  top: 10px;
  width: 300px;
  height: 400px;
}

#shopper2{
  position: absolute;
  right: -300px;
  bottom: 0px;
  width: 300px;
  height: 400px;
  z-index: 1;
}

#shopper3{
  position: absolute;
  right: -2000px;
  top: 20px;
  width: 300px;
  height: 400px;
  z-index: 0;
}

#shopper4{
  position: absolute;
  right: -2300px;
  bottom: 0px;
  width: 300px;
  height: 400px;
}

</style>