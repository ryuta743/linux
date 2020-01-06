<template>
  <v-layout row wrap>
    <v-flex xs12 md12>
      <div style="position: relative;">
        <v-btn style="position: absolute;z-index: 1;top: 65px;left: 25px;" icon @click="$router.go(-1)"><v-icon>mdi-chevron-left</v-icon>back</v-btn>
        <v-img :src="item.src" />
      </div>
    </v-flex>
    <v-flex xs12 md12 style="padding: 10px 0 10px 0;">
      <v-card style="padding: 10px;font-weight: bold;">
        <v-card-title primary-title style="font-size: 25px;">
          {{$route.params.workshop}}
          <span
            style="font-size: 15px;color: #555;padding-left: 10px;font-weight: bold;"
          >〜{{item.subTitle}}〜</span>
        </v-card-title>

        <v-card-text>
          <v-layout row wrap align-center>
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
        </v-card-text>
        <v-card-text>{{item.description}}</v-card-text>
        <v-card-text>
          関連づけられたタグ:
          <v-chip
            class="ma-2"
            color="pink"
            label
            text-color="white"
            v-for="(item, index) in item.tags"
            :key="index"
          >
            <v-icon left>mdi-label</v-icon>
            {{item}}
          </v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12 md2>
              <v-btn color="success" style="width: 100%;">
                <v-icon>mdi-star</v-icon>お気に入りに追加する
              </v-btn>
            </v-flex>
            <v-flex xs12 md2>
              <v-btn
                color="info"
                style="width: 100%;"
                @click="$router.push('/customer/workshop/chat')"
              >
                <v-icon>mdi-chat</v-icon>チャットを送る
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!--  <v-container>
    <v-content style="background-color: #999;">-->
    <v-layout row wrap justify-center>
      <v-flex xs10 md11>
        <v-layout row wrap>
          <v-flex xs12 md4 v-for="(item, index) in products" :key="index" style="padding: 5px;">
            <v-card hover @click="$router.push(`/customer/product/${item.title}`)">
              <v-img src="https://picsum.photos/id/11/500/300"></v-img>
              <v-card-text style="font-weight: bold;height: 8px;">{{item.title}}</v-card-text>
              <v-card-text>
                <v-layout row wrap align-center>
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
              </v-card-text>
              <v-card-text style="height: 8px;">¥{{item.price}}</v-card-text>
              <v-card-text>
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
      </v-flex>
    </v-layout>

    <!-- </v-content>
    </v-container>-->
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      item: {
        title: "ゆう工房",
        rating: 5,
        subTitle: "自然あふれる食卓へ",
        src: "https://picsum.photos/1500/400?random=1",
        tags: ["陶器", "自然"],
        description:
          "便利だけど人為的なものが身の回りに増える現代生活。自然素材なら安心して使うことができます。陶芸は地球の一部を拝借しての楽しい手作り生活です。「ゆう工房」は人為を感じない土味ある焼きものを提案しています。"
      },
      products: [
        {
          title: "陶器01",
          rating: 4.5,
          price: "3000",
          tags: ["陶器", "食卓"]
        },
        {
          title: "陶器02",
          rating: 5,
          price: "3000",
          tags: ["陶器", "食卓"]
        },
        {
          title: "陶器03",
          rating: 3.5,
          price: "3000",
          tags: ["陶器", "食卓"]
        },
        {
          title: "陶器04",
          rating: 1.5,
          price: "3000",
          tags: ["陶器", "食卓"]
        }
      ]
    };
  }
};
</script>

<style>
</style>