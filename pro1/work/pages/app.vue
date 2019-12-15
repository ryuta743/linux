<template>
  <form method="get" @submit.prevent>
    <input type="text" v-model="id" />
    <br />
    <input type="text" v-model="pass" />
    <!-- クリックでメソッドのgetUserDataReqが起動 -->
    <input type="submit" @click="insertDataReq()" />
    <div>{{id}}</div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      id: "",
      pass: ""
    };
  },

  methods: {
    async insertDataReq() {
      const payload = {
        // テキストボックスの値を変数idに格納してそれをpayloadにつめこむ
        id: this.id,
        pass: this.pass
      };
      console.log("inserDataReq:Start");
      console.log("insertDataReq id=" + payload.id);
      console.log("insertDataReq pass=" + payload.pass);
      try {
        //storeのactionのgetUserDataが動く。引数はpayloadを持っていく
        await this.insertData({ payload });
      } catch (e) {
        console.log("エラーが起きました");
      }
    },
    //mapActionsはstoreにあるactionsをthis.で読み込むために書く
    //これのおかげで this.getUserData でstoreのactionsにあるgetUserDataが動く
    ...mapActions("user", ["insertData"])
  },

  computed: {
    //mapGettersはstoreにあるgetterのuserDataをthis.userDataで動くようにする
    ...mapGetters("user", ["insertStatus"])
  }
};

//console.log(this.store.state.userData);
</script>