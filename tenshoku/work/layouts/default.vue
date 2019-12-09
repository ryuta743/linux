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
          <v-text-field name="name" outlined label="メールアドレス"></v-text-field>
          <v-text-field name="password" outlined label="パスワード" type="password"></v-text-field>
          <v-btn color="success" @click="login" type="submit">ログイン</v-btn>
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
          <v-btn color="error" style="margin: 0 auto;" outlined @click="logout">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- アカウント作成ダイアログ -->
    <v-dialog
      v-model="createADialog"
      scrollable
      fullscreen
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
                <v-subheader>お使いのメールアドレスをご入力ください</v-subheader>
                <v-text-field placeholder="例：tenshoku@hal.co.jp" label id="id" outlined></v-text-field>
              </v-flex>
              <v-flex md10>
                <v-subheader>確認のため再度ご入力ください</v-subheader>
                <v-text-field placeholder="例：tenshoku@hal.co.jp" label id="id" outlined></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap justify-end>
              <v-btn color="primary" @click="e1 = 2">確認</v-btn>

              <v-btn text @click="createADialog = false">キャンセル</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2" scrollable>
            <v-layout row wrap justify-center scrollable>
              <v-flex md10 xs8>
                <v-subheader>お名前（当サイトでご使用になられるお名前）</v-subheader>
                <v-text-field label placeholder="天職太朗" outlined></v-text-field>
              </v-flex>

              <v-flex md11 xs9>
                <v-divider style="margin-top: 15px;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>国籍</v-subheader>
                <v-select outlined :items="countorys" label="在住している国を選択してください"></v-select>
              </v-flex>
              <v-flex md11 xs9>
                <v-divider style="margin-top: 10px;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>性別</v-subheader>
                <v-layout row wrap style="padding-bottom: 30px;">
                  <v-radio label="男性" value="value"></v-radio>
                  <v-radio label="女性" value="value"></v-radio>
                  <v-radio label="その他" value="value"></v-radio>
                </v-layout>
              </v-flex>

              <v-flex md11 xs9>
                <v-divider style="margin: 10px 0 10px 0;"></v-divider>
              </v-flex>

              <v-flex md10 xs8>
                <v-subheader>日本伝統工芸品関係者（伝統工芸職人）の方は下のボックスにチェックを入れてください</v-subheader>
                <v-layout row wrap align-center>
                  <v-checkbox label="日本伝統工芸品関係者です" value="value"></v-checkbox>
                  <v-layout row wrap justify-end>
                    <v-btn color="primary" @click="e1 = 3">確認</v-btn>
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
                  <td>tenshoku@hal.co.jp</td>
                </tr>
                <tr>
                  <td>お名前</td>
                  <td>天職太朗</td>
                </tr>
                <tr>
                  <td>性別</td>
                  <td>男性</td>
                </tr>
                <tr>
                  <td>国籍</td>
                  <td>日本(Japan)</td>
                </tr>
                <tr>
                  <td>ご質問</td>
                  <td>私は日本伝統工芸品関係者です</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-layout row wrap justify-end style="margin-right: 10px;">
              <v-btn color="primary" @click="e1 = 4">OK</v-btn>
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
                    <v-btn color="primary" @click="createADialog = false">OK</v-btn>
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
    <v-app-bar elevate-on-scroll :clipped-left="clipped" app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-btn outlined>ここにlogo</v-btn>
      <v-tabs>
        <v-tab @click="$router.push('/')">トップ</v-tab>
        <v-tab @click="$router.push('/shop')">ショップ</v-tab>
        <v-tab @click="$router.push('/mall')">モール</v-tab>
        <v-tab @click="$router.push('/contact')">コンタクト</v-tab>
      </v-tabs>

      <v-btn outlined @click="loginDialog = true" v-if="!isLogin">
        <v-icon color="success">mdi-check</v-icon>ログイン
      </v-btn>

      <v-btn outlined style="margin: ;" v-if="!isLogin" @click="createADialog = true">
        <v-icon color="success">mdi-account</v-icon>新規登録
      </v-btn>

      <v-badge left color="primary" v-if="isLogin && isCreater">
        <span slot="badge">5</span>
        <v-btn outlined @click="$router.push('/client/myshop/myshop')">
          <v-icon color="primary">mdi-shop</v-icon>マイ工房管理
        </v-btn>
      </v-badge>

      <v-badge left color="primary" v-if="isLogin">
        <span slot="badge">0</span>
        <v-btn outlined v-if="isLogin" @click="$router.push('/customer/cart/cart')">
          <v-icon color="primary">mdi-cart</v-icon>カート
        </v-btn>
      </v-badge>

      <div v-if="isLogin">
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

    <v-footer style="height: 400px;" dark>
      <span>&copy; ここはフッター</span>
    </v-footer>
  </v-app>
</template>

<script>
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

      countorys: ["日本(Japan)", "アメリカ合衆国(U.S.A)"],
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
    login() {
      this.isLogin = true;
      this.successDialog = true;
      this.loginDialog = false;
    },
    logout() {
      this.isLogin = false;
      this.successDialog = true;
      this.logoutDialog = false;
      this.$router.push("/");
    }
  }
};
</script>
