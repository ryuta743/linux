<template>
  <div class="container">
    <div id="receipt">
      <div style="display: flex;">
        <h2 id="graphtitle" class="gosi">INVOICE</h2>
      </div>
      <div style="width: 650px;">
        <div id="hiduke" class="gosi" style="margin:  0 0 0 auto;">
             <v-layout row wrap>
                 <div><b class="gosi">インボイス作成日(Date):</b></div>
                 <div class="gosi">October 20,2019</div>
             </v-layout>
             <div class="gosi" style="padding-left: 125px;">Japan</div>
        </div>
      </div>
      <div id="date" class="gosi"></div>

      <div id="boxs">
          <div id="leftbox">
              <div id="sender">
                  <h5 class="gosi">ご依頼主<small class="gosi">(Sender):</small></h5>
                  <div class="gosi" style="font-size: 12px;padding-top: 10px;padding-left: 5px;">
                      <!-- Takashi Kuwahata -->{{ loginuserdata.user_data.user_name }}<br>
                      <!-- 13-2,Gohonmatsu 1-chome -->{{ workshop_data.address }}<br>
                      <!-- Mimatachou,MIYAZAKI --><br>
                      {{ workshop_data.postal_code }},JAPAN<br>
                      TEL:0986-27-7307
                  </div>
              </div>
              <div id="addressee">
                  <h5 class="gosi">お届け先<small class="gosi">(Addressee):</small></h5>
                  <div class="gosi" style="font-size: 12px;padding-top: 10px;padding-left: 5px;">
                      <!-- Takashi Kuwahata -->{{ loginuserdata.user_data.user_name }}<br>
                      <!-- 13-2,Gohonmatsu 1-chome -->{{ workshop_data.address }}<br>
                      <!-- Mimatachou,MIYAZAKI --><br>
                      {{ workshop_data.postal_code }},JAPAN<br>
                      TEL:0986-27-7307
                  </div>
              </div>
          </div>
          <div id="rightbox">
              <div id="mailitem">
                  <h5 class="gosi">郵便物番号<small class="gosi">(Mail item No.):</small></h5>
              </div>
              <div id="shipped">
                  <h5 class="gosi">送達手段<small class="gosi">(Shipped Per):</small></h5>
                  <div class="gosi" style="font-size: 11px;padding-left: 10px;">
                      EMS　・　クーリエ
                  </div>
              </div>
              <div id="payment">
                  <h5 class="gosi">支払い手段<small class="gosi">(Terms of Payment):</small></h5>
              </div>
              <div id="remarks" class="gosi">
                  <h5 class="gosi">備考<small class="gosi">(Remarks):</small></h5>
                  <div style="font-size: 13px;">□有償 (Commercial value)</div>
                  <div style="font-size: 13px;">□無償 (No Commercial value)</div>
                  <div style="font-size: 10px;">　　□贈物(Gift)　□商品見本(Sample)　□その他(Other)</div>
              </div>
          </div>
      </div>

      <div class="gosi" style="padding-top: 10px;">
        <table border="1" style="border-collapse: collapse">
            <tr>
                <th class="gosi" style="width: 250px;font-size: 11px;">内容品の記載<br>(Description)</th>
                <th class="gosi" style="width: 75px;font-size: 11px;height: 50px;">正味重量<br>(weight kg)</th>
                <th class="gosi" style="width: 50px;font-size: 9px;">数量<br>(Quantity)</th>
                <th class="gosi" style="width: 75px;font-size: 11px;">単価<br>(UnitPrice)</th>
                <th class="gosi" style="width: 190px;font-size: 11px;">金額<br>(TotalAmount)</th>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[0] ? details[0].product_name:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;"></td>
                <td class="gosi" style="width: 50px;text-align: end;">{{ details[0] ? details[0].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[0] ? exprice(details[0].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[0] ? exprice(details[0].price * details[0].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[1] ? details[1].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[1] ? details[1].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[1] ? exprice(details[1].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[1] ? exprice(details[1].price * details[1].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[2] ? details[2].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[2] ? details[2].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[2] ? exprice(details[2].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[2] ? exprice(details[2].price * details[2].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[3] ? details[3].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[3] ? details[3].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[3] ? exprice(details[3].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[3] ? exprice(details[3].price * details[3].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[4] ? details[4].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[4] ? details[4].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[4] ? exprice(details[4].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[4] ? exprice(details[4].price * details[4].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[5] ? details[5].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[5] ? details[5].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[5] ? exprice(details[5].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[5] ? exprice(details[5].price * details[5].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[6] ? details[6].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[6] ? details[6].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[6] ? exprice(details[6].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[6] ? exprice(details[6].price * details[6].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[7] ? details[7].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[7] ? details[7].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[7] ? exprice(details[7].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[7] ? exprice(details[7].price * details[7].count):'' }}円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;">{{ details[8] ? details[8].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[8] ? details[8].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[8] ? exprice(details[8].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[8] ? exprice(details[8].price * details[8].count):'' }}円</td>
            </tr>
            <tr>    
                <td class="gosi" style="width: 250px;">{{ details[9] ? details[9].product_name:'' }}</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;">{{ details[9] ? details[9].count:'' }}</td>
                <td class="gosi" style="width: 75px;text-align: end;">{{ details[9] ? exprice(details[9].price):'' }}円</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{ details[9] ? exprice(details[9].price * details[9].count):'' }}円</td>
            </tr>
            <tr>    
                <td class="gosi" style="width: 250px;text-align: center;">総合計(Total)</td>
                <td class="gosi" style="text-align: end;">kg</td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;font-size:8px;">F.O.B.JAPAN</td>
                <td class="gosi" style="width: 190px;text-align: end;">{{exprice(sumAll())}}円</td>
            </tr>
        </table>
    　</div>
      <div style="margin-top: 10px;width: 640px;display: flex;">
          <table style="margin-top: 20px;">
              <tr> 
                  <td class="gosi">郵便物の個数（Number of pieces)　</td>
                  <td class="gosi" style="text-align: right;">　個</td>
              </tr>
              <tr>
                  <td class="gosi">総重量(Gross weight) Kg</td>
                  <td class="gosi">　　kg</td>
              </tr>
              <tr>
                  <td class="gosi">原産国(Country of Origin)</td>
                  <td class="gosi">JAPAN</td>
              </tr>
          </table>
          <div style="margin-left: 50px;box-sizing: border-box;padding-top: 45px;border-bottom: 1px solid #222222;width: 250px;">
              <h5 class="gosi">署名(Signature)</h5>
          </div>
      </div>
    </div>
    <form style="width: 100%;">
      <div style="width: 100%;margin: 20px 0 20px 0;text-align: center;" class="no-print">
        <v-btn color="info" width="200px" @click="print">印刷</v-btn>
        <v-btn color="grey" width="200px" @click="$router.push(`/client/myshop/order/${$route.params.invoice}`)">キャンセル</v-btn>
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
        address: {},
        items:[]
    };
  },
  async mounted() {
    if(!this.loginuserdata.user_data) return
    await this.getShopdata({wsid:this.loginuserdata.user_data.shop_id})
    await this.getOrderdetail({wsid:this.loginuserdata.user_data.shop_id,order_number:this.$route.params.invoice})
    await this.getOrderlist({wsid:this.loginuserdata.user_data.shop_id})
    var today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.day = today.getDate();
    this.items = this.details;
  },
  methods: {
    sumAll(){
        var sum = 0;
        for(var i=0;i<this.details.length;i++){
          sum += this.details[i].price * this.details[i].count
        }
        return sum;
    },
    print() {
      window.print();
    },
    exprice(val){
      return val.toLocaleString();
    },
    ...mapActions('workshop_manage',['getShopdata','getOrderdetail','getOrderlist'])
  },
  computed:{
    ...mapGetters('workshop_manage',['workshop_data','details','orderlist']),
    ...mapGetters(['loginuserdata'])
  }
};
</script>

<style scoped>
table td{
    box-sizing: border-box;
    padding: 5px;
    height: 20px;
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
  font-size: 12px;
  width: 250px;
  box-sizing: border-box;
}

#graphtitle {
  font-size: 25px;
  width: 300px;
  text-align: center;
  margin: 0 auto 10px auto;
}

.mincho {
  font-family: serif;
}

.gosi{
  font-family: arial;
}

#date {
  width: 550px;
  
  color: #666666;
  font-size: 13px;
}

.container {
  font-family: "ヒラギノ明朝 ProN W6", "HiraMinProN-W6", "HG明朝E",
    "ＭＳ Ｐ明朝", "MS Pgosi", "MS 明朝", serif;
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

#boxs{
  display: flex;
  width: 641px;
  height: 300px;
  border: 1.2px solid #222222;  
}

#leftbox{
  width: 320px;
  height: 300px;
  border-right: 1px solid #222222
}

#sender{
    width: 320px;
    height: 149px;
    border-bottom: 1px solid #222222;
}

#addressee{
    width: 320px;
    height: 150px;
}

#rightbox{
    width: 320px;
    height: 300px;
}

#mailitem{
    width: 320px;
    height: 89px;
    border-bottom: 1px solid #222222;
}

#shipped{
    width: 320px;
    height: 49px;
    border-bottom: 1px solid #222222;
}

#payment{
    width: 320px;
    height: 49px;
    border-bottom: 1px solid #222222;
}

#remarks{
    width: 320px;
    height: 110px;
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
