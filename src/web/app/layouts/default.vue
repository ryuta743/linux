<template>
  <v-app>
    <!-- ログインダイアログ -->
    <v-dialog
      v-model="loginDialog"
      scrollable
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card style="padding: 15px 15px 60px 15px;">
        <v-card-text style="text-align: center;padding: 20px;">
          <h2>ログイン</h2>
        </v-card-text>
        <form @submit.prevent>
          <v-text-field name="name" outlined label="メールアドレス" v-model="login_mail"></v-text-field>
          <v-text-field name="password" outlined label="パスワード" type="password" v-model="login_password"></v-text-field>
          <v-btn color="success" type="submit" @click="logindataReq">ログイン</v-btn>
          <v-btn color="grey" dark @click="loginDialog = false">キャンセル</v-btn>
        </form>
      </v-card>
    </v-dialog>

    <!-- アラートダイアログ -->
    <v-dialog
      v-model="successDialog"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-text style="text-align:center;">
          <v-icon size="50px" color="success">mdi-check</v-icon>
        </v-card-text>
        <v-card-text style="text-align: center;padding-bottom: 50px;">完了しました</v-card-text>
        <v-card-actions>
          <v-btn color="success" style="margin: 0 auto;" outlined @click="successDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ログアウトダイアログ -->
    <v-dialog
      v-model="logoutDialog"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-text style="text-align:center;">
          <v-icon size="50px" color="error">mdi-close</v-icon>
        </v-card-text>
        <v-card-text style="text-align: center;padding-bottom: 50px;">ログアウトしてよろしいですか？</v-card-text>
        <v-card-actions>
          <v-btn color="error" style="margin: 0 auto;" outlined @click="loguout">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- アカウント作成ダイアログ -->
    <v-dialog
      v-model="createADialog"
      persistent
      max-width="900px"
      transition="dialog-transition"
    >
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">メールアドレス入力</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">その他必要情報の入力</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete="e1 > 3">登録内容確認</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4" :complete="e1 > 4">登録完了</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout row wrap justify-center>
              <v-flex md10>

                <v-subheader>メールアドレス</v-subheader>
                <v-text-field label id="id" outlined v-model="user_mail"></v-text-field>
              </v-flex>
              <v-flex md10>
                <v-subheader>パスワード</v-subheader>
                <v-text-field label type="password" id="id" outlined v-model="user_pass"></v-text-field>
              </v-flex>
              <h1 v-if="e1errorflg == 1" style="color: red;">未入力の場所あるよ</h1>
            </v-layout>

            <v-layout row wrap justify-end>
              <v-btn color="primary" @click="e1check">確認</v-btn>

              <v-btn text @click="createADialog = false">キャンセル</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2" scrollable>
            <v-layout row wrap justify-center scrollable>
              <v-flex md10 xs8>
                <v-subheader>お名前（当サイトでご使用になられるお名前）</v-subheader>
                <v-text-field label placeholder="天職太朗" outlined v-model="user_name"></v-text-field>
              </v-flex>

              <v-flex md11 xs9>
                <v-divider style="margin-top: 15px;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>国籍</v-subheader>
                <v-select outlined :items="countrys" label="在住している国を選択してください" item-text="label" item-value="value" v-model="country"></v-select>
              </v-flex>
              <v-flex md11 xs9>
                <v-divider style="margin-top: 10px;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>性別</v-subheader>
                <v-layout row wrap style="padding-bottom: 30px;">
                  <v-radio-group :item="genders" v-model="gender">
                    <v-radio label="男性" value=0></v-radio>
                    <v-radio label="女性" value=1></v-radio>
                    <v-radio label="その他" value=2></v-radio>
                  </v-radio-group>
                </v-layout>
              </v-flex>

              <v-flex md11 xs9>
                <v-divider style="margin: 10px 0 10px 0;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>日本伝統工芸品関係者（伝統工芸職人）の方は下のボックスにチェックを入れてください</v-subheader>
                <v-layout row wrap align-center>
                  <v-checkbox label="日本伝統工芸品関係者です" value=1  v-model="craft"></v-checkbox>
                  <v-layout row wrap justify-end>
                    <v-btn color="primary" @click="e1check2">確認</v-btn>
                  </v-layout>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-subheader>この内容で登録してもよろしいですか？</v-subheader>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>メールアドレス</td>
                  <td>{{user_mail}}</td>
                </tr>
                <tr>
                  <td>パスワード</td>
                  <td>{{user_pass}}</td>
                </tr>
                <tr>
                  <td>お名前</td>
                  <td>{{user_name}}</td>
                </tr>
                <tr>
                  <td>性別</td>
                  <td>{{genders_2[gender]}}</td>
                </tr>
                <tr>
                  <td>国籍</td>
                  <td>{{countrys_2[country]}}</td>
                </tr>
                <tr>
                  <td>ご質問</td>
                  <td v-if="craft==0">私は工房関係者ではありません</td>
                  <td v-else-if="craft==1">私は工房関係者です</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-layout row wrap justify-end style="margin-right: 10px;">
              <v-btn color="primary" @click="inuserdatareq">OK</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-layout row wrap justify-center>
              <v-flex md10>
                <v-card>
                  <v-card-text style="text-align:center;">
                    <v-icon size="50px" color="success">mdi-check</v-icon>
                  </v-card-text>
                  <v-card-text style="text-align: center;font-size: 20px;">
                    登録が完了いたしました！
                    <br />お疲れ様でした！
                  </v-card-text>
                  <v-card-text style="text-align: center;">
                    <v-btn color="primary" @click="createADialog = false; e1 = 1">OK</v-btn>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <!-- <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <v-app-bar :clipped-left="clipped" flat class="no-print">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn outlined>ここにlogo</v-btn> -->
      <img src="../static/tenshokuLogoH.png" alt="ロゴ" width="150px">
      <v-tabs style="padding-left: 10px;">
        <v-tab @click="$router.push('/')">トップ</v-tab>
        <v-tab @click="$router.push('/shop')">ショップ</v-tab>
        <v-tab @click="$router.push('/mall')">モール</v-tab>
        <v-tab @click="$router.push('/contact')">コンタクト</v-tab>
      </v-tabs>

      <v-btn outlined @click="loginDialog = true" v-if="loginuserdata == null ? true:false">
        <v-icon color="success">mdi-check</v-icon>ログイン
      </v-btn>

      <v-btn outlined style="margin: ;" v-if="loginuserdata == null ? true:false" @click="createADialog = true">
        <v-icon color="success">mdi-account</v-icon>新規登録
      </v-btn>

      <v-badge left color="primary" v-if="loginuserdata !== null ? true:false">
        <span slot="badge">5</span>
        <v-btn outlined @click="$router.push('/client/myshop/myshop')">
          <v-icon color="primary">mdi-shop</v-icon>マイ工房管理
        </v-btn>
      </v-badge>

      <v-badge left color="primary" v-if="loginuserdata !== null ? true:false">
        <span slot="badge">0</span>
        <v-btn outlined v-if="loginuserdata !== null ? true:false" @click="$router.push('/customer/cart/cart')">
          <v-icon color="primary">mdi-cart</v-icon>カート
        </v-btn>
      </v-badge>

      <div v-if="loginuserdata !== null ? true:false">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" outlined>
              <v-icon color="primary">mdi-account</v-icon>アカウント
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/customer/account/account')">
              <v-icon>mdi-account-box</v-icon>
              <v-list-item-title>アカウント情報</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutDialog = true">
              <v-icon>mdi-close</v-icon>
              <v-list-item-title>ログアウト</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div>
        <v-switch label="English" style="padding: 25px 0 0 5px;" color="success"></v-switch>
      </div>
    </v-app-bar>

    <nuxt />

    <v-footer style="height: 400px;" dark class="no-print">
      <span>&copy; ここはフッター</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import { toUnicode } from 'punycode';

export default {
  data() {
    return {
      logoutDialog: false,
      e1: 0,
      createADialog: false,
      isLogin: false,
      isCreater: true,
      clipped: false,
      drawer: false,
      fixed: false,
      loginDialog: false,
      successDialog: false,

      login_mail: '',
      login_password: '',

      e1errorflg: 0,

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
      items: [
        {
          icon: "mdi-account-box",
          title: "アカウント情報",
          to: "/"
        },
        {
          icon: "mdi-close",
          title: "ログアウト",
          to: "/"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  methods: {
    e1check() {
      if (this.user_mail == '' || this.user_pass == '' ){
        this.e1errorflg = 1
      }else{
        this.e1 = 2
      }
    },

    e1check2() {
      if(this.user_name == '' || this.countrys == '' || this.gender == ''){
        this.e1errorflg = 1
      }else{
        console.log(this.countrys[this.country])
        this.e1 = 3
      }
    },

    inuserdatareq() {
      const payload = {
        name : this.user_name,
        pass : this.user_pass,
        mail : this.user_mail,
        gender : this.genders[this.gender].value,
        country : this.country,
        user_type : this.usertype[this.craft].value,
      }
      try{
        this.inuserdata({payload});
        this.e1 = 4
      }catch(e){
        console.log('エラー発生'),
        console.log(e)
      }
      this.e1 = 4
    },
    
    async logindataReq() {
      const payload = {
        mail : this.login_mail,
        password : this.login_password,
      }

      try{
        await this.login({payload});
      }catch(e){
        console.log('エラー発生'),
        console.log(e)
      }

      if(this.loginuserdata){
        this.isLogin = true;
        this.successDialog = true;
        this.loginDialog = false;
      }else{
        console.log('ログイン失敗！')
      }

    },

    login() {
      this.isLogin = true;
      this.successDialog = true;
      this.loginDialog = false;
    },

    async loguout(){
      try {
        await this.logout();
        this.isLogin = false;
        this.successDialog = true;
        this.logoutDialog = false;
        console.log('ログアウト完了')
      } catch (e) {
        this.formError = e.message
      }
    },

    // logout() {
    //   this.isLogin = false;
    //   this.successDialog = true;
    //   this.logoutDialog = false;
    //   this.$router.push("/");
    // },
    ...mapActions(['login','logout']),
    ...mapActions('userdata',['inuserdata'])
  },
  computed: {
    ...mapGetters(['loginuserdata']),
    ...mapGetters('userdata',['userdata'])
  }
};
</script>

<style>
*{
  font-family: "Hannari","Sawarabi Mincho";
}

@media print {
  .no-print {
    display: none;
  }
}
</style>