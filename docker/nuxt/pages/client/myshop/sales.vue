<template>
  <v-container grid-list-xs style="min-height: 90vh;">
    <v-content>
      <v-toolbar dark color="primary">
        <v-toolbar-items>
          <v-btn text >売上一覧表</v-btn>
          <v-btn text>売上傾向</v-btn>
          <v-btn text>売れ筋商品</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>
        <v-btn color="grey" @click="$router.push('/client/myshop/myshop')">管理画面へ戻る</v-btn>
      </v-toolbar>
      <v-card>
        <v-card-title primary-title>売り上げ一覧表</v-card-title>
        <v-card-text>
            <v-btn color="info" @click="$router.push('/client/myshop/sales_print')"><v-icon>mdi-file</v-icon>売上一覧表を印刷する</v-btn>
        </v-card-text>
        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th style="color: #111;">商品名</th>
                <th style="color: #111;">価格</th>
                <th style="color: #111;">個数</th>
                <th style="color: #111;">売上日</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{item.title}}</td>
                <td>{{item.price}}円</td>
                <td>{{item.num}}個</td>
                <td>{{item.date}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            items:[
                {
                    title:'俺の陶器',
                    price: 3000,
                    num: 2,
                    date: '2019/8/30'
                },
                {
                    title:'陶器01',
                    price: 3000,
                    num: 1,
                    date: '2019/8/29'
                },
                {
                    title:'陶器02',
                    price: 3000,
                    num: 4,
                    date: '2019/8/29'
                }
            ]
        }
    }
};
</script>

<style>
</style>