<template>
  <v-container grid-list-xs>
    <v-content>
      <v-card>
        <v-card-title primary-title>購入必要情報入力</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h3>名前</h3>
          <v-layout row wrap>
            <v-text-field label="姓" outlined v-model="sei"></v-text-field>
            <v-text-field label="名" outlined v-model="mei"></v-text-field>
          </v-layout>
          <v-divider style="padding-bottom: 10px;"></v-divider>
          <h3>住所</h3>
          <v-flex xs12 md4>
            <v-text-field label="国名" outlined v-model="country"></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field label="郵便番号" type="address" outlined v-model="address_01"></v-text-field>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-text-field label="都道府県" outlined v-model="address_02"></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field label="市区町村" outlined v-model="address_03"></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field label="番地" outlined v-model="address_04"></v-text-field>
            </v-flex>
          </v-layout>
          <v-flex xs12 md6>
            <v-text-field label="建物名・部屋番号" outlined v-model="address_05"></v-text-field>
          </v-flex>
          <v-divider style="padding-bottom: 10px;"></v-divider>
          <v-select outlined :items="money" label="お支払い方法" v-model="buy_type"></v-select>
          <v-divider style="padding-bottom: 10px;"></v-divider>
          <v-layout row wrap>
            <v-flex xs6 md1>
              <v-btn color="success" style="width: 100%;" @click="$router.push('/customer/cart/complete')">確認</v-btn>
            </v-flex>
            <v-flex xs6 md1>
              <v-btn color="grey lighten-3" style="width: 100%;" @click="$router.push('/customer/cart/cart')">キャンセル</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      sei: '',
      mei: '',
      country: '',
      address_01: '',
      address_02: '',
      address_03: '',
      address_04: '',
      address_05: '',
      money: ["銀行振り込み","クレジットカード","Amazon pay"],
    };
  },
  methods: {

  },
  computed: {},
};
</script>

<style>
</style>