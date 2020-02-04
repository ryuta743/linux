<template>
  <v-container grid-list-xs>
    <v-content style="height: 100vh;">
      <v-card>
        <v-card-text>
          <v-icon size="20px" color="success">mdi-check-circle</v-icon>
          <!-- <div>
            <p>購入者情報</p>
            <tr>
              <td>{{checkdata.buy_userdata.sei}}</td>
              <td>{{checkdata.buy_userdata.mei}}　</td>
              <td>{{check.data.buy_userdata.tel}}</td>
              <td>{{checkdtaa.buy_userdata.mail}}</td> 
            </tr>
            <p>お届け先情報：</p>
            <tr>
              <td>{{checkdata.buy_userdata.country}}　</td>
              <td>{{checkdata.buy_userdata.address_01}}</td>
              <td>{{checkdata.buy_userdata.address_02}}</td>
              <td>{{checkdata.buy_userdata.address_03}}</td>
              <td>{{checkdata.buy_userdata.address_04}}</td>
              <td>{{checkdata.buy_userdata.address_05}}　</td>
            </tr>
            <p>購入情報</p>
            <tr>
              <td>{{buytype[checkdata.buy_userdata.buy_type]}}</td>
              <td></td>
            </tr>
          </div> -->
          <hr>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-end>
            <v-btn color="success" @click="$router.push('/')">OK</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
  data(){
    return{
      buytype :["銀行振り込み","クレジットカード","AmazonPay"],
      
    }
  },
  methods: {
    ...mapActions('buy',['buycheck'])
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