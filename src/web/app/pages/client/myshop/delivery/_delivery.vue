<template>
  <div class="container">
    <div id="receipt">
      <div id="send" style="margin-bottom:10px;">
        <div id="customer_name" class="mincho">{{ details[0] ? details[0].user_name:'' }}</div>
        <div style="width: 100px;font-weight: bold;" class="mincho">様</div>
      </div>
      <div style="width: 650px;">
        <div id="hiduke" class="mincho" style="margin:  0 0 0 auto;">日付　{{ year }}年{{ month }}月{{ day }}日</div>
        <div id="hiduke" class="mincho" style="margin:  0 0 0 auto;">{{ workshop_data.shop_name }}</div>
        <div id="hiduke" class="mincho" style="margin:  0 0 0 auto;">TEL:0986-27-7307</div>
      </div>
      <div style="display: flex;">
        <h2 id="graphtitle" class="mincho">納品書</h2>
      </div>
      <div id="date" class="mincho"></div>
      <div class="mincho">
        下記の通り納品いたしました
        <table border="1" style="border-collapse: collapse">
            <tr>
                <th class="mincho" style="width: 50px;font-size: 11px;">商品番号</th>
                <th class="mincho" style="width: 250px;">品名</th>
                <th class="mincho" style="width: 75px;">数量</th>
                <th class="mincho" style="width: 75px;">単価</th>
                <th class="mincho" style="width: 190px;">金額</th>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[0] ? items[0].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[0] ? items[0].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[0] ? items[0].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[0] ? items[0].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[0] ? items[0].price * items[0].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[1] ? items[1].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[1] ? items[1].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[1] ? items[1].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[1] ? items[1].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[1] ? items[1].price * items[1].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[2] ? items[2].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[2] ? items[2].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[2] ? items[2].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[2] ? items[2].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[2] ? items[2].price * items[2].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[3] ? items[3].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[3] ? items[3].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[3] ? items[3].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[3] ? items[3].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[3] ? items[3].price * items[3].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[4] ? items[4].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[4] ? items[4].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[4] ? items[4].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[4] ? items[4].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[4] ? items[4].price * items[4].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[5] ? items[5].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[5] ? items[5].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[5] ? items[5].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[5] ? items[5].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[5] ? items[5].price * items[5].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[6] ? items[6].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[6] ? items[6].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[6] ? items[6].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[6] ? items[6].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[6] ? items[6].price * items[6].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[7] ? items[7].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[7] ? items[7].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[7] ? items[7].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[7] ? items[7].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[7] ? items[7].price * items[7].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[8] ? items[8].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[8] ? items[8].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[8] ? items[8].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[8] ? items[8].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[8] ? items[8].price * items[8].count:'')}}円</td>
            </tr>
            <tr>
                <td class="mincho" style="width: 50px;text-align: center;">{{items[9] ? items[9].product_number:''}}</td>
                <td class="mincho" style="width: 250px;">{{items[9] ? items[9].product_name:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{items[9] ? items[9].count:''}}</td>
                <td class="mincho" style="width: 75px;text-align: end;">{{exprice(items[9] ? items[9].price:'')}}円</td>
                <td class="mincho" style="width: 190px;text-align: end;">{{exprice(items[9] ? items[9].price * items[9].count:'')}}円</td>
            </tr>
        </table>
        <div style="width:650px;display: flex;">
          <div style="width: 375px;height: 30px;"></div>
          <table border="1" style="border-collapse: collapse">
              <tr>
                  <td style="height: 10px;text-align: center;" class="mincho">
                      小計
                  </td>
                  <td colspan="3" style="width: 190px;text-align: end;" class="mincho">{{exprice(sumAll())}}円</td>
              </tr>
              <tr>
                  <td style="height: 10px;text-align: center;" class="mincho">
                      消費税
                  </td>
                  <td colspan="3" style="text-align: end;" class="mincho">{{exprice(sumAll() * 0.1)}}円</td>
              </tr>
              <tr>
                  <td style="height: 10px;text-align: center;" class="mincho">
                      合計金額
                  </td>
                  <td colspan="3" style="text-align: end;" class="mincho">{{exprice(sumAll() + (sumAll() * 0.1))}}円</td>
              </tr>
          </table>
        </div>
        <div id="send_day">
          <div class="mincho">発送日　　　　年　　月　　日</div>
          <div class="mincho">着予定日　　　年　　月　　日</div>
        </div>
        <!-- <div style="display: flex;align-items: flex-end;">
            <div style="width: 70px;height: 70px;border: 1.2px solid #111;margin-top: 10px;"></div>
            <div class="mincho" style="margin-left: 10px;">天職工房</div>
        </div> -->
    　</div>
    </div>
    <form style="width: 100%;">
      <div style="width: 100%;margin: 20px 0 20px 0;text-align: center;" class="no-print">
        <v-btn color="info" width="200px" @click="print">印刷</v-btn>
        <v-btn color="grey" width="200px" @click="$router.push(`/client/myshop/order/${$route.params.delivery}`)">キャンセル</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
        year: null,
        month: null,
        day: null,
        items:[]
    };
  },
  async mounted() {
    if(!this.loginuserdata.user_data) return
    await this.getShopdata({wsid:this.loginuserdata.user_data.shop_id})
    await this.getOrderdetail({wsid:this.loginuserdata.user_data.shop_id,order_number:this.$route.params.delivery})
    var today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.day = today.getDate();
    this.items = this.details
  },
  methods: {
    sumAll(){
        var sum = 0;
        this.items.forEach(element => {
            sum += element.price * element.count;
        })
        return sum;
    },
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
table td{
    box-sizing: border-box;
    padding: 5px;
    height: 50px;
}

#receipt {
  box-sizing: border-box;
  padding: 50px 100px;
}

#number {
  width: 200px;
  box-sizing: border-box;
  border: 1.2px solid #222222;
  border-width: 0 0 1.2px 0;
}

#hiduke{
  width: 180px;
  box-sizing: border-box;
}

#graphtitle {
  font-size: 38px;
  width: 300px;
  text-align: center;
  margin: 0 auto;
}

.mincho {
  font-family: serif;
}

#date {
  width: 550px;
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
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 250px;
  border: 1.2px solid #222222;
  border-width: 0 0 1.2px 0;
}

#send_day{
  text-align: center;
  width: 500px;
  margin: 0 auto;
}

#send_day div{
  padding-top: 40px;
}

#customer_name {
  font-weight: bold;
  width: 250px;
  font-size: 30px;
  text-align: center;
}

@media print {
  .no-print {
    display: none;
  }
}

@page {
  size: A4;
  margin: 0mm;
}
</style>
