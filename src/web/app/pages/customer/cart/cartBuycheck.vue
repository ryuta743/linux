<template>
  <v-container grid-list-xs>
    <v-content style="height: 100vh;">
      <v-card>
        <v-card-text>
          <v-icon size="20px" color="success">mdi-check-circle</v-icon>
          <div>
            <td>{{checkdata.sei}}</td>
            <td>{{checkdata.mei}}</td>
            <td>{{checkdata.country}}</td>
            <td>{{checkdata.address_01}}</td>
            <td>{{checkdata.address_02}}</td>
            <td>{{checkdata.address_03}}</td>
            <td>{{checkdata.address_04}}</td>
            <td>{{checkdata.address_05}}</td>
            <td>{{buytype[checkdata.buy_type]}}</td>
            <v-layout row wrap v-if="checkdata.buy_type==1">
              <v-text-field label="カード番号(半角)" outlined v-model="card_num"></v-text-field>
              <v-select outlined :items="years" label="カード有効期限(年)" item-text="label" item-value="value" v-model="year"></v-select>
              <v-select outlined :items="months" label="カード有効期限(月)" item-text="label" item-value="value" v-model="month"></v-select> 
              <v-text-field label="セキュリティコード(カード背面の4桁か3桁の番号)" outlined v-model="card_sec"></v-text-field>
            </v-layout>    
          </div>
          <hr>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-end>
            <v-btn color="success" @click="increditdata">OK</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
middleware: 'auth',
  data(){
    return{
      buytype :["銀行振り込み","クレジットカード","AmazonPay"],
      card_num: null,
      years: [
        {label: "20年" , value:0},
        {label: "21年" , value:1},
        {label: "22年" , value:2},
        {label: "23年" , value:3},
        {label: "24年" , value:4},
        {label: "25年" , value:5},
        {label: "26年" , value:6},
        {label: "27年" , value:7},
        {label: "28年" , value:8},
        {label: "29年" , value:9},
        {label: "30年" , value:10},
      ],
      year: null,
      months: [
        {label: "1月" , value:0},
        {label: "2月" , value:1},
        {label: "3月" , value:2},
        {label: "4月" , value:3},
        {label: "5月" , value:4},
        {label: "6月" , value:5},
        {label: "7月" , value:6},
        {label: "8月" , value:7},
        {label: "9月" , value:8},
        {label: "10月" , value:9},
        {label: "11月" , value:10},
        {label: "12月" , value:11},
      ],
      month: 0,
      card_sec: 0,
    }
  },
  // mounted() {
  //   var payload = {
  //       product_id : this.$route.params.product,
  //       user_id : this.loginuserdata.user_data.user_id,
  //       count: this.count
  //     }
  //     console.log(payload);
  //     // try{
  //     //   await this.cart_upload({payload})
  //     // }catch(e){
  //     //   console.log('エラー発生')
  //     //   console.log(e)
  //     // }
  // },
  methods: {
    increditdata(){
      const credit_data = {
        cardnum : this.card_num,
        year : this.year,
        month : this.month,
        cardsec : this.card_sec
      }
       try{
        this.buycheck2({credit_data});
      }catch(e){
        console.log('エラー発生'),
        console.log(e)
      }
      this.$router.push(`/customer/cart/cartBuycheck_02`)
    },

    ...mapActions('buy',['buycheck2'])
  },
  computed: {
    ...mapGetters('buy',['checkdata','creditdata']),
    ...mapGetters(['loginuserdata']),
    ...mapGetters('products',['productdetails'])
  }
};
</script>

<style>
</style>