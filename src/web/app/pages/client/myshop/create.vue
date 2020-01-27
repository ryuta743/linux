<template>
  <v-container grid-list-xs>
    <v-content>
      <v-stepper v-model="e1" style="min-height: 700px;">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">工房名入力</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">工房詳細情報入力</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3">申請内容確認</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 4" step="4">登録申請完了</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-flex md12 xs12>
              <v-subheader>使用したい工房名を入力してください</v-subheader>
              <v-text-field placeholder="例：天職工房" label outlined></v-text-field>
            </v-flex>

            <v-flex md12 xs12>
                <v-subheader>工房のアピールポイントを入力してください</v-subheader>
                <v-text-field
                    label
                    placeholder="例：ストレス社会と言われる現代、私たちはハンドメイドにこだわり人の温かさが詰まった優しい食器を販売しています。"
                    type="textarea"
                    outlined
                ></v-text-field>
            </v-flex>

            <v-layout row wrap justify-end style="padding: 5px;">
              <v-btn color="primary" @click="e1 = 2">確認</v-btn>
              <v-btn @click="$router.push('/client/myshop/myshop')">キャンセル</v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2" scrollable>
            <v-card>
              <v-card-text>
                <h3>工房代表者名</h3>
                <v-layout row wrap>
                  <v-text-field label="姓" outlined></v-text-field>
                  <v-text-field label="名" outlined></v-text-field>
                </v-layout>
                <v-divider style="padding-bottom: 10px;"></v-divider>
                <h3>工房所在地</h3>
                <v-flex xs12 md6>
                  <v-text-field label="郵便番号" type="address" outlined></v-text-field>
                </v-flex>
                <v-layout row wrap>
                  <v-flex xs12 md4>
                    <v-select outlined label="都道府県"></v-select>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field label="市区町村" outlined></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field label="番地" outlined></v-text-field>
                  </v-flex>
                </v-layout>
                <v-flex xs12 md6>
                  <v-text-field label="建物名" outlined></v-text-field>
                </v-flex>
                <v-divider style="padding-bottom: 10px;"></v-divider>
                <h3>口座情報</h3>
                <v-divider style="padding-bottom: 10px;"></v-divider>
                <v-layout row wrap justify-end>
                  <v-flex xs6 md1>
                    <v-btn color="primary" style="width: 100%;" @click="e1 = 3">確認</v-btn>
                  </v-flex>
                  <v-flex xs6 md1>
                    <v-btn color="grey lighten-3" style="width: 100%;" @click="e1 = 1">戻る</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-subheader>この内容で申請してもよろしいですか？</v-subheader>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>工房名</td>
                  <td>寺田卍工房</td>
                </tr>
                <tr>
                  <td>工房のアピールポイント</td>
                  <td>ストレス社会と言われる現代、私たちはハンドメイドにこだわり人の温かさが詰まった優しい食器を販売しています。</td>
                </tr>
                <tr>
                  <td>工房代表者名</td>
                  <td>寺田神太</td>
                </tr>
                <tr>
                  <td>口座情報</td>
                  <td>ここでは表示できません</td>
                </tr>
                <tr>
                  <td>工房所在地</td>
                  <td>愛知県 名古屋市 中村区 大秋町 3-24-1 バンドウエイジ</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-layout row wrap justify-end style="margin-right: 10px;padding: 5px;">
              <v-btn color="primary" @click="e1 = 4">確認</v-btn>
              <v-btn color="grey lighten-3" @click="e1 = 2">戻る</v-btn>
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
                    工房登録申請が完了いたしました！
                    <br />審査結果は後日、登録メールアドレスに送信いたします
                  </v-card-text>
                  <v-card-text style="text-align: center;">
                    <v-btn color="primary" @click="$router.push('/client/myshop/myshop')">確認</v-btn>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: 0
    };
  }
};
</script>

<style>
</style>