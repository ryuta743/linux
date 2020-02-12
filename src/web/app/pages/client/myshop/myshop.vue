<template>
  <div id="workshop_body">
    <div style="min-height: 100vh;width: 15%;" id="workshop_nav" v-if="haveWorkshop">
      <ul>
        <li @click="$router.push('/client/myshop/myshop')" class="check"><v-icon>mdi-home</v-icon> 管理ツールトップ</li>
        <li @click="$router.push('/client/myshop/orderlist')"><v-icon>mdi-format-list-checks</v-icon> 注文一覧</li>
        <li @click="$router.push('/client/myshop/sales')"><v-icon>mdi-chart-bar</v-icon> 売上一覧</li>
        <li @click="$router.push('/client/myshop/sales_trend')"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
        <li @click="$router.push('/client/myshop/products')"><v-icon>mdi-format-list-bulleted</v-icon> 商品一覧・在庫状況</li>
        <li @click="$router.push('/client/myshop/discount')">
          <v-icon>mdi-cash-usd</v-icon> セット割引
        </li>
        <li @click="$router.push('/client/myshop/productadd')"><v-icon>mdi-plus</v-icon> 新規商品登録</li>
        <li @click="$router.push('/client/myshop/productdel')"><v-icon>mdi-close</v-icon> 商品編集・削除</li>
        <li @click="$router.push('/client/myshop/chat')"><v-icon>mdi-chat</v-icon> チャットメッセージ</li>
      </ul>
    </div>
    <v-container grid-list-xs style="width: 85%;">
      <v-btn color="info" icon :loading="loading" v-if="loading" large></v-btn>
      <v-content v-if="!loading">
        <div id="sub_title">
          <h3>
            <v-icon>mdi-home</v-icon>
            工房管理ツールトップ
            <!-- <v-switch label="工房を持っている" v-model="haveWorkshop"></v-switch> -->
          </h3>
        </div>
            <v-layout row wrap>
              <v-flex xs12 md12 v-if="!haveWorkshop">
                <v-btn
                  color="info"
                  style="width: 100%;height: 500px;"
                  @click="$router.push('/client/myshop/create')"
                >
                  <h3>マイ工房設立</h3>
                </v-btn>
              </v-flex>
              <v-flex xs12 md12 v-if="haveWorkshop">              
                <div id="ws_background">
                  <div id="imgs">
                    <div id="header_img">
                      <v-lazy-image style="width: 100%;opacity: 0.5;" src="https://firebasestorage.googleapis.com/v0/b/hackmdbase-57369.appspot.com/o/tenshokuheader.jpg?alt=media&token=8f7e8a3a-b5e2-497e-9110-c251ad18c8aa"></v-lazy-image>
                    </div>
                    <div id="ws_posi">
                      <div id="ws_icon">
                        <img :src=workshop_data.shop_img style="width: 100px;height: 100px;object-fit: cover;" />
                      </div>
                      <div id="ws_name"><v-icon color="white" small>mdi-hammer</v-icon>{{ workshop_data.shop_name }}</div>
                    </div>
                  </div>
                  <div id="access_graph">
                    <div id="graph">
                      <h4>累計アクセス数</h4>
                      <access :chart-data="datacollection" :options="options" width="80%" ></access>
                    </div>
                  </div>
                  <div style="width: 1%;height:500px;"></div>
                  <div id="ws_info">
                    <table style="width: 80%;color: #555;">
                      <tr>
                        <td>工房名</td>
                        <td>{{ workshop_data.shop_name }}</td>
                      </tr>
                      <tr>
                        <td>管理人</td>
                        <td>{{ loginuserdata.user_data.user_name }}</td>
                      </tr>
                      <tr>
                        <td>工房説明文</td>
                        <td>{{ workshop_data.shop_description }}</td>
                      </tr>
                      <tr>
                        <td>郵便番号</td>
                        <td>{{ workshop_data.postal_code }}</td>
                      </tr>
                      <tr>
                        <td>住所</td>
                        <td>{{ workshop_data.address }}</td>
                      </tr>
                      <tr>
                        <td>仕事依頼用メールアドレス</td>
                        <td>{{ workshop_data.work_mail }}</td>
                      </tr>
                    </table>
                  </div>                 
                </div>
              </v-flex>
            </v-layout>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      loading: true,
      haveWorkshop: false,
      datacollection: null,
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "(月)"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 50
              }
            }
          ]
        }
      }
    };
  },
  async mounted() {
    if(this.loginuserdata.user_data.shop_id){
      await this.getShopdata({wsid:this.loginuserdata.user_data.shop_id})
      this.loading = false
      this.haveWorkshop = true
    }else{
      if(this.loginuserdata.user_data && this.loginuserdata.user_data.user_type == 1){
        this.loading = false
      }
    }
    if (process.client) {
      this.fillData();
    }
  },
  methods:{
    async fillData() {
      this.datacollection = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: [
          {
            label: "アクセス数",
            data: [10, 20, 30, 40, 50, 55, 58, 70, 98, 120, 143, 155],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1
          }
        ]
      };
    },
    ...mapActions('workshop_manage',['getShopdata'])
  },
  computed:{
    ...mapGetters('workshop_manage',['workshop_data']),
    ...mapGetters(['loginuserdata'])
  }
};
</script>

<style scoped>
#sub_title {
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1.2px solid #e6e6e6;
  margin-bottom: 10px;
}

#workshop_body{
  display: flex;
  width: 100%;
}

#workshop_nav{
  padding-top: 40px;
  padding-left: 10px;
  border: 1.2px solid #DEE5EC;
  border-width: 1.2px 1.2px 1.2px 0;
  background-color: #ffffff;
}

#workshop_nav ul{
  list-style: none;
}

#workshop_nav li{
  font-size: 12px;
  cursor: pointer;
  color: #777777;
  margin-bottom: 30px;
}

#workshop_nav li:hover{
  cursor: pointer;
  color: rgb(66,185,0);
}
#workshop_nav li.check{
  color: rgb(66,185,0);
}

#ws_background{
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  height: 750px;
}

#imgs{
  width: 100%;
  position: relative;
}

#header_img{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  z-index: 1;
  background-color: #000000;
}

#ws_posi{
  width: 100px;
  height: 130px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 2;
}

#ws_name{
  color: #efefef;
  font-weight: bold;
  width: 100px;
  height: 30px;
  text-align: center;

}

#ws_icon{
  background-color: #e6e6e6;
  width: 100px;
  height: 100px;
  border-radius: 300px;
  overflow: hidden;
}

#access_graph{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 49%;
  height: 400px;
  box-sizing: border-box;
  border: 1.2px solid #e2e2e2;
  border-radius: 4px;
  background-color: #ffffff;
}

#ws_info{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 50%;
  height: 400px;
  box-sizing: border-box;
  border: 1.2px solid #e2e2e2;
  border-radius: 4px;
  background-color: #ffffff;
}

#graph{
  margin: 0 auto;
  width: 80%;
}

table{
  font-size: 14px;
  border-collapse: collapse;
  border-spacing: 0;
}

table td{
  border-bottom: 1.2px solid #efefef;
  padding: 10px;
}

.v-lazy-image {
  opacity: 0;
  transition: opacity .4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}

</style>