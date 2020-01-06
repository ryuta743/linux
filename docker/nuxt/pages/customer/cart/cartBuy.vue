<template>
  <v-container grid-list-xs>
    <v-content>
      <v-card>
        <v-card-title primary-title>購入必要情報入力</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <h3>名前</h3>
          <v-layout row wrap>
            <v-text-field label="姓" outlined></v-text-field>
            <v-text-field label="名" outlined></v-text-field>
          </v-layout>
          <v-divider style="padding-bottom: 10px;"></v-divider>
          <h3>住所</h3>
          <v-flex xs12 md4>
            <v-select :items="items" label="国" outlined></v-select>
          </v-flex>
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
            <v-text-field label="建物名・部屋番号" outlined></v-text-field>
          </v-flex>
          <v-divider style="padding-bottom: 10px;"></v-divider>
          <h3>お支払い方法</h3>
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
export default {};
</script>

<style>
</style>