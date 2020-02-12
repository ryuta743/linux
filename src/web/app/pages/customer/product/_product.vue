<template>
  <v-layout row wrap id="product_body">
    <div id="bread_list"> <!-- パンくずリスト -->
      <div class="bread"><v-icon>mdi-home</v-icon>トップ</div>
      <div class="bread">></div>
      <div class="bread">ショップ</div>
      <div class="bread">></div>
      <div class="bread">工房名</div>
    </div>
    
    <div id="product_infos">
      <div id="product_img">
        <v-lazy-image style="width: 100%;object-fit: cover;height: 500px;vertical-align:bottom" :src="productdetails.product_img" />
        <div id="circle_body">
          <v-btn color="info" dark outlined style="width: 100%;height: 100px;" @click="circleOpen">
            <v-icon>mdi-flattr</v-icon>360°
          </v-btn>
        </div>
      </div>
      <div id="product_details">
        <div id="product_titles">
          <div id="product_title">{{productdetails ? productdetails.product_name:''}}</div>
          <div id="product_rate">
            <v-rating
                color="yellow darken-3"
                background-color="grey darken-1"
                v-model="item.rating"
                readonly
                half-increments
            ></v-rating>
            <p>(12)</p>
          </div>
        </div>
        <div id="product_description">
          {{ productdetails ? productdetails.product_detail:'' }}
        </div>
        <div id="product_tags">
          <div class="product_tag">甲冑</div>
          <div class="product_tag">重い</div>
        </div>
        <div id="product_price">
          {{ productdetails.price ? exprice(productdetails.price):'' }} 円 <span>(税抜)</span>
          <div id="product_favo">
            <v-hover v-slot:default="{ hover }">
              <v-btn :color="hover ? '#F8CE38':'grey'" icon>
                <!-- <v-btn color="red" icon> -->
                <v-icon x-large>mdi-star-circle-outline</v-icon>
              </v-btn>
            </v-hover>
          </div>
        </div>
        <div id="product_ui">
          <div id="product_selector">
            <div>在庫 <span>{{ productdetails ? productdetails.stock + '個':'' }}</span></div>
            <div>数量 
              <span>
                <select v-model="count">
                  <option :value="item" v-for="(item, index) in stock" :key="index">{{ item + '個' }}</option>
                </select>
              </span>
            </div>
          </div>
          <div style="width:55%;">
            <v-btn color="success" style="width: 100%;height: 50px;" depressed　@click="cart_upreq">カートに入れる</v-btn>
          </div>
        </div>
        <div id="workshop_info">
          <div id="workshop_img">
            <v-lazy-image style="width: 100%;object-fit: cover;height: 80px;vertical-align:bottom" :src=workshop_data.shop_img />
          </div>
          <div id="workshop_titles">
            <div id="workshop_title">{{ workshop_data.shop_name }}</div>
            <div id="workshop_description">{{ workshop_data.shop_description }}</div>
          </div>
          <div id="workshop_favo">
            <v-hover v-slot:default="{ hover }">
              <v-btn :color="hover ? 'red':'grey'" icon>
                <!-- <v-btn color="red" icon> -->
                <v-icon x-large>mdi-shield-star</v-icon>
              </v-btn>
            </v-hover>
          </div>
        </div>
      </div>
    </div>

    <div id="any_info">
      <div id="info_table">
        <div style="font-size: 22px;margin-bottom: 15px;">商品の情報</div>
        <table>
          <tr>
            <td class="th">サイズ</td>
            <td>{{ productdetails ? productdetails.size:'' }}</td>
          </tr>
          <tr>
            <td class="th">素材</td>
            <td>{{ productdetails ? productdetails.material:'' }}</td>
          </tr>
          <tr>
            <td class="th">重量</td>
            <td>{{ productdetails ? productdetails.weight:'' }}</td>
          </tr>
          <tr>
            <td class="th">評価</td>
            <td>
              <v-rating
                color="yellow darken-3"
                background-color="grey darken-1"
                v-model="item.rating"
                readonly
                half-increments
                size="14px"
              ></v-rating>
            </td>
          </tr>
        </table>
      </div>
      <div id="any_search">
        <div style="font-size: 22px;margin-bottom: 15px;">他の商品を探す</div>
        <div id="workshop_btn">
          <v-btn @click="$router.push(`/customer/workshop/${workshop_data.shop_id}`)" color="#DC3739" style="color: white;width: 65%;height: 65px;font-size: 20px;" class="sawarabi" depressed>同じ工房の商品を見る</v-btn>
        </div>
        <div id="tag_search_title" class="sawarabi">タグで探す</div>
        <div id="search_tags">
          <div class="search_tag">甲冑</div>
          <div class="search_tag">重い</div>
        </div>
      </div>
    </div>

    <div id="reviews">
      <v-card flat>
        <v-divider></v-divider>
        <v-card-text>
          <v-subheader>この商品を評価する</v-subheader>
          <v-rating></v-rating>
          <v-layout row wrap justify-center>
            <v-flex xs9 md11>
              <v-text-field label placeholder="商品レビュー" outlined></v-text-field>
            </v-flex>
            <v-flex xs2 md1>
              <v-btn color="success" style="height: 55px;width: 100%;">送信</v-btn>
            </v-flex>
          </v-layout>
          <v-divider />
        </v-card-text>
        <v-card-text v-for="(item, index) in reviews" :key="index">
          {{item.name}}
          <v-layout row wrap align-center>
            <v-rating
              v-model="item.rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              readonly
              size="19px"
            />
            ({{item.rating}})
          </v-layout>
          {{item.review}}
          <v-divider style="margin-top: 5px;"></v-divider>
        </v-card-text>
      </v-card>

      <v-dialog v-model="circle" persistent :overlay="false" transition="dialog-transition">
        <v-card style="background-color: #999;">
          <v-layout row wrap align-center>
            <v-flex xs12 md3>
              <v-card-text style="background-color: #999;">
                <div id="fyu_7u5u1lu09a" class="fyu_container fyu_vertical"></div>
              </v-card-text>
            </v-flex>
            <v-flex xs12 md9 style="background-color: #999;">
              <v-card-text style="text-align: center;background-color: #999;color: white;">
                <v-icon color="primary" size="50px">mdi-flattr</v-icon>
              </v-card-text>
              <v-card-text style="color: #555;font-size: 28px;text-align: center;color: white;background-color: #999;">
                ドラッグで写真を回してください!<br>
                Drag to rotate the photo!
              </v-card-text>
              <v-card-text style="color: #555;font-size: 28px;text-align: center;color: white;background-color: #999;">
                <v-btn color="info" @click="reload">close</v-btn>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </div>
  </v-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
  head() {
    return {
      script: [{ src: "https://fyu.se/embed?v=2.0" }]
    };
  },

  async mounted() {
    await this.getproductdetailreq();
    console.log(this.productdetails.shop_id)
    this.getShopdata({wsid:this.productdetails.shop_id})
    console.log(this.workshop_data)
    for(var i = 0; i<this.productdetails.stock ; i++){
      this.stock.push(i+1);
    }
    await this.getcartdataReq();
  },

  data() {
    return {
      selectItem: 0,
      circle: false,
      stock: [],
      count: 1,
      item: {
        title: "",
        rating: 4.5,
        tags: ["陶器", "食卓"],
        description: "とてもいい品です",
        creater: "ゆう工房"
      },
      reviews: [
        {
          name: "寺田神",
          review: "この商品を買ったその日から、僕の人生は変わりました。",
          rating: 5.0
        },
        {
          name: "寺田神アンチ",
          review: "とてもいい",
          rating: 4.0
        }
      ]
    };
  },
  methods:{
    async getcartdataReq(){
      await this.get_cartdata({userid:this.loginuserdata.user_data.user_id});
    },

    async getproductdetailreq(){
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

    async cart_upreq(){
      var num
      for(var i=0 ; i<this.getcartdata.length ; i++){
        console.log(i)
        console.log(this.getcartdata[i].product_id)
        console.log(this.$route.params.product)
        if(this.getcartdata[i].product_id==this.$route.params.product){
          num = i
          break;
        }
      }

      if(num == null){
        var payload = {
          product_id : this.$route.params.product,
          user_id : this.loginuserdata.user_data.user_id,
          count: this.count
        }
        console.log(payload);
        try{
          await this.cart_upload({payload})
          await this.getcartdataReq()
          alert('カート追加完了です');
        }catch(e){
          console.log('エラー発生')
          console.log(e)
        }
      }else{
        var data = {
          upd_obj : this.getcartdata[num],
          count : this.count
        }
        console.log(data.upd_obj)
        try{
          await this.upd_cart({data})
          await this.getcartdataReq()
          alert('カート追加完了しました')
        }catch(e){
          console.log('エラー発生')
          console.log(e)
        }
      }
    },


    circleOpen(){
      this.circle = true
      FYU.add("7u5u1lu09a", "fyu_7u5u1lu09a", { nologo: 1 });
    },
    reload() {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
    },
    exprice(val){
      return val.toLocaleString();
    },
    ...mapActions('products',['getproductdetails']),
    ...mapActions('workshop_manage',['getShopdata']),
    ...mapActions('carts',['cart_upload','get_cartdata','upd_cart'])
  },
  computed: {
    ...mapGetters('products',['productdetails']),
    ...mapGetters('carts',['cart_data','getcartdata','updata_data']),
    ...mapGetters('workshop_manage',['workshop_data']),
    ...mapGetters(['loginuserdata'])
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

a {
  text-decoration: none;
}

#product_body{
  width: 1100px;
  margin: 0 auto;
}

#product_infos{
  width: 100%;
  height: 620px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 3px;
  overflow: hidden;
}

#product_img{
  width: 500px;
  height: 600px;
}

#circle_body{
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  width: 100%;
  height: 120px;
  background-color: #ffffff;
}

#product_details{
  box-sizing: border-box;
  padding:0px 20px;
  width: 600px;
  height: 620px;
  background-color: #ffffff;
}

#product_titles{
  display: flex;
  width: 100%;
  height: 110px;
}

#product_title{
  display: flex;
  box-sizing: border-box;
  padding-left: 30px;
  font-size: 30px;
  align-items: center;
  width: 50%;
  height: 110px;
  white-space: nowrap
}

#product_rate{
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
  align-items: center;
  width: 50%;
  height: 110px;
  font-size: 11px;
}

#product_rate p{
  margin-top: 23px;
}

#product_description{
  width: 100%;
  height: 150px;
  color: #444444;
}

#product_tags{
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  border-bottom: 1.2px solid #999999;
}

.product_tag{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 20px;
  margin: 0 10px 15px 10px;
  background-color: #e1e1e1;
  border-radius: 2px;
  font-size: 12px;
}

#product_price{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100px;
  font-size: 30px;
}

#product_price span{
  font-size: 12px;
  padding-top: 10px;
  margin-left: 10px;
}

#product_favo{
  width: 60%;
  box-sizing: border-box;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
}

#product_ui{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 40px;
  width: 100%;
  height: 100px;
}

#product_selector{
  box-sizing: border-box;
  padding-top: 25px;
  font-size: 14px;
  color: #333333;
  width: 55%;
  height: 100px;
}

#workshop_info{
  display: flex;
  box-sizing: border-box;
  padding: 10px 20px 10px 20px;
  width: 100%;
  height: 100px;
  background-color: #F1F1F1;
  border-radius: 3px;
}

#product_selector span{
  margin-left: 10px;
}

#workshop_img{
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 300px;
  overflow: hidden;
}

#workshop_titles{
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 10px;
  width: 350px;
  height: 80px;
}

#workshop_title{
  font-size: 22px;
  letter-spacing: 3px;
}

#workshop_description{
  font-size: 14px;
  color: #444444;
}

#workshop_favo{
  display: flex;
  justify-content: flex-end;
  width: 100px;
  height: 80px;
}

#any_info{
  padding-top: 80px;
  display: flex;
  width: 100%;
  height: 350px;
  background-color: #ffffff
}

#info_table{
  margin-left: 10px;
  width: 45%;
}

#info_table table{
}

#info_table td{
  font-size: 13px;
  width: 300px;
  height: 10px;
  padding: 8px 0 8px 15px;
  border: 1px solid #e8e8e8;
  border-width: 1px 0 1px 0;
  box-sizing: border-box;
  background-color: #ffffff;
}

#info_table td.th{
  width: 200px;
  border: 1px solid #e8e8e8;
  border-width: 1px 0 1px 0;
  background-color: #f9f9f9;
}

#any_search{
  box-sizing: border-box;
  padding-left: 40px;
  width: 50%;
  height: 350px;
}

#workshop_btn{
  width: 100%;
  display: flex;
  justify-content: center;
}

#tag_search_title{
  width: 100%;
  padding-top: 30px;
  padding-left: 70px;
}

#search_tags{
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-left: 90px;
}

.search_tag{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 40px;
  margin: 0 40px 15px 10px;
  background-color: #e1e1e1;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
}

#reviews{
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  background-color: #ffffff;
}

.v-lazy-image {
  opacity: 0;
  transition: opacity 0.4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}

</style>