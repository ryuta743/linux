<template>
  <v-layout>
    <v-flex xs12 sm12 md12>
      <div class="text-center">
        <v-carousel cycle height="750px" show-arrows-on-hover hide-delimiter-background>
          <v-carousel-item>
            <img src="../static/mainVisual05.jpg" alt="メインビジュアル" style="width: 100%;">
          </v-carousel-item>
          <v-carousel-item>
            <img src="../static/mainVisual03.jpg" alt="メインビジュアル" style="width: 100%;">
          </v-carousel-item>
          <v-carousel-item>
            <img src="../static/mainVisual04.jpg" alt="メインビジュアル" style="width: 100%;">
          </v-carousel-item>
        </v-carousel>
      </div>

      <v-container>
        <v-content>
          <v-layout row wrap justify-center pb-2>
            <h4 style="width: 100%;text-align: center;">PICK UP</h4>
            <h5>おすすめの商品</h5>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md4 v-for="(item, index) in pickups" :key="index" style="padding: 5px;">
              <v-card hover flat>
                <v-card-text>
                  <v-img
                    :src="item.src"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="500"
                    max-height="300"
                  ></v-img>
                </v-card-text>
                <v-card-text style="text-align: center;">{{item.title}}</v-card-text>
                <v-card-text style="text-align: center;">{{item.description}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-content>
      </v-container>

          <v-divider style="margin-top: 30px;"></v-divider>
      
      <v-container>
        <v-content>
          <v-layout row wrap justify-center pb-2>
            <h4 style="width: 100%;text-align: center;">PICK UP</h4>
            <h5>おすすめの商品</h5>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md4 v-for="(item, index) in pickups" :key="index" style="padding: 5px;">
              <v-card hover flat>
                <v-card-text>
                  <v-img
                    :src="item.src"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="500"
                    max-height="300"
                  ></v-img>
                </v-card-text>
                <v-card-text style="text-align: center;">{{item.title}}</v-card-text>
                <v-card-text style="text-align: center;">{{item.description}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-content>
      </v-container>

          <v-divider style="margin-top: 30px;"></v-divider>

      <v-container>
        <v-content>
          <v-layout row wrap justify-center pb-2>
            <h4 style="width: 100%;text-align: center;">PICK UP</h4>
            <h5>おすすめの商品</h5>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md4 v-for="(item, index) in pickups" :key="index" style="padding: 5px;">
              <v-card hover flat>
                <v-card-text>
                  <v-img
                    :src="item.src"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="500"
                    max-height="300"
                  ></v-img>
                </v-card-text>
                <v-card-text style="text-align: center;">{{item.title}}</v-card-text>
                <v-card-text style="text-align: center;">{{item.description}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-content>
      </v-container>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      pickups: [
        {
          title: "日本刀",
          src: "https://picsum.photos/id/11/500/300",
          description: "ここに説明が入ります"
        },
        {
          title: "こけし",
          src: "https://picsum.photos/id/11/500/300",
          description: "ここに説明が入ります"
        },
        {
          title: "組紐",
          src: "https://picsum.photos/id/11/500/300",
          description: "ここに説明が入ります"
        }
      ],
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  }
};
</script>
