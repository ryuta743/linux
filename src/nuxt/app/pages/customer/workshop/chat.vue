<template>
  <v-container grid-list-xs>
    <v-content>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>back
      </v-btn>
      <v-toolbar color="orange">
        <v-toolbar-title style="color: white;">ゆう工房</v-toolbar-title>
        <v-toolbar-items style="padding-left: 10px;">
          <v-btn outlined @click="userSwitch">{{ nowuser }}ボタン</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card scrollable style="height: 80vh;">
        <v-card-text scrollable　style="overflow:scroll;height: 70vh;background-color: #e9e9e9;">
          <v-flex
            xs12
            md12
            v-for="(item, index) in chatlogs"
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
                  <div
                    v-if="item.messageSub"
                    style="color: #666;"
                    transition="slide-x-transition"
                  >({{item.messageSub}})</div>
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
                  <v-text-field outlined label="メッセージ" v-model="message"></v-text-field>
                </v-flex>
                <v-flex xs1 md1>
                  <v-btn style="width: 100%;height: 55px;" color="orange" dark @click="sendChatReq()">送信</v-btn>
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
import {mapGetters,mapActions} from 'vuex';

export default {
  data() {
    return {
      userid: "05",
      username: 'Xavier',
      message: '',
      chatlog: [
        //チャットデータ
        {
          userid: "05",
          username: "Xavier",
          message: "this workshop provide Happylife for me!!",
          messageSub: "",
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
          messageSub: "",
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
          messageSub: "",
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
          messageSub: "",
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
          messageSub: "",
          time: "2019/8/29"
        },
        {
          userid: "01",
          username: "国山",
          message: "もったいなきお言葉",
          time: "2019/8/29"
        }
      ]
    };
  },
  async mounted(){
    const payload = {
      wsid: '80000000'
    }
    await this.openChat({payload});
  },
  methods: {
    userSwitch() {
      if (this.userid == "01") {
        this.userid = "05";
        this.username = "Xavier"
      } else {
        this.userid = "01";
        this.username = "国山";
      }
    },
    async sendChatReq(){
      if(this.message == '') return
      const payload = {
        wsid: '80000000',
        userid: this.userid,
        username: this.username, 
        message: this.message
      }
      try{
        await this.sendChat({payload});
      }catch(e){
        console.log('エラーが発生しました:' + e);
      }
      this.message = '';
      return true;
    },
    ...mapActions('realtimechat',['openChat','sendChat'])
  },
  computed: {
    nowuser() {
      return this.userid == "05" ? "国山" : "Xavier";
    },
    ...mapGetters('realtimechat',['chatlogs'])
  },
};
</script>

<style>
</style>