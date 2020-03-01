<template>
  <v-layout row wrap id="shop_body">

    <!-- <div id="bread_list">  --><!-- パンくずリスト -->
      <!-- <div class="bread"><v-icon>mdi-home</v-icon>トップ</div>
      <div class="bread">></div>
      <div class="bread">ショップ</div>
    </div> -->

    <v-container grid-list-xs>
      <v-content style="padding-top: 15px;border-radius: 4px;">
        <h4 style="width: 100%;text-align: center;">ADVANCED SEARCH</h4>

        <v-layout row wrap justify-center style="padding-top: 10px;">
          <v-flex xs12 md6>
            <form @submit.prevent>
              <v-layout row wrap>
                <v-text-field outlined label="keywords" v-model="select_data" color="grey" background-color="#fff"></v-text-field>
                <v-btn type="submit" color="grey" style="height: 55px;" @click="get_select" depressed>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-layout>
            </form>
          </v-flex>
          <div id="advance">
                <label>target:</label>
                <select v-model="selected" id="search_select">
                  <option disabled value="">unselect</option>
                  <option value="0">products</option>
                  <option value="1">workshops</option>
                  <option value="2">tag</option>
                </select>
                <label style="margin-left: 40px;">order(products):</label>
                <select v-model="howdisp_p" id="search_select">
                  <option disabled value="">unselect</option>
                  <option value="0">low price</option>
                  <option value="1">high rate</option>
                </select>
                <label style="margin-left: 40px;">order(workshops):</label>
                <select v-model="howdisp_w" id="search_select">
                  <option disabled value="">unselect</option>
                  <option value="0">newer</option>
                  <option value="1">high rate</option>
                </select>
            </div>
        </v-layout>

        <v-divider style="margin-top: 15px;"></v-divider>
      </v-content>
      <v-content>

        <v-layout row wrap id="products">
          
            <div id="products_header">
                <div id="search_word">{{ search_word ? search_word:'New Products' }}</div>
                <div id="search_count" v-if="selected==1">{{ '-Hit:' + counter }}</div>
                <div id="search_count" v-else>{{ '-Hit:' + counter }}</div>
            </div>

            <v-card id="product" @click="$router.push(`/en/customer/product/${item.product_id}`)" flat v-for="(item, index) in data" :key="index">
              <div id="product_img">
                <v-lazy-image :src="item.product_img" style="width: 100%;object-fit: cover;height: 100%;vertical-align:bottom"/>
              </div>
              <v-card-text style="heigh: 150px;">
                <div id="product_name">{{truncate(item.product_name_en,25)}}</div>
                <div id="product_price">¥{{exprice(item.price)}}</div>
                <div id="product_rate">
                  <v-rating
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      v-model="item.rate"
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
                      v-model="data.review"
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
  layout: 'default_en',
  head() {
    return {
      title: 'SHOP'
    }
  },
  async mounted() {
    await this.get_newproductReq()
  },
  data() {
    return {

      selected: '',

      howdisp_p: '',

      howdisp_w: '',

      select_data: '',

      search_word: '',

      rate: 12,

      counter: 0,

    };
  },

  methods:{
    async get_select(){
      if(this.selected == ''){
        alert('項目を選択してください')
      }else{
        if(this.selected == 0){
        var payload = {
          product : this.select_data,
        }
        try{
          await this.workshop_del()
          await this.select_product({payload});
          this.search_word = this.select_data;
          if(this.data == 0){
            this.counter = 0
          }else{
            this.counter = this.data.length
          }
        }catch(e){
          console.log('エラー発生'),
          console.log(e)
        }
      }else if(this.selected == 1){
        var payload = {
          work_shop : this.select_data,
        }
        try{
          await this.data_del()
          await this.search_workshop({payload});
          this.search_word = this.select_data;
          if(this.shop_name == 0){
            this.counter = 0
          }else{
            this.counter = this.shop_name.length
          }
          
        }catch(e){
          console.log('エラー発生'),
          console.log(e)
        }
      }else if(this.selected == 2){
        var payload = {
          tags: this.select_data
        }
        console.log(payload.tags)
        try{
          await this.workshop_del()
          await this.search_tags({payload});
          this.search_word = this.select_data;
          if(this.data == 0){
            this.counter = 0
          }else{
            this.counter = this.data.length
          }
        }catch(e){
          console.log('エラー発生'),
          console.log(e)
        }
      }
    }
    },
    async get_newproductReq(){
      await this.get_newproduct();
      console.log(this.data)
      this.counter = this.data.length
    },
    exprice(val){
      return val.toLocaleString();
    },

    ...mapActions('products',['select_product','get_newproduct','search_tags','data_del']),
    ...mapActions('work_shop',['search_workshop','workshop_del'])
  },

  computed:{
    ...mapGetters('products',['data','tags_results']),
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