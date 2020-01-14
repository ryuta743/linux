<template>
  <v-container grid-list-xs>
    <v-content>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>back
      </v-btn>
      <v-card>
        <v-card-text>
          <v-flex xs12 md12>
            <img src="https://picsum.photos/1500/600?random=1" alt style="width: 100%;" />
          </v-flex>
          <v-flex xs12 md12>
            <v-card>
              <v-card-title primary-title>{{$route.params.product}}</v-card-title>
              <v-card-text style="height: 8px;">
                <v-layout row wrap align-center>
                  <v-rating
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    v-model="item.rating"
                    readonly
                    half-increments
                  ></v-rating>
                  ({{item.rating}})
                </v-layout>
              </v-card-text>
              <v-card-text>
                出品工房:
                <nuxt-link :to="`../workshop/${item.creater}`">{{item.creater}}</nuxt-link>
              </v-card-text>
              <v-card-text style="font-weight: bold;">{{item.description}}</v-card-text>
              <v-card-text>
                関連づけられたタグ:
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
              <v-divider></v-divider>
              <v-card-actions>
                <v-layout row wrap>
                  <v-flex xs12 md2>
                    <v-btn color="success" style="width: 100%;">
                      <v-icon>mdi-cart</v-icon>カートに追加
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md2>
                    <v-btn color="yellow darken-4" dark outlined style="width: 100%;">
                      <v-icon>mdi-star</v-icon>お気に入りに追加
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md2>
                    <v-btn color="info" dark outlined style="width: 100%;" @click="circleOpen">
                      <v-icon>mdi-flattr</v-icon>360°
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-subheader>この商品を評価する</v-subheader>
          <v-rating></v-rating>
          <v-layout row wrap justify-center>
            <v-flex xs9 md11>
              <v-text-field label placeholder="商品レビュー" outlined></v-text-field>
            </v-flex>
            <v-flex xs2 md1>
              <v-btn color="success" style="height: 55px;width: 100%;">送信</v-btn>
            </v-flex>
          </v-layout>
          <v-divider />
        </v-card-text>
        <v-card-text v-for="(item, index) in reviews" :key="index">
          {{item.name}}
          <v-layout row wrap align-center>
            <v-rating
              v-model="item.rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              readonly
              size="19px"
            />
            ({{item.rating}})
          </v-layout>
          {{item.review}}
          <v-divider style="margin-top: 5px;"></v-divider>
        </v-card-text>
      </v-card>

      <v-dialog v-model="circle" persistent :overlay="false" transition="dialog-transition">
        <v-card style="background-color: #999;">
          <v-layout row wrap align-center>
            <v-flex xs12 md3>
              <v-card-text style="background-color: #999;">
                <div id="fyu_7u5u1lu09a" class="fyu_container fyu_vertical"></div>
              </v-card-text>
            </v-flex>
            <v-flex xs12 md9 style="background-color: #999;">
              <v-card-text style="text-align: center;background-color: #999;color: white;">
                <v-icon color="primary" size="50px">mdi-flattr</v-icon>
              </v-card-text>
              <v-card-text style="color: #555;font-size: 28px;text-align: center;color: white;background-color: #999;">
                ドラッグで写真を回してください!<br>
                Drag to rotate the photo!
              </v-card-text>
              <v-card-text style="color: #555;font-size: 28px;text-align: center;color: white;background-color: #999;">
                <v-btn color="info" @click="reload">close</v-btn>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-content>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      script: [{ src: "https://fyu.se/embed?v=2.0" }]
    };
  },
  mounted() {
    /* aa: FYU.add("7u5u1lu09a", "fyu_7u5u1lu09a", { nologo: 1 }); */
  },
  data() {
    return {
      circle: false,
      item: {
        title: "",
        rating: 4.5,
        tags: ["陶器", "食卓"],
        description: "とてもいい品です",
        creater: "ゆう工房"
      },
      reviews: [
        {
          name: "寺田神",
          review: "この商品を買ったその日から、僕の人生は変わりました。",
          rating: 5.0
        },
        {
          name: "寺田神アンチ",
          review: "とてもいい",
          rating: 4.0
        }
      ]
    };
  },
  methods:{
    circleOpen(){
      this.circle = true
      FYU.add("7u5u1lu09a", "fyu_7u5u1lu09a", { nologo: 1 });
    },
    reload() {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>