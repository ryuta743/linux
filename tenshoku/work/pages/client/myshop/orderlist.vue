<template>
  <v-container grid-list-xs style="min-height: 90vh;">
    <v-content>
      <v-toolbar color="primary">
          <v-toolbar-title style="color: white;">
              注文一覧
          </v-toolbar-title>
          <div class="flex-grow-1"></div>
        <v-btn color="grey" dark @click="$router.push('/client/myshop/myshop')">管理画面へ戻る</v-btn>
      </v-toolbar>
      <v-card>
        <v-card-text>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th style="color: #111;">注文No</th>
                  <th style="color: #111;">注文者</th>
                  <th style="color: #111;">注文日</th>
                  <th style="color: #111;">処理状態</th>
                  <th style="color: #111;"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{item.orderno}}</td>
                  <td>{{item.username}}</td>
                  <td>{{item.date}}</td>
                  <td >{{item.isCheck? '発送済み':'未発送'}}</td>
                  <td><v-btn color="primary" outlined @click="$router.push(`order/${item.orderno}`)">注文詳細をみる</v-btn></td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
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
                    orderno: '0002',
                    userid:'805',
                    username:'Xavier',
                    date: 20190812,
                    isCheck: false
                },
                {   
                    orderno: '0001',
                    userid:'805',
                    username:'Xavier',
                    date: 20190812,
                    isCheck: true
                }
            ]
        }
    }
};
</script>

<style>
</style>