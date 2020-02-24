<template>
      <div id="check_body">
        <h1 style="margin-left:20px;">購入確認</h1>
        <br><hr>
        <div id="box">
          <h2 style="margin-left: 70px;"><v-icon size="20px" color="success">mdi-check-circle</v-icon>購入者情報確認</h2>
          <div id="boss">
            <div class="mboss">
              <h2>購入者</h2>
              <div class="person">
                <p>お電話番号:{{checkdata[0].tel}}</p>
                <p>メールアドレス：{{checkdata[0].mail}}</p>
                <p>合計支払額：{{exprice(goukei)}}円</p>
              </div>
            </div>
            <br>
            <div class="mboss">
              <h2>お届け先情報</h2>
              <div class="person">
                <p>国名：{{checkdata[0].country ? checkdata[0].country:''}}</p>
                <tr>
                  <td>住所：{{checkdata[0].address_01 ? checkdata[0].address_01:''}}</td>
                  <td>{{checkdata[0].address_02 ? checkdata[0].address_02:''}}</td>
                  <td>{{checkdata[0].address_03 ? checkdata[0].address_03:''}}</td>
                  <td>{{checkdata[0].address_04 ? checkdata[0].address_04:''}}</td>
                  <td>{{checkdata[0].address_05 ? checkdata[0].address_05:''}}</td>
                </tr>
              </div>
            </div>
            <br><br>
            <div class="mboss">
              <h2>購入方法</h2>
              <div class="person">
                <p>{{buytype[checkdata[0].buy_type]}}</p>
                <p v-if="checkdata[0].buy_type==1">カード番号：{{checkdata[1].card_num}}</p>
                <p v-if="checkdata[0].buy_type==1">カード有効期限(年)：{{years[checkdata[1].year]}}</p>
                <p v-if="checkdata[0].buy_type==1">カード有効期限(月)：{{months[checkdata[1].month]}}</p>
                <p v-if="checkdata[0].buy_type==1">セキュリティ番号：{{checkdata[1].card_sec}}</p>
              </div>
            </div>
          </div>
          <br>
          <hr>
          <br>
          <div id="item_box0">
            <h2 id="buy_check"><v-icon size="20px" color="success">mdi-check-circle</v-icon>購入商品確認</h2>
              <br>
              <div id="item_box">
                <div class="buy_product" flat v-for="(item, index) in getcartdata" :key="index" >
                  <div class="product_img">
                    <v-lazy-image :src="item.product_img" style="width: 100%;object-fit: cover;height: 100%;vertical-align:bottom"/>
                  </div>
                  <div style="heigh: 150px;" id="moji">
                    <div id="product_name">{{item.product_name}}</div>
                    <div id="product_price">¥{{exprice(item.price)}}</div>
                  </div>
                </div>
              </div>
          </div>
          <hr>
          <div id="btn_box" style="margin-left: 28px;">
            <v-layout row wrap justify-center>
              <v-btn color="success" @click="buyReq" class="btn" depressed>OK</v-btn>
              <v-btn color="grey lighten-3" @click="$router.push('/customer/cart/cartBuy')" style="margin-left: 20px;" class="btn" depressed>キャンセル</v-btn>
            </v-layout>
          </div>
        </div>
      </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
middleware: 'auth',
  mounted() {
    for(var i = 0; i<this.getcartdata.length; i++){
      this.goukei += this.getcartdata[i].price * this.getcartdata[i].count
    }
    console.log(this.goukei)
  },
  data(){
    return{
      buytype :["銀行振り込み","クレジットカード","AmazonPay"],
      years:['20年','21年','22年','23年','24年','25年','26年','27年','28年','29年','30年'],
      months:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      goukei : 0,
    }
  },
  methods: {
    async buyReq(){
      var buydata = [
        {
          name : this.checkdata[0].name,
          tel : this.checkdata[0].tel,
          mail : this.checkdata[0].mail,
          country  : this.checkdata[0].country,
          postalcode : this.checkdata[0].address_01,
          address : this.checkdata[0].address_02 + this.checkdata[0].address_03　+　this.checkdata[0].address_04+this.checkdata[0].address_05,
          buy_type : this.checkdata[0].buy_type,
          total : this.goukei,
        },
        {
          cartdata : this.getcartdata,
        },
        {
          user_data : this.loginuserdata,
        }
      ]
      try{
        await this.insert_buy({buydata})
        await this.buy_mail({buydata})
        if(this.buy_data === 7){
          this.$router.push(`/customer/cart/cartBuy_end`)
        }
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
    },
    exprice(val){
      return val.toLocaleString();
    },

    ...mapActions('buy',['insert_buy']),
    ...mapActions('mail',['buy_mail'])
  },
  computed: {
    ...mapGetters('buy',['checkdata','buy_data']),
    ...mapGetters(['loginuserdata']),
    ...mapGetters('products',['productdetails']),
    ...mapGetters('carts',['getcartdata']),
  }
};
</script>

<style scoped>
  #check_body{
    border: 1.2px solid #ddd;
    width: 1100px;
    height: auto;
    box-sizing: border-box;
    padding: 50px;
    background-color: #fff;
    margin: 20px auto;
  }
  #box{
    padding: 40px 0;
    width:1000px;
  }
  #boss{
    display: flex;
    flex-wrap: wrap;
    width:850px;
    margin-left: 75px;
    border: 1.5px solid #ddd;
    border-radius: 2px;
    margin-bottom: 40px;
  }
  .mboss{
    width: 360px;
    height: 200px;
    padding: 20px;
  }
  .person{
    margin-top: 20px;
  }
  #buy_check{
    margin-left: 75px;
    padding: 0;
  }
  #item_box{
    width: 870px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  #item_box0{
    width: 1000px;
    padding-bottom: 40px;
  }

  .product_img{
    width: 268px;
    height: 268px;
    border-bottom: #989898 solid 3px;
    border: 2px;
  }
  .buy_product{
    width: 270px;
    height: 327.5px;
    margin: 20px 10px 0px 10px ; 
    border: #ddd solid 1px;
    border-radius: 2px;
  }
  #border{
    border: #875008 dotted 1px;
    margin-right:5px;
  }
  #moji{
    font-size: 15px;
    box-sizing: border-box;
    padding: 5px 5px 5px 10px;
  }
  #product_name{
    color: #666;
    margin:2.5px;
  }
  #product_price{
    margin:2.5px;
    color: #666;
    font-size: 12px;
    padding-left: 10px;
  }
  #btn_box{
    width: 100%;
    padding-top: 20px;
    margin-right: 50px;
  }
  .btn{
    width: 100px;
  }
</style>