<template>
  <div class="container">
    <div id="receipt">
      <div style="display: flex;">
        <h2 id="graphtitle" class="mincho">領収証</h2>
        <h3 id="number" class="mincho">No.　　0002</h3>
      </div>
      <div id="date" class="mincho"></div>
      <div id="send">
        <div id="customer_name" class="mincho">{{ details[0].user_name }}</div>
        <div style="width: 100px;font-weight: bold;" class="mincho">様</div>
      </div>
      <div id="paybox">
        <div class="mincho" style="width: 100px;text-align: center;font-weight: bold;">税込金額</div>
        <div id="money" class="mincho">¥ {{exprice(details[0].price_all + (details[0].price_all * tax) )}}-</div>
      </div>
      <div id="description">
        <div style="margin-bottom: 20px;width: 100%;" class="mincho">但</div>
        <div class="mincho" style="margin-bottom: 40px;">上記金額を正に領収しました</div>
        <div class="mincho" style="width: 100%;">{{ year }}年   {{ month }}月   {{ day }}日</div>
      </div>
      <div id="my_shop">
        <div style="width: 100px;height: 100px;border: 1px solid #222222;"></div>
        <div id="info">
          <div class="mincho">〒{{ workshop_data.postal_code }}</div>
          <div class="mincho">{{ workshop_data.address }}</div>
          <div class="mincho">{{ workshop_data.shop_name }}</div>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;width: 50px;height: 50px;border: 1px solid #222222;" class="mincho">領</div>
      </div>
    </div>
    <form style="width: 100%;">
      <div style="width: 100%;margin: 20px 0 20px 0;text-align: center;" class="no-print">
        <v-btn color="info" width="200px" @click="print" depressed>印刷</v-btn>
        <v-btn color="grey" width="200px" @click="$router.push(`/client/myshop/order/${$route.params.print}`)" depressed>キャンセル</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';

export default {
middleware: 'auth',

  data() {
    return {
      ordernumber: this.$route.params.print,
      year: null,
      month: null,
      day: null,
      tax: 0.1,
    };
  },
  async mounted() {
    if(!this.loginuserdata.user_data) return
    await this.getShopdata({wsid:this.loginuserdata.user_data.shop_id})
    await this.getOrderdetail({wsid:this.loginuserdata.user_data.shop_id,order_number:this.$route.params.print})
    var today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.day = today.getDate();
  },
  methods: {
    print() {
      window.print();
    },
    exprice(val){
      return val.toLocaleString();
    },
    ...mapActions('workshop_manage',['getShopdata','getOrderdetail'])
  },
  computed:{
    ...mapGetters('workshop_manage',['workshop_data','details']),
    ...mapGetters(['loginuserdata'])
  }
};
</script>

<style scoped>

#receipt {
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 4px gray;
  padding: 20px 70px 20px 70px;
}

#number {
  width: 350px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 18px;
  border: 1.2px solid #222222;
  border-width: 0 0 1.2px 0;
  margin-left: 100px;
}

#graphtitle {
  font-size: 38px;
  width: 500px;
  text-align: center;
  border: 1.5px solid #222222;
  border-width: 0 0 1.5px 0;
}

.mincho {
  font-family: serif;
}

#date {
  width: 950px;
  text-align-last: right;
  color: #666666;
  font-size: 13px;
}

.container {
  font-family: "ヒラギノ明朝 ProN W6", "HiraMinProN-W6", "HG明朝E",
    "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
  padding: 20px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.links {
  padding-top: 15px;
}

#send {
  margin-top: 50px;
  display: flex;
  align-items: center;
  width: 700px;
  border: 1.5px solid #222222;
  border-width: 0 0 1.5px 0;
}

#customer_name {
  font-weight: bold;
  width: 600px;
  font-size: 30px;
  text-align: center;
}

#paybox {
  display: flex;
  margin-top: 20px;
  width: 950px;
  height: 100px;
  border: 6px double #111111;
  border-width: 6px 0;
}

#money {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 90px;
  font-size: 30px;
  font-weight: bold;
}

#description{
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 950px;
  padding-left: 100px;
  box-sizing: border-box;
  margin-bottom: 50px;
}

#my_shop{
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  width: 950px;
  padding-left: 100px;
  box-sizing: border-box;
}

#info{
  margin-left: 100px;
  width: 300px;
}

@media print {
  #receipt{
    box-shadow: 0 0 0px gray;
  }
  .no-print {
    display: none;
  }
}

@page {
  size: B5 landscape;
  margin: 0mm;
}
</style>
