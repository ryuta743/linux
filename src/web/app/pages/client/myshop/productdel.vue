<template>
  <div id="workshop_body">
    <div style="min-height: 100vh;width: 15%;" id="workshop_nav">
      <ul>
        <li @click="$router.push('/client/myshop/myshop')">
          <v-icon>mdi-home</v-icon> 管理ツールトップ
        </li>
        <li @click="$router.push('/client/myshop/orderlist')">
          <v-icon>mdi-format-list-checks</v-icon> 注文一覧
        </li>
        <li @click="$router.push('/client/myshop/sales')"><v-icon>mdi-chart-bar</v-icon> 売上一覧</li>
        <li @click="$router.push('/client/myshop/sales_trend')"><v-icon>mdi-chart-arc</v-icon> 売上傾向表</li>
        <li @click="$router.push('/client/myshop/products')">
          <v-icon>mdi-format-list-bulleted</v-icon> 商品一覧・在庫状況
        </li>
        <li @click="$router.push('/client/myshop/discount')">
          <v-icon>mdi-cash-usd</v-icon> セット割引
        </li>
        <li @click="$router.push('/client/myshop/productadd')">
          <v-icon>mdi-plus</v-icon> 新規商品登録
        </li>
        <li @click="$router.push('/client/myshop/productdel')" class="check">
          <v-icon>mdi-close</v-icon> 商品編集・削除
        </li>
        <li @click="$router.push('/client/myshop/chat')">
          <v-icon>mdi-chat</v-icon> チャットメッセージ
        </li>
      </ul>
    </div>
    <v-container grid-list-xs style="min-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-content>
        <div id="sub_title">
          <h3><v-icon>mdi-close</v-icon>商品編集・削除</h3>
        </div>

      　<v-card v-if="!editmode">
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
                      <v-btn color="error" outlined @click="targetSel(index)"><v-icon hover color="red">mdi-close</v-icon></v-btn>
                      <v-btn color="info" outlined @click="editTargetSel(index)"><v-icon hover>mdi-pencil</v-icon></v-btn>
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

      <v-content v-if="editmode">
          <v-card>
          <v-card-title primary-title>商品変更点入力</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-flex xs12 md5>
              <h3 style="padding-bottom: 10px;">商品イメージ変更</h3>
              <v-file-input label="File input" filled prepend-icon="mdi-camera"></v-file-input>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>

            <h3 style="padding-bottom: 10px;">商品名変更</h3>
            <v-layout row wrap>
              <v-flex xs12 md5>
                <v-text-field label="商品名(日本)" outlined></v-text-field>
              </v-flex>
              <v-flex xs12 md5>
                <v-text-field label="商品名(英語)" outlined></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs5 md3>
              <h3 style="padding-bottom: 10px;">販売価格変更</h3>
              <v-layout row wrap align-center>
                <v-text-field label="価格" outlined type="number"></v-text-field>
                <h2>円</h2>
              </v-layout>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">安全在庫数変更</h3>
            <v-layout row wrap align-center>
              <v-flex xs5 md2>
                <v-text-field type="number" label="安全在庫数" outlined></v-text-field>
              </v-flex>
              <h2>個</h2>
            </v-layout>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs12 md12>
              <h3 style="padding-bottom: 10px;">商品説明変更</h3>
              <v-text-field outlined label="商品説明"></v-text-field>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">
              商品につけるタグ
              <span style="font-size: 15px;color: #999;">(4つまで)</span>
            </h3>
            <v-layout row wrap>
              <v-flex xs10 md10>
                <v-text-field outlined label="追加タグ" v-model="formData.tag"></v-text-field>
              </v-flex>
              <v-flex xs1 md1>
                <v-btn color="info" style="width: 100%;height: 55px;" outlined @click="addTag">追加</v-btn>
              </v-flex>
              <v-flex xs12 md12>
                <v-subheader>追加中のタグ</v-subheader>
                <v-layout row wrap>
                  <v-flex xs6 md12>
                    <v-chip
                      @click="formData.tags.splice(index,1)"
                      class="ma-2"
                      color="primary"
                      label
                      text-color="white"
                      v-for="(item, index) in formData.tags"
                      :key="index"
                    >
                      <v-icon left>mdi-backspace</v-icon>
                      {{item}}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-flex xs12 md1>
                <v-btn color="info" style="width: 100%;" @click="completedialog = true">変更</v-btn>
              </v-flex>
              <v-flex xs12 md1>
                <v-btn style="width: 100%;" @click="editmode = false">キャンセル</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>

      <!-- 削除確認ダイアログ -->
      <v-dialog
          v-model="dialog"
          scrollable
          persistent :overlay="false"
          max-width="500px"
          transition="dialog-transition"
      >
          <v-card>
              <v-card-text style="padding: 10px;">
                  <v-layout row wrap justify-center>
                      <h3><v-icon color="red">mdi-close</v-icon>本当にこの商品を削除しますか？</h3> 
                  </v-layout>
              </v-card-text>
              <v-card-actions>
                  <v-layout row wrap justify-center>
                      <v-btn color="error" @click="kill">はい</v-btn>
                      <v-btn @click="dialog = false">いいえ</v-btn>
                  </v-layout>
              </v-card-actions>
          </v-card>
      </v-dialog>

      <!-- completeダイアログ -->
      <v-dialog
          v-model="completedialog"
          scrollable 
          persistent :overlay="false"
          max-width="500px"
          transition="dialog-transition"
      >
      <v-card>
          <v-card-text style="padding: 20px;">
              <v-layout row wrap justify-center align-center>
                  <h3><v-icon>mdi-check</v-icon></h3>
                  <h3>変更が完了しました</h3>
              </v-layout>
              <v-layout row wrap justify-center>
                  <v-btn color="success" @click="editComplete">OK</v-btn>
              </v-layout>
          </v-card-text>
      </v-card>   
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      completedialog: false,
      editmode: false,
    　dialog: false,
      killtarget: null,
      formData: {
        tag: "",
        tags: ["陶器"]
      },
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
  },
  methods:{
      targetSel(i){
          this.target = i
          this.dialog = true
      },
      kill(){
          this.products.splice(this.target,1)
          this.dialog = false
          this.target = null
      },
      addTag() {
      if (this.formData.tag != "") {
        if (this.formData.tags.length < 4) {
          this.formData.tags.push(this.formData.tag);
          this.formData.tag = "";
        }
      }
      },
      editTargetSel(i){
          this.edittarget = i
          this.editmode = true
      },
      editComplete(){
          this.completedialog = false
          this.editmode = false
      }
  }
};
</script>

<style>
#workshop_body {
  display: flex;
  width: 100%;
}

#workshop_nav {
  padding-top: 40px;
  padding-left: 10px;
  border: 1.2px solid #DEE5EC;
  border-width: 1.2px 1.2px 1.2px 0;
  background-color: #ffffff;
}

#workshop_nav ul {
  list-style: none;
}

#workshop_nav li {
  font-size: 12px;
  cursor: pointer;
  color: #777777;
  margin-bottom: 30px;
}

#workshop_nav li:hover {
  cursor: pointer;
  color: rgb(66, 185, 0);
}
#workshop_nav li.check {
  color: rgb(66, 185, 0);
}

#sub_title{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1.2px solid #e6e6e6;
  margin-bottom: 10px;
}
</style>