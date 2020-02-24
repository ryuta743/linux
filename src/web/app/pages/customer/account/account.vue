<template>
  <v-container>
    <!-- 購入履歴ダイアログ -->
    <v-dialog
      v-model="purchaseHistoryDialog"
      scrollable
      overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card scrollable>
        <v-card-title primary-title style="font-weight: bold;">購入履歴</v-card-title>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">商品名</th>
              <th style="color: #111;">出品工房名</th>
              <th style="color: #111;">購入日</th>
              <th style="color: #111;">価格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in buyhis_data" :key="index">
              <td>{{item.product_name}}</td>
              <td>{{item.shop_name}}</td>
              <td>{{item.buy_date}}</td>
              <td>{{item.price}}円</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <!-- お気に入り商品ダイアログ -->
    <v-dialog
      v-model="favProductDialog"
      scrollable
      overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card scrollable>
        <v-card-title primary-title style="font-weight: bold;">お気に入り商品</v-card-title>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">商品名</th>
              <th style="color: #111;">商品説明</th>
              <th style="color: #111;">価格</th>
              <th style="color: #111;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in favo_data" :key="index">
              <td>{{product.product_name.slice(0,19)}}</td>
              <td>{{product.product_detail.slice(0,19)}}...</td>
              <td>{{product.price}}円</td>
              <td>
                <v-btn
                  color="info"
                  outlined
                  @click="$router.push(`/customer/product/${product.product_id}`)"
                >商品ページへ</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <!-- お気に入り工房ダイアログ -->
    <v-dialog
      v-model="favWorkshopDialog"
      scrollable
      overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card scrollable>
        <v-card-title primary-title style="font-weight: bold;">お気に入り工房</v-card-title>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">工房名</th>
              <th style="color: #111;">説明</th>
              <th style="color: #111;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(workshop, index) in favo_shop" :key="index">
              <td>{{workshop.shop_name}}</td>
              <td>{{workshop.shop_description.slice(0,19)}}...</td>
              <td>
                <v-btn
                  color="info"
                  outlined
                  @click="$router.push(`/customer/workshop/${workshop.shop_id}`)"
                >工房ページへ</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <v-content>
      <h5 style="width: 100%;text-align: center;">登録情報</h5>
      <h4 style="width: 100%;text-align: center;padding: 0 0 5px 0;">REGISTRATION INFORMATION</h4>
      <select v-model="acc_change">
        <option disabled value="">未選択</option>
        <option value="0">名前</option>
        <option value="1">国籍</option>
        <option value="2">性別</option>
        <option value="3">メールアドレス</option>
        <option value="4">工房関係者</option>
      </select>
      <v-btn color="success" @click="upd_user_dataReq">変更</v-btn>
      <v-text-field label="名前" outlined v-model="user_name" v-if="acc_change==0"></v-text-field>
      <v-flex md10 xs8 v-if="acc_change==1">
        <v-select outlined :items="countrys" label="在住している国を選択してください" item-text="label" item-value="value" v-model="country"></v-select>
      </v-flex>
      <v-flex md10 xs8 v-if="acc_change==2">
        <v-layout row wrap style="padding-bottom: 30px;">
          <v-radio-group :item="genders" v-model="gender">
            <v-radio label="男性" value=0></v-radio>
            <v-radio label="女性" value=1></v-radio>
            <v-radio label="その他" value=2></v-radio>
          </v-radio-group>
        </v-layout>
      </v-flex>
      <v-text-field label="メールアドレス" outlined v-model="user_mail" v-if="acc_change==3"></v-text-field>
      <v-flex md10 xs8>
        <v-layout row wrap align-center>
          <v-checkbox label="日本伝統工芸品関係者です" true-value="1" false-value="0"  v-model="craft" v-if="acc_change==4"></v-checkbox>
        </v-layout>
      </v-flex>
      <v-card>
        <v-simple-table>
          <tbody>
            <tr>
              <td>お名前</td>
              <td>{{loginuserdata.user_data.user_name}}</td>
            </tr>
            <tr>
              <td>国籍</td>
              <td>{{countrys_7[loginuserdata.user_data.nationality]}}</td>
            </tr>
            <tr>
              <td>登録メールアドレス</td>
              <td>{{loginuserdata.user_data.user_mail}}</td>
            </tr>
            <tr>
              <td>性別</td>
              <td>{{genders_2[loginuserdata.user_data.gender]}}</td>
            </tr>
            <tr>
              <td>工房関係者</td>
              <td>{{usertype2[loginuserdata.user_data.user_type]}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-content>
    <v-content>
      <h5 style="width: 100%;text-align: center;">アカウントメニュー</h5>
      <h4 style="width: 100%;text-align: center;padding: 0 0 5px 0;">ACOUNT MENU</h4>
      <v-card>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-btn
              x-large
              color="success"
              outlined
              style="margin: 0 5px 0 5px;"
              @click="favProductDialog = true"
            >
              <v-icon>mdi-star-circle</v-icon>お気に入り商品
            </v-btn>
            <v-btn
              x-large
              color="success"
              outlined
              style="margin: 0 5px 0 5px;"
              @click="favWorkshopDialog = true"
            >
              <v-icon>mdi-star-circle-outline</v-icon>お気に入り工房
            </v-btn>
            <v-btn
              x-large
              color="success"
              outlined
              style="margin: 0 5px 0 5px;"
              @click="purchaseHistoryDialog = true"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>購入履歴
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
middleware: 'auth',
  async mounted(){
    await this.get_favo_dataReq();
    await this.get_favoshop({user_id:this.loginuserdata.user_data.user_id});
    await this.get_buy_history({user_id:this.loginuserdata.user_data.user_id})
  },
  data() {
    return {
      acc_change: null,
      user_mail: '',
      user_pass: '',
      user_name: '',
      gender: null,
      genders: [
        {label:'男' , value: 0},
        {label:'女' , value: 1},
        {label:'その他' , value: 2}
      ],
      genders_2:['男','女','その他'],

      country: null,
      countrys: [
        {label:'日本(japan)' , value: 0},
        {label:'アメリカ合衆国(U.S.A)' , value: 1},
        {label:'中国 (china)' , value: 2},
        {label:'ロシア (russia)' , value: 3},
        {label:'タイ(thailand)' , value: 4},
        {label:'フランス(france)' , value: 5},
        {label:'韓国(korea)' , value: 6},
        {label:'その他(other)' , value: 7},
      ],
      countrys_2:['日本(japan)','アメリカ合衆国(U.S.A)','中国(china)','ロシア(russia)','タイ(thailand)','フランス(france)','韓国(korea)','その他(other)'],
      
      craft: 0,
      usertype: [
        {label:'部外者' , value: 0},
        {label:'関係者' , value: 1}
      ],
      usertype2:['客','工房関係者'],




      item: {
        name: "寺田神",
        countory: "日本(Japan)",
        mail: "terada_manji@hal.co.jp"
      },
      purchaseHistoryDialog: false,
      favWorkshopDialog: false,
      favProductDialog: false,
      purchaseProducts: [
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
      ],
      favWorkshops:[
          {
              title:"ゆう工房",
              description:'便利だけど人為的なものが身の回りに増える現代生活。自然素材なら安心して使うことができます。陶芸は地球の一部を拝借しての楽しい手作り生活です。「ゆう工房」は人為を感じない土味ある焼きものを提案しています。'
          }
      ],
      countrys_7:['日本(japan)','アメリカ合衆国(U.S.A)','中国(china)','ロシア(russia)','タイ(thailand)','フランス(france)','韓国(korea)','その他(other)'],
    };
  },
  methods:{
    async get_favo_dataReq(){
      const user_data = {
        user_id: this.loginuserdata.user_data.user_id,
      }
      console.log(user_data)
      try{
        await this.get_favo_data({user_data})
      }catch(e){
        console.log( 'エラー発生' + e )
      }
    },
    async upd_user_dataReq(){
      if(this.acc_change == 0){
        console.log(0)
        const user_data = {
          change_type: this.acc_change,
          userid: this.loginuserdata.user_data.user_id,
          change_data: this.user_name
        }
        try{
          await this.upd_user_data({user_data})
          alert('登録されている名前の変更が完了しました')
        }catch(e){
          console.log( 'エラー発生' + e )
        }
      }else if(this.acc_change == 1){
        console.log(1)
        const user_data = {
          change_type: this.acc_change,
          userid: this.loginuserdata.user_data.user_id,
          change_data: this.country
        }
        try{
          await this.upd_user_data({user_data})
          alert('在住している国の変更が完了しました')
        }catch(e){
          console.log( 'エラー発生' + e )
        }
      }else if(this.acc_change == 2){
        console.log(2)
        const user_data = {
          change_type: this.acc_change,
          userid: this.loginuserdata.user_data.user_id,
          change_data: this.gender
        }
        try{
          await this.upd_user_data({user_data})
          alert('登録されている性別の変更が完了しました')
        }catch(e){
          console.log( 'エラー発生' + e )
        }
      }else if(this.acc_change == 3){
        console.log(3)
        const user_data = {
          change_type: this.acc_change,
          userid: this.loginuserdata.user_data.user_id,
          change_data: this.user_mail
        }
        try{
          await this.upd_user_data({user_data})
          alert('登録されているメールアドレスの変更が完了しました')
        }catch(e){
          console.log( 'エラー発生' + e )
        }
      }else if(this.acc_change == 4){
        console.log(4)
        const user_data = {
          change_type: this.acc_change,
          userid: this.loginuserdata.user_data.user_id,
          change_data: this.craft
        }
        try{
          await this.upd_user_data({user_data})
        }catch(e){
          console.log( 'エラー発生' + e )
        }
      }
    },
    ...mapActions('userdata',['upd_user_data']),
    ...mapActions('products',['get_favo_data']),
    ...mapActions('work_shop',['get_favoshop']),
    ...mapActions('buy',['get_buy_history']),
  },
  computed:{
    ...mapGetters(['loginuserdata']),
    ...mapGetters('products',['favo_data']),
    ...mapGetters('work_shop',['favo_shop']),
    ...mapGetters('buy',['buyhis_data']),
  },
};
</script>

<style>
</style>