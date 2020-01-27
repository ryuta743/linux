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
                      Takashi Kuwahata<br>
                      13-2,Gohonmatsu 1-chome<br>
                      Mimatachou,MIYAZAKI<br>
                      889-1902,JAPAN<br>
                      TEL:0986-27-7307
                  </div>
              </div>
              <div id="addressee">
                  <h5 class="gosi">お届け先<small class="gosi">(Addressee):</small></h5>
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
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="width: 75px;text-align: end;"></td>
                <td class="gosi" style="width: 50px;text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
            </tr>
            <tr>    
                <td class="gosi" style="width: 250px;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="text-align: end;"></td>
                <td class="gosi" style="width: 75px;text-align: end;">円</td>
                <td class="gosi" style="width: 190px;text-align: end;">円</td>
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
export default {
  data() {
    return {
        items:[
            {
                user_name: '桒畑 天',
                count: 4,
                price: 1200,
                product_name: '砂岩模様のこだわりプレート',
                product_number:1
            },{
                user_name: '桒畑 天',
                count: 4,
                price: 1200,
                product_name: '砂岩模様のこだわりプレート',
                product_number:2
            },{
                user_name: '桒畑 天',
                count: 4,
                price: 1200,
                product_name: '砂岩模様のこだわりプレート',
                product_number:3
            },{
                user_name: '桒畑 天',
                count: 4,
                price: 1200,
                product_name: '砂岩模様のこだわりプレート',
                product_number:4
            },{
                user_name: '桒畑 天',
                count: 4,
                price: 1200,
                product_name: '砂岩模様のこだわりプレート',
                product_number:5
            },{
                user_name: '桒畑 天',
                count: 4,
                price: 1200,
                product_name: '砂岩模様のこだわりプレート',
                product_number:6
            }
        ]
    };
  },
  mounted() {
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
