<template>
  <v-container>
    <!-- 購入履歴ダイアログ -->
    <v-dialog
      v-model="purchaseHistoryDialog"
      scrollable
      overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card scrollable>
        <v-card-title primary-title style="font-weight: bold;">購入履歴</v-card-title>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">商品名</th>
              <th style="color: #111;">出品工房名</th>
              <th style="color: #111;">購入日</th>
              <th style="color: #111;">価格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(purchaseProduct, index) in purchaseProducts" :key="index">
              <td>{{purchaseProduct.title}}</td>
              <td>{{purchaseProduct.creater}}</td>
              <td>{{purchaseProduct.date}}</td>
              <td>{{purchaseProduct.price}}円</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <!-- お気に入り商品ダイアログ -->
    <v-dialog
      v-model="favProductDialog"
      scrollable
      overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card scrollable>
        <v-card-title primary-title style="font-weight: bold;">お気に入り商品</v-card-title>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">商品名</th>
              <th style="color: #111;">出品工房名</th>
              <th style="color: #111;">価格</th>
              <th style="color: #111;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(favProduct, index) in favProducts" :key="index">
              <td>{{favProduct.title}}</td>
              <td>{{favProduct.creater}}</td>
              <td>{{favProduct.price}}円</td>
              <td>
                <v-btn
                  color="info"
                  outlined
                  @click="$router.push(`/customer/product/${favProduct.title}`)"
                >商品ページへ</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <!-- お気に入り工房ダイアログ -->
    <v-dialog
      v-model="favWorkshopDialog"
      scrollable
      overlay="false"
      max-width="900px"
      transition="dialog-transition"
    >
      <v-card scrollable>
        <v-card-title primary-title style="font-weight: bold;">お気に入り工房</v-card-title>
        <v-simple-table>
          <thead>
            <tr>
              <th style="color: #111;">工房名</th>
              <th style="color: #111;">説明</th>
              <th style="color: #111;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(favWorkshop, index) in favWorkshops" :key="index">
              <td>{{favWorkshop.title}}</td>
              <td>{{favWorkshop.description.slice(0,19)}}...</td>
              <td>
                <v-btn
                  color="info"
                  outlined
                  @click="$router.push(`/customer/workshop/${favWorkshop.title}`)"
                >工房ページへ</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <v-content>
      <h5 style="width: 100%;text-align: center;">登録情報</h5>
      <h4 style="width: 100%;text-align: center;padding: 0 0 5px 0;">REGISTRATION INFORMATION</h4>
      <v-card>
        <v-simple-table>
          <tbody>
            <tr>
              <td>お名前</td>
              <td>{{item.name}}</td>
            </tr>
            <tr>
              <td>国籍</td>
              <td>{{item.countory}}</td>
            </tr>
            <tr>
              <td>登録メールアドレス</td>
              <td>{{item.mail}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-content>
    <v-content>
      <h5 style="width: 100%;text-align: center;">アカウントメニュー</h5>
      <h4 style="width: 100%;text-align: center;padding: 0 0 5px 0;">ACOUNT MENU</h4>
      <v-card>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-btn
              x-large
              color="success"
              outlined
              style="margin: 0 5px 0 5px;"
              @click="favProductDialog = true"
            >
              <v-icon>mdi-star-circle</v-icon>お気に入り商品
            </v-btn>
            <v-btn
              x-large
              color="success"
              outlined
              style="margin: 0 5px 0 5px;"
              @click="favWorkshopDialog = true"
            >
              <v-icon>mdi-star-circle-outline</v-icon>お気に入り工房
            </v-btn>
            <v-btn
              x-large
              color="success"
              outlined
              style="margin: 0 5px 0 5px;"
              @click="purchaseHistoryDialog = true"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>購入履歴
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      item: {
        name: "寺田神",
        countory: "日本(Japan)",
        mail: "terada_manji@hal.co.jp"
      },
      purchaseHistoryDialog: false,
      favWorkshopDialog: false,
      favProductDialog: false,
      purchaseProducts: [
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器02",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器03",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器02",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器03",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器02",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器03",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器02",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器03",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        }
      ],
      favProducts: [
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房"
        },
        {
          title: "陶器02",
          price: 3000,
          creater: "ゆう工房",
          date: "2019/8/29"
        },
        {
          title: "陶器03",
          price: 3000,
          creater: "ゆう工房"
        },
        {
          title: "陶器01",
          price: 3000,
          creater: "ゆう工房"
        },
        {
          title: "陶器02",
          price: 3000,
          creater: "ゆう工房"
        }
      ],
      favWorkshops:[
          {
              title:"ゆう工房",
              description:'便利だけど人為的なものが身の回りに増える現代生活。自然素材なら安心して使うことができます。陶芸は地球の一部を拝借しての楽しい手作り生活です。「ゆう工房」は人為を感じない土味ある焼きものを提案しています。'
          }
      ]
    };
  }
};
</script>

<style>
</style>