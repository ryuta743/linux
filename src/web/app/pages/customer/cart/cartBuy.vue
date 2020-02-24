<template>
  <v-container grid-list-xs>
    <v-content>
      <v-card id="v-card">
        <v-card-title primary-title>購入必要情報入力</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div id="form_card">
            <h3 id="field_title">お名前</h3>
            <v-layout row wrap>
              <v-flex xs12 md30>
                <v-text-field id="v-text" label="name" outlined v-model="name" ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- <v-divider style="padding-bottom: 10px;"></v-divider> -->
            <br>
            <h3 id="field_title">連絡先</h3>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="電話番号" outlined v-model="tel"></v-text-field>
            </v-flex>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label=mail outlined v-model="mail"></v-text-field>
            </v-flex>
            <!-- <v-divider style="padding-bottom: 10px;"></v-divider> -->
            <br />
            <h3 id="field_title">国名・郵便番号</h3>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="国名" outlined v-model="country"></v-text-field>
            </v-flex>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="郵便番号" type="address" outlined v-model="address_01"></v-text-field>
            </v-flex>
            <h3 id="field_title">住所</h3> 
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="都道府県" outlined v-model="address_02"></v-text-field>
            </v-flex>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="市区町村" outlined v-model="address_03"></v-text-field>
            </v-flex>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="番地" outlined v-model="address_04"></v-text-field>
            </v-flex>
            <v-flex xs12 md30>
              <v-text-field id="v-text" label="建物名・部屋番号" outlined v-model="address_05"></v-text-field>
            </v-flex>
            <!-- <v-divider style="padding-bottom: 10px;"></v-divider> -->
            <br>
            <h3 id="field_title">購入情報</h3><br>
            <v-flex xs12 md8>
              <v-select outlined :items="moneys" label="お支払い方法" item-text="label" item-value="value" v-model="buy_type"></v-select>
            </v-flex>
            <div v-if="buy_type==1">
              <v-layout row wrap>
                <v-flex xs12 md8>
                  <v-text-field id="v-text" label="カード番号(半角)" outlined v-model="card_num"></v-text-field>
                  <v-select outlined :items="years" label="カード有効期限(年)" item-text="label" item-value="value" v-model="year"></v-select>
                  <v-select outlined :items="months" label="カード有効期限(月)" item-text="label" item-value="value" v-model="month"></v-select> 
                  <v-text-field id="v-text" label="セキュリティコード(カード背面の4桁か3桁の番号)" outlined v-model="card_sec"></v-text-field>
                </v-flex>
              </v-layout>    
            </div>
            <!-- <v-divider style="padding-bottom: 10px;"></v-divider> -->
            <v-layout row wrap justify-center>
              <v-flex xs6 md3>
                <v-btn id="v-btn" color="success" style="margin-right: 10px;" @click="buycheckreq" depressed>確認</v-btn>
                <!-- <v-btn color="success" style="width: 100%;" @click="$router.push('/customer/cart/complete')">確認</v-btn> -->
              </v-flex>
              <v-flex xs6 md3>
                <v-btn id="v-btn" color="grey lighten-3" style="width: 100" @click="$router.push('/customer/cart/cart')" depressed>キャンセル</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
middleware: 'auth',
  mounted(){
    console.log(this.loginuserdata.user_data.user_mail)
    this.mail = this.loginuserdata.user_data.user_mail
    this.name = this.loginuserdata.user_data.user_name
  },
  data(){
    return{
      name: '',
      tel: '',
      mail: '',
      country: '',
      address_01: '',
      address_02: '',
      address_03: '',
      address_04: '',
      address_05: '',
      moneys: [
        {label: "銀行振り込み" , value:0},
        {label: "クレジットカード" , value:1},
        {label: "AmazonPay" , value:2}
      ],
      buy_type: null,

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
      month: null,
      card_sec: null,
    };
  },
  methods: {
    buycheckreq(){
      const buy_data = [
        {
          name : this.name,
          tel : this.tel,
          mail : this.mail,
          country : this.country,
          address_01 : this.address_01,
          address_02 : this.address_02,
          address_03 : this.address_03,
          address_04 : this.address_04,
          address_05 : this.address_05,
          buy_type : this.buy_type,
        },
        {
          card_num : this.card_num,
          year : this.year,
          month : this.month,
          card_sec : this.card_sec
        }
      ]
      try{
        this.buycheck({buy_data});
      }catch(e){
        console.log('エラー発生'),
        console.log(e)
      }
      this.$router.push(`/customer/cart/cartBuycheck_02`)
    },
    ...mapActions('buy',['buycheck'])
  },
  computed: {
    ...mapGetters('buy',['checkdata','creditdata']),
    ...mapGetters('cart',['get_cartdata']),
    ...mapGetters(['loginuserdata'])
  },
};
</script>

<style scoped>
  #v-card{
    width: 800px;
    margin: 0 auto;
  }

  #field_title{
    padding-bottom: 5px;
  }
  
  #form_card{
    width:500px;
    margin: 0 auto;
  }

  #v-btn{
    width: 80%;
  }
</style>