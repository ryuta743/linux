<template>
  <v-container grid-list-xs style="min-height: 100vh;">
    <v-content>
      <v-card>
        <v-card-title primary-title>マイ工房管理画面</v-card-title>
        <v-card-text>
          <v-switch label="工房を持っている" v-model="haveWorkshop"></v-switch>
        </v-card-text>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md12 v-if="!haveWorkshop">
              <v-btn
                color="info"
                style="width: 100%;height: 500px;"
                @click="$router.push('/client/myshop/create')"
              >
                <h3>マイ工房設立</h3>
              </v-btn>
            </v-flex>
            <v-flex xs12 md6 v-if="haveWorkshop">
              <v-btn
                color="grey"
                dark
                style="width: 100%;height: 300px;"
                @click="$router.push('/client/myshop/orderlist')"
              >
                <h3>
                  <v-icon>mdi-format-list-checks</v-icon>
                </h3>
                <h3>注文一覧</h3>
              </v-btn>
            </v-flex>
            <v-flex xs12 md6 v-if="haveWorkshop">
              <v-btn
                color="success"
                style="width: 100%;height: 300px;"
                @click="$router.push('/client/myshop/sales')"
              >
                <h3>
                  <v-icon>mdi-chart-bar</v-icon>
                </h3>
                <h3>売り上げ</h3>
              </v-btn>
            </v-flex>
            <v-flex xs12 md6 v-if="haveWorkshop">
              <v-btn
                color="primary"
                style="width: 100%;height: 300px;"
                @click="$router.push('/client/myshop/products')"
              >
                <h3>
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </h3>
                <h3>商品一覧・在庫状況</h3>
              </v-btn>
            </v-flex>
            <v-flex xs12 md6 v-if="haveWorkshop">
              <v-btn
                color="orange"
                dark
                style="width: 100%;height: 300px;"
                @click="$router.push('/client/myshop/productadd')"
              >
                <h3>
                  <v-icon>mdi-plus</v-icon>
                </h3>
                <h3>新規商品登録</h3>
              </v-btn>
            </v-flex>
            <v-flex xs12 md6 v-if="haveWorkshop">
              <v-btn
                color="error"
                dark
                style="width: 100%;height: 300px;"
                @click="$router.push('/client/myshop/productdel')"
              >
                <h3>
                  <v-icon>mdi-close</v-icon>
                </h3>
                <h3>商品編集・削除</h3>
              </v-btn>
            </v-flex>
            <v-flex xs12 md6 v-if="haveWorkshop">
              <v-btn
                color="info"
                dark
                style="width: 100%;height: 300px;"
                @click="$router.push('/client/myshop/chat')"
              >
                <h3>
                  <v-icon>mdi-chat</v-icon>
                </h3>
                <h3>チャットメッセージ</h3>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      haveWorkshop: false
    };
  }
};
</script>

<style>
</style>