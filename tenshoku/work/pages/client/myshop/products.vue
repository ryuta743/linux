<template>
  <v-container grid-list-xs>
    <v-content>
        <v-toolbar dark color="primary">
        <v-toolbar-title>取り扱い商品</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn color="grey" @click="$router.push('/client/myshop/myshop')">管理画面へ戻る</v-btn>
      </v-toolbar>

    　<v-card>
          <v-card-text>
              
          <v-layout row wrap>
            <v-flex
              xs12
              md4
              v-for="(item, index) in products"
              :key="index"
              style="padding: 0 10px 20px 10px;"
            >
              <v-card hover>
                <v-card-text>
                    在庫：{{item.num}}個
                    <v-btn color="success" icon @click="item.num++"><v-icon>mdi-plus</v-icon></v-btn>
                    <v-btn color="red" icon @click="item.num--"><v-icon>mdi-minus</v-icon></v-btn>
                    <v-chip color="red" v-if="item.num < item.warning" dark>安全在庫{{item.warning - item.num}}個不足</v-chip>
                </v-card-text>
                <v-img :src="item.src" @click="$router.push(`/customer/product/${item.title}`)"></v-img>
                <v-card-text style="font-weight: bold;height: 10px;" @click="$router.push(`/customer/product/${item.title}`)">{{item.title}}</v-card-text>
                <v-card-text style="height : 10px;" @click="$router.push(`/customer/product/${item.title}`)">
                  <v-layout row wrap align-center @click="$router.push(`/customer/product/${item.title}`)">
                    <v-rating
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      v-model="item.rating"
                      readonly
                      size="19px"
                      half-increments
                    ></v-rating>
                    ({{item.rating}})
                  </v-layout>
                </v-card-text @click="$router.push(`/customer/product/${item.title}`)">
                <v-card-text style="height: 8px;">¥{{item.price}}</v-card-text>
                <v-card-text @click="$router.push(`/customer/product/${item.title}`)">
                  <v-chip
                    class="ma-2"
                    color="primary"
                    label
                    text-color="white"
                    v-for="(item, index) in item.tags"
                    :key="index"
                  >
                    <v-icon left>mdi-label</v-icon>
                    {{item}}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-flex>
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
      products: [
        {
          title: "陶器01",
          src: "https://picsum.photos/id/11/500/300",
          rating: 4.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ゆう工房",
          num: 32,
          warning: 10
        },
        {
          title: "やばいこけし",
          src: "https://picsum.photos/id/11/500/300",
          rating: 2.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "サバンナ工房",
          num: 12,
          warning: 10
        },
        {
          title: "話題の組紐",
          src: "https://picsum.photos/id/11/500/300",
          rating: 4.9,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "北九州組み紐工房",
          num: 10,
          warning: 10
        },
        {
          title: "組紐",
          src: "https://picsum.photos/id/11/500/300",
          rating: 4.0,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報",
          num: 67,
          warning: 10
        },
        {
          title: "組紐",
          src: "https://picsum.photos/id/11/500/300",
          rating: 3.5,
          price: 3000,
          tags: ["陶器", "食卓"],
          creater: "ここに出品工房情報",
          num: 32,
          warning: 10
        }
      ]
    };
  }
};
</script>

<style>
</style>