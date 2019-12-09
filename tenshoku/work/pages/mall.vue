<template>
  <v-layout row wrap style="padding-top: 100px;">
    <h5 style="width: 100%;text-align: center;">ランダムモール</h5>
    <h4 style="width: 100%;text-align: center;">RANDOM MALL</h4>
    <h4 style="width: 100%;text-align: center;padding-bottom: 10px;">
      <v-btn color="info" style="border-radius: 300px;">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </h4>
    <v-flex xs12 md6 v-for="(item, index) in items" :key="index" @click="$router.push(`/customer/workshop/${item.title}`)">
      <v-hover v-slot:default="{ hover }">
        <v-card>
          <v-img :src="item.src" />
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out black lighten-4 v-card--reveal display-3 white--text target"
              style="height: 100%;"
            >
              <div>
                <div style="text-align: center;padding-bottom: 5px;font-size: 40px;">{{item.title}}</div>
                <!-- <v-flex xs12 md12 style="font-size: 20px;">{{ item.description }}</v-flex> -->
                <v-layout row wrap justify-center>
                  <v-flex md3 v-for="(product, index) in item.products" :key="index" style="padding: 5px;">
                    <v-card style="padding: 3px;" hover>
                      <v-img :src="product.src" />
                    </v-card>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "宮崎ガラス細工",
          src: "https://picsum.photos/500/300?random=1",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        },
        {
          title: "北九州組み紐工房",
          src: "https://picsum.photos/500/300?random=2",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        },
        {
          title: "一宮",
          src: "https://picsum.photos/500/300?random=3",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        },
        {
          title: "the empire",
          src: "https://picsum.photos/500/300?random=4",
          description: "ここに説明が入ります",
          products: [
            {
              src: "https://picsum.photos/500/300?random=5"
            },
            {
              src: "https://picsum.photos/500/300?random=6"
            },
            {
              src: "https://picsum.photos/500/300?random=7"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  top: 0;
  bottom: 0;
  justify-content: center;
  opacity: 0.99;
  position: absolute;
  width: 100%;
}

.target {
  cursor: pointer;
}

.reload {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>