<template>
  <v-app style="background-color: #fff;background-image: url(/wasi.png);">
    <!-- ログインダイアログ -->
    <v-dialog
      v-model="loginDialog"
      scrollable
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card style="padding: 20px 25px 30px 25px;">
        <v-card-text style="text-align: center;padding: 20px;">
          <img src="../static/hewlogo.png" alt="ロゴ" width="50px" />
          <h2>ログイン</h2>
        </v-card-text>
        <form @submit.prevent>
          <v-text-field
            name="name"
            outlined
            label="メールアドレス"
            v-model="login_mail"
            id="text_field"
            style="padding: 0;"
          ></v-text-field>
          <v-text-field
            name="password"
            outlined
            label="パスワード"
            type="password"
            v-model="login_password"
            id="text_field"
          ></v-text-field>
          <div id="login_button">
            <v-btn color="success" type="submit" @click="logindataReq" depressed id="suc_btn">ログイン</v-btn>
            <v-btn color="grey" dark @click="loginDialog = false" depressed id="can_btn">キャンセル</v-btn>
          </div>
          <div id="chan_pass">
            <nuxt-link to="/change_pass" id="change_pass">パスワードを忘れた方はこちらから</nuxt-link>
          </div>
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
    <v-dialog v-model="createADialog" persistent max-width="900px" transition="dialog-transition">
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
                <v-select
                  outlined
                  :items="countrys"
                  label="在住している国を選択してください"
                  item-text="label"
                  item-value="value"
                  v-model="country"
                ></v-select>
              </v-flex>
              <v-flex md11 xs9>
                <v-divider style="margin-top: 10px;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>性別</v-subheader>
                <v-layout row wrap style="padding-bottom: 30px;">
                  <v-radio-group :item="genders" v-model="gender">
                    <v-radio label="男性" value="0"></v-radio>
                    <v-radio label="女性" value="1"></v-radio>
                    <v-radio label="その他" value="2"></v-radio>
                  </v-radio-group>
                </v-layout>
              </v-flex>

              <v-flex md11 xs9>
                <v-divider style="margin: 10px 0 10px 0;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>日本伝統工芸品関係者（伝統工芸職人）の方は下のボックスにチェックを入れてください</v-subheader>
                <v-layout row wrap align-center>
                  <v-checkbox label="日本伝統工芸品関係者です" true-value="1" false-value="0" v-model="craft"></v-checkbox>
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
                <v-card flat>
                  <v-card-text style="text-align:center;">
                    <v-icon size="50px" color="success">mdi-check</v-icon>
                  </v-card-text>
                  <v-card-text style="text-align: center;font-size: 20px;">
                    天職にご登録いただき誠にありがとうございます。
                    <br />先ほど登録完了メールを送りました。お手数ですがご確認ください。
                    <br />お疲れ様でした。
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

    <!-- マイクダイアログ -->
    <v-dialog
      v-model="sound_dialog"
      persistent
      :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-card id="box">
        <v-card-text style="padding: 10px; color: #fff;">
          <h2 style="padding:20px 0 20px 0;">音声操作</h2>
          <div id="moji_box">
            <div id="sound_wrap">
              <v-layout row wrap justify-center align-center>
                <div id="record_btn" class="no-print">
                  <v-btn color="error" class="no-print" icon @click="record_req">
                    <v-icon x-large>mdi-microphone</v-icon>
                  </v-btn>
                </div>
              </v-layout>
              <div id="flex_box">
                <div id="order_box" v-if="order != ''">{{ order }}</div>
                {{ monitor() }}
              </div>
            </div>
          </div>
          <h4 style="padding-top: 30px;">マイクボタンを押して操作内容を話してください</h4>
          <br />
          <p>※周辺の音が入ったり、聞き取りに失敗すると正しく動作しない場合がございます</p>
          <br />
          <v-layout row wrap justify-center>
            <v-btn depressed color="success" @click="sound_dialog = false">閉じる</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
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
    <v-app-bar :clipped-left="clipped" flat class="no-print" style="height: 65px;">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-btn outlined>ここにlogo</v-btn> -->
      <img src="../static/hewlogo.png" alt="ロゴ" width="50px" class="no-print" />
      <div id="site_title" class="no-print">
        <span class="no-print">天職</span>tenshoku
      </div>

      <div id="search_box" class="no-print">
        <input type="text" id="search_input" placeholder="キーワード" class="no-print" />
      </div>

      <div id="sound_box">
        <v-btn class="btn elevation-0" @click="sound_dialog = true">
          <v-icon color="#348484" class="no-print">mdi-microphone-outline</v-icon>
        </v-btn>
      </div>

      <v-btn
        text
        @click="loginDialog = true"
        v-if="loginuserdata == null ? true:false"
        class="no-print"
      >
        <v-icon color="#DC3839" class="no-print">mdi-login</v-icon>ログイン
      </v-btn>

      <v-btn
        text
        style="margin: ;"
        v-if="loginuserdata == null ? true:false"
        @click="createADialog = true"
        class="no-print"
      >
        <v-icon color="#DC3839" class="no-print">mdi-account-plus</v-icon>新規登録
      </v-btn>

      <v-btn
        text
        @click="$router.push('/client/myshop/myshop')"
        v-if="loginuserdata !== null ? true:false"
        class="no-print"
      >
        <v-icon color="primary" class="no-print">mdi-store</v-icon>マイ工房管理
      </v-btn>

      <v-btn
        text
        v-if="loginuserdata !== null ? true:false"
        @click="$router.push('/customer/cart/cart')"
        class="no-print"
      >
        <v-icon color="primary" class="no-print">mdi-cart</v-icon>カート
      </v-btn>

      <div v-if="loginuserdata !== null ? true:false" class="no-print">
        <v-menu offset-y class="no-print">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>
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
    </v-app-bar>
    <div id="subnav" class="no-print">
      <div class="sub_item no-print" @click="$router.push('/')">
        <v-icon color="green darken-2">mdi-home</v-icon>トップ
      </div>
      <div class="sub_item no-print" @click="$router.push('/shop')">
        <v-icon color="orange darken-2">mdi-gift</v-icon>ショップ
      </div>
      <div class="sub_item no-print" @click="$router.push('/mall')">
        <v-icon color="purple darken-2">mdi-shopping-search</v-icon>街へ出る
      </div>
      <div class="sub_item no-print" @click="$router.push('/contact')">
        <v-icon color="teal darken-2">mdi-email</v-icon>お問い合わせ
      </div>
    </div>

    <nuxt />

    <div id="foo" class="no-print">
      <p class="no-print">PAGE</p>
      <p class="no-print"></p>
      <p class="no-print">TOP</p>
    </div>
    <v-footer style="height: 300px;" dark class="no-print">
      <div id="ter">
        <div id="foo_logo">
          <img src="/grey_logo.png" alt="天職くん" style="width: 150px;" />
          <div id="footer_title">
            <span>天職</span>tenshoku
          </div>
        </div>
        <div id="footer_nav">
          <h2>天職</h2>
          <div id="navi">
            <p>利用規約</p>
            <p>プライバシー</p>
            <p>ヘルプ</p>
            <nuxt-link to="/contact" id="footer_link">お問い合わせ</nuxt-link>
          </div>
        </div>
      </div>
      <div id="copy">
        <p>Copyright 2020 Tenshoku ALL RIGHTS RESERVED.</p>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { toUnicode } from "punycode";

export default {
  data() {
    return {
      sound_dialog: false,
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

      login_mail: "",
      login_password: "",

      e1errorflg: 0,

      user_mail: "",
      user_pass: "",
      user_name: "",
      gender: null,
      genders: [
        { label: "男", value: 0 },
        { label: "女", value: 1 },
        { label: "その他", value: 2 }
      ],
      genders_2: ["男", "女", "その他"],

      country: null,
      countrys: [
        { label: "日本(japan)", value: 0 },
        { label: "アメリカ合衆国(U.S.A)", value: 1 },
        { label: "中国 (china)", value: 2 },
        { label: "ロシア (russia)", value: 3 },
        { label: "タイ(thailand)", value: 4 },
        { label: "フランス(france)", value: 5 },
        { label: "韓国(korea)", value: 6 },
        { label: "その他(other)", value: 7 }
      ],
      countrys_2: [
        "日本(japan)",
        "アメリカ合衆国(U.S.A)",
        "中国(china)",
        "ロシア(russia)",
        "タイ(thailand)",
        "フランス(france)",
        "韓国(korea)",
        "その他(other)"
      ],

      craft: 0,
      usertype: [
        { label: "部外者", value: 0 },
        { label: "関係者", value: 1 }
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
      if (this.user_mail == "" || this.user_pass == "") {
        this.e1errorflg = 1;
      } else {
        this.e1 = 2;
      }
    },
    e1check2() {
      if (this.user_name == "" || this.countrys == "" || this.gender == "") {
        this.e1errorflg = 1;
      } else {
        console.log(this.countrys[this.country]);
        this.e1 = 3;
        console.log(this.craft);
      }
    },

    inuserdatareq() {
      const payload = {
        name: this.user_name,
        pass: this.user_pass,
        mail: this.user_mail,
        gender: this.genders[this.gender].value,
        country: this.country,
        user_type: this.usertype[this.craft].value
      };
      try {
        this.inuserdata({ payload });
        this.new_user_mail({ payload });
        this.e1 = 4;
      } catch (e) {
        console.log("エラー発生"), console.log(e);
      }

      this.e1 = 4;
    },

    async logindataReq() {
      const payload = {
        mail: this.login_mail,
        password: this.login_password
      };

      try {
        await this.login({ payload });
      } catch (e) {
        console.log("エラー発生"), console.log(e);
      }

      if (this.loginuserdata) {
        this.isLogin = true;
        this.successDialog = true;
        this.loginDialog = false;
      } else {
        console.log("ログイン失敗！");
      }
    },

    login() {
      this.isLogin = true;
      this.successDialog = true;
      this.loginDialog = false;
    },

    async loguout() {
      try {
        await this.logout();
        this.isLogin = false;
        this.successDialog = true;
        this.logoutDialog = false;
        console.log("ログアウト完了");
        this.$router.push("/");
      } catch (e) {
        this.formError = e.message;
      }
    },

    async record_req() {
      await this.record();
    },

    monitor() {
      if (this.order_result == "ログイン") {
        this.loginDialog = true;
        this.order_reset();
      }
      if (this.order_result == "ログアウト") {
        this.logoutDialog = true;
        this.order_reset();
      }
    },

    // logout() {
    //   this.isLogin = false;
    //   this.successDialog = true;
    //   this.logoutDialog = false;
    //   this.$router.push("/");
    // },
    ...mapActions(["login", "logout", "record", "order_reset"]),
    ...mapActions("userdata", ["inuserdata"]),
    ...mapActions("mail", ["new_user_mail"])
  },
  computed: {
    ...mapGetters(["loginuserdata", "order", "order_result"]),
    ...mapGetters("userdata", ["userdata"])
  }
};
</script>

<style scoped>
#subnav {
  border-top: 1.2px solid #dddddd;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 45px;
  font-size: 14px;
  background-color: #fefefe;
}

.sub_item:hover {
  background-color: #ddd;
}

.sub_item {
  font-weight: bold;
  color: #999;
  cursor: pointer;
  transition: 0.5s;
  width: 450px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sub_item .v-icon {
  margin-right: 5px;
}

#foo {
  display: flex;
  background-color: #989898;
  width: 100%;
  justify-content: center;
  align-items: center;
}

#foo p {
  margin: 0;
  padding: 0;
  font-size: 25px;
}

#copy {
  width: 100%;
  display: flex;
  font-size: 0.8em;
}

#copy p {
  margin: 0 auto;
}

.triangle {
  border-right: 23px solid transparent;
  border-bottom: 24px solid #b2ce54;
  border-left: 23px solid transparent;
}

#ter {
  padding-left: 70px;
  display: flex;
}

#ter img {
  padding-left: 20px;
}

#foo_logo {
  width: 270px;
}

#footer_title {
  width: 500px;
  font-size: 23px;
  padding-bottom: 5px;
}

#footer_title span {
  font-size: 35px;
  padding-right: 10px;
  padding-bottom: 0;
}

#footer_nav h2 {
  font-size: 15px;
  margin-bottom: 17px;
}

#navi {
  margin-left: 15px;
  border-left: 1px solid #ffffff;
  padding-left: 15px;
  font-size: 14.5px;
}

#navi p {
  padding-bottom: 0px;
  margin-bottom: 10px;
}

#footer_link {
  text-decoration: none;
  color: #fff;
}

#login_button {
  text-align: center;
}

#chan_pass {
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

#change_pass {
  font-size: 0.8em;
  text-decoration: none;
}

#suc_btn {
  width: 350px;
  margin-bottom: 10px;
}

#can_btn {
  width: 350px;
}

#text_field {
  width: 100px;
}

#order_box {
  color: #080808;
  position: relative;
  top: 20px;
  left: 0;
  width: auto;
  height: auto;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  border: 1.2px solid #e1e1e1;
  box-sizing: border-box;
  display: inline-block;
}

/* #order_box:before {
  content: "";
  position: absolute;
  top: 50%;
  right: -26px;
  margin-top: -12px;
  border: 12px solid transparent;
  border-left: 13.5px solid #fff;
  z-index: 2;
} */

#order_box:before {
  content: "";
  position: absolute;
  top: -30px;
  left: 50%;
  margin-left: -15px;
  border: 15px solid transparent;
  border-bottom: 15px solid #e1e1e1;
}

/* #order_box:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -30px;
  margin-top: -14px;
  border: 14px solid transparent;
  border-left: 15px solid #e1e1e1;
  z-index: 1;
} */

.v-btn {
  color: #444;
}

* {
  font-family: "Hannari", "Sawarabi Mincho";
}

#site_title {
  width: 530px;
  padding-top: 15px;
}

#search_box {
  width: 600px;
}

#search_input {
  width: 400px;
  padding: 5px 5px 5px 15px;
  border: 1.2px solid #ddd;
  border-radius: 3px;
}

#site_title span {
  font-size: 25px;
  padding: 0;
  margin: 0;
}

.v-input__slot {
  margin-bottom: 0px;
}

@media print {
  .no-print {
    display: none;
  }
}
#box {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  height: 370px;
  text-align: center;
}
#sound_wrap {
  width: 300px;
  height: 100px;
  margin: 0 auto;
  padding-top: 30px;
}
#record_btn {
  position: relative;
}
#sound_box {
  margin-right: 25px;
}
</style>