<template>
  <v-container grid-list-xs>
    <v-content>
      <v-toolbar color="orange">
        <v-toolbar-title style="color: white;">ゆう工房</v-toolbar-title>
        <v-toolbar-items style="padding-left: 10px;">
            <v-btn outlined @click="userSwitch">{{ nowuser }}になるボタン</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>
        <v-btn color="grey" dark @click="$router.push('/client/myshop/myshop')">管理画面へ戻る</v-btn>
      </v-toolbar>
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
</template>

<script>
export default {
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
</style>