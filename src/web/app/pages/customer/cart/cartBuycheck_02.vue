<template>
  <v-container grid-list-xs>
    <v-content style="height: 100vh;">
      <v-card>
        <v-card-text>
          <v-icon size="20px" color="success">mdi-check-circle</v-icon>
          <div>
            <h2>購入者情報</h2>
            <!-- <p>購入者名：{{checkdata[0].sei}}{{checkdata[0].mei}}</p> -->
            <p>お電話番号:{{checkdata[0].tel}}</p>
            <p>メールアドレス：{{checkdata[0].mail}}</p>
            <p>合計金額：:{{goukei}}円</p>
            <br>
            <h2>お届け先情報</h2>
            <tr>
              <td>{{checkdata[0].country}}</td>
              <td>{{checkdata[0].address_01}}</td>
              <td>{{checkdata[0].address_02}}</td>
              <td>{{checkdata[0].address_03}}</td>
              <td>{{checkdata[0].address_04}}</td>
              <td>{{checkdata[0].address_05}}</td>
            </tr>
            <br><br>
            <h2>購入情報</h2>
            <p>{{buytype[checkdata[0].buy_type]}}</p>
            <p v-if="checkdata[0].buy_type==1">カード番号:{{checkdata[1].card_num}}</p>
            <p v-if="checkdata[0].buy_type==1">カード有効期限(年):{{years[checkdata[1].year]}}</p>
            <p v-if="checkdata[0].buy_type==1">カード有効期限(月):{{months[checkdata[1].month]}}</p>
            <p v-if="checkdata[0].buy_type==1">セキュリティ番号:{{checkdata[1].card_sec}}</p>
          </div>
          <hr>
          <br>
          <div>
            <h1>購入商品確認</h1>
          </div>
          <br>
          <hr>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-end>
            <v-btn color="success" @click="buyReq">OK</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
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
          // name : this.checkdata[0].sei + this.checkdata[0].mei,
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
        if(this.buy_data === 7){
          this.$router.push(`/customer/cart/cartBuy_end`)
        }
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
    },

    ...mapActions('buy',['insert_buy'])
  },
  computed: {
    ...mapGetters('buy',['checkdata','buy_data']),
    ...mapGetters(['loginuserdata']),
    ...mapGetters('products',['productdetails']),
    ...mapGetters('carts',['getcartdata']),
  }
};
</script>

<style>
</style>