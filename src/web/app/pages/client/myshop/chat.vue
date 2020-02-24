<template>
  <div id="workshop_body">
    <div style="min-height: 100vh;width: 15%;" id="workshop_nav">
      <ul>
        <li @click="$router.push('/client/myshop/myshop')">
          <v-icon>mdi-home</v-icon> 管理ツールトップ
        </li>
        <li @click="$router.push('/client/myshop/orderlist')">
          <v-icon>mdi-format-list-checks</v-icon> 注文一覧
        </li>
        <li @click="$router.push('/client/myshop/sales')"><v-icon>mdi-chart-bar</v-icon> 売上一覧</li>
        <li @click="$router.push('/client/myshop/sales_trend')"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
        <li @click="$router.push('/client/myshop/products')">
          <v-icon>mdi-format-list-bulleted</v-icon> 商品一覧・在庫状況
        </li>
        <li @click="$router.push('/client/myshop/discount')">
          <v-icon>mdi-cash-usd</v-icon> セット割引
        </li>
        <li @click="$router.push('/client/myshop/productadd')">
          <v-icon>mdi-plus</v-icon> 新規商品登録
        </li>
        <li @click="$router.push('/client/myshop/productdel')">
          <v-icon>mdi-close</v-icon> 商品編集・削除
        </li>
        <li @click="$router.push('/client/myshop/chat')" class="check">
          <v-icon>mdi-chat</v-icon> チャットメッセージ
        </li>
      </ul>
    </div>
    <v-container grid-list-xs style="min-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-content>
        <div id="sub_title">
          <h3><v-icon>mdi-chat</v-icon>ゆう工房</h3>
          <v-btn outlined @click="userSwitch">{{ nowuser }}になるボタン</v-btn>
        </div>
        <v-card scrollable style="height: 80vh;">
          <v-card-text scrollable　style="overflow:scroll;height: 70vh;background-color: #e9e9e9;">
            <v-flex
              xs12
              md12
              v-for="(item, index) in chatlog"
              :key="index"
              style="margin: 5px 0 5px 0;"
            >
              <v-layout row wrap :justify-end="item.userid == userid">
                <v-flex xs6 md5>
                  <v-layout row wrap :justify-end="item.userid == userid">
                    <div>{{item.username}}</div>
                  </v-layout>
                  <v-card style="padding: 10px;" @click="item.messageSub = 'この工房は私に幸せな時間を提供してくれます!!'">
                      {{item.message}}
                      <div v-if="item.messageSub" style="color: #666;" transition="slide-x-transition">
                          ({{item.messageSub}})
                      </div>
                  </v-card>
                  <div>
                    <v-layout row wrap :justify-end="item.userid != userid">{{item.time}}</v-layout>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-flex xs12 md12>
              <form>
                <v-layout row wrap>
                  <v-flex xs11 md11>
                    <v-text-field outlined label="メッセージ"></v-text-field>
                  </v-flex>
                  <v-flex xs1 md1>
                    <v-btn style="width: 100%;height: 55px;" color="orange" dark>送信</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-content>
    </v-container>
  </div>
</template>

<script>
export default {
middleware: 'auth',

  data() {
    return {
      userid: "01",
      chatlog: [
        //チャットデータ
        {
          userid: "05",
          username: "Xavier",
          message: "this workshop provide Happylife for me!!",
          messageSub:'',
          time: "2019/8/29"
        },
        {
          userid: "01",
          username: "国山",
          message: "もったいなきお言葉",
          time: "2019/8/29"
        },
        {
          userid: "05",
          username: "Xavier",
          message: "this workshop provide Happylife for me!!",
          messageSub:'',
          time: "2019/8/29"
        },
        {
          userid: "05",
          username: "Xavier",
          message: "Exiting!!!",
          time: "2019/8/29"
        },
        {
          userid: "05",
          username: "Xavier",
          message: "this workshop provide Happylife for me!!",
          messageSub:'',
          time: "2019/8/29"
        },
        {
          userid: "01",
          username: "国山",
          message: "ありがとうございます",
          time: "2019/8/29"
        },
        {
          userid: "05",
          username: "Xavier",
          message: "this workshop provide Happylife for me!!",
          messageSub:'',
          time: "2019/8/29"
        },
        {
          userid: "01",
          username: "国山",
          message: "もったいなきお言葉",
          time: "2019/8/29"
        },
        {
          userid: "05",
          username: "Xavier",
          message: "this workshop provide Happylife for me!!",
          messageSub:'',
          time: "2019/8/29"
        },
        {
          userid: "01",
          username: "国山",
          message: "もったいなきお言葉",
          time: "2019/8/29"
        },
      ]
    };
  },
  methods:{
      userSwitch(){
          if(this.userid == '01'){
              this.userid = '05'
          }else{
              this.userid = '01'
          }
      }
  },
  computed:{
      nowuser(){
          return this.userid == '05' ? '国山':'Xavier'
      }
  }
};
</script>

<style>
#workshop_body {
  display: flex;
  width: 100%;
}

#workshop_nav {
  padding-top: 40px;
  padding-left: 10px;
  border: 1.2px solid #DEE5EC;
  border-width: 1.2px 1.2px 1.2px 0;
  background-color: #ffffff;
}

#workshop_nav ul {
  list-style: none;
}

#workshop_nav li {
  font-size: 12px;
  cursor: pointer;
  color: #777777;
  margin-bottom: 30px;
}

#workshop_nav li:hover {
  cursor: pointer;
  color: rgb(66, 185, 0);
}
#workshop_nav li.check {
  color: rgb(66, 185, 0);
}

#sub_title{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1.2px solid #e6e6e6;
  margin-bottom: 10px;
}
</style>