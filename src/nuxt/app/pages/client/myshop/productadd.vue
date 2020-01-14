<template>
  <div id="workshop_body">
    <v-container grid-list-xs style="min-height: 100vh;width: 15%;" id="workshop_nav">
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
        <li @click="$router.push('/client/myshop/productadd')" class="check">
          <v-icon>mdi-plus</v-icon> 新規商品登録
        </li>
        <li @click="$router.push('/client/myshop/productdel')">
          <v-icon>mdi-close</v-icon> 商品編集・削除
        </li>
        <li @click="$router.push('/client/myshop/chat')">
          <v-icon>mdi-chat</v-icon> チャットメッセージ
        </li>
      </ul>
    </v-container>
    <v-container grid-list-xs style="min-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-content v-if="check == 0">
        <v-card>
          <v-card-title primary-title><v-icon>mdi-plus</v-icon>新規登録商品情報入力</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-flex xs12 md5>
              <h3 style="padding-bottom: 10px;">登録商品イメージ</h3>
            </v-flex>
            <client-only style="text-align: center;">
              <croppa
                v-model="myCroppa"
                placeholder="画像を選択"
                :placeholder-font-size=20
                :width=1150
                :height=500
                canvas-color="#000"
                :file-size-limit="700000"
                :remove-button-size="30"
              ></croppa>
                <div>
                  <v-btn color="info" @click="generateImage">トリミング</v-btn>
                  <v-btn color="primary" @click="upload">アップロード!</v-btn>
                </div>
            </client-only>
            
            <v-divider></v-divider>
            <v-card-text　v-if="imgUrl">
              <h2 style="padding-bottom: 10px;">トリミング後の画像</h2>
              <img class="output" :src="imgUrl" width="1200" height="500" />
              <!-- <img src="https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2Ftest3?alt=media&token=3747dfca-14b7-4476-b20d-7d23f993aa49" width="1000" height="400" alt=""> -->
            </v-card-text>
            <v-divider style="padding-bottom: 20px;"></v-divider>

            <h3 style="padding-bottom: 10px;">登録商品名</h3>
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
              <h3 style="padding-bottom: 10px;">販売価格</h3>
              <v-layout row wrap align-center>
                <v-text-field label="価格" outlined type="number"></v-text-field>
                <h2>円</h2>
              </v-layout>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">在庫数</h3>
            <v-layout row wrap align-center>
              <v-flex xs5 md2>
                <v-text-field type="number" label="初期在庫数" outlined></v-text-field>
              </v-flex>
              <h2>個</h2>
              <v-flex xs0 md1></v-flex>
              <v-flex xs5 md2>
                <v-text-field type="number" label="安全在庫数" outlined></v-text-field>
              </v-flex>
              <h2>個</h2>
            </v-layout>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs12 md12>
              <h3 style="padding-bottom: 10px;">商品説明</h3>
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
            <v-layout row wrap justify-center>
              <v-flex xs12 md1>
                <v-btn color="info" style="width: 100%;" @click="check = 1">確認</v-btn>
              </v-flex>
              <v-flex xs12 md1>
                <v-btn style="width: 100%;" @click="$router.push('/client/myshop/myshop')">キャンセル</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>
      <v-content v-if="check == 1">
        <v-card>
          <v-card-title primary-title>登録内容確認</v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>商品名(日)</td>
                  <td>すごい陶器</td>
                </tr>
                <tr>
                  <td>商品名(英)</td>
                  <td>GreatThing</td>
                </tr>
                <tr>
                  <td>販売価格</td>
                  <td>5500円</td>
                </tr>
                <tr>
                  <td>初期在庫数</td>
                  <td>50個</td>
                </tr>
                <tr>
                  <td>安全在庫数</td>
                  <td>10個</td>
                </tr>
                <tr>
                  <td>商品説明</td>
                  <td>これは素晴らしい商品です</td>
                </tr>
                <tr>
                  <td>タグ</td>
                  <td>陶器・焼き物・食器</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-flex xs12 md1>
                <v-btn color="info" style="width: 100%;" @click="check = 2">登録</v-btn>
              </v-flex>
              <v-flex xs12 md1>
                <v-btn style="width: 100%;" @click="check = 1">戻る</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>
      <v-content v-if="check == 2">
        <v-card>
          <v-card-text>
            <v-layout row wrap align-center justify-center>
              <h3>
                <v-icon color="success">mdi-check-circle</v-icon>
              </h3>
              <h3>登録が完了しました</h3>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-center>
              <v-btn color="success" @click="$router.push('/client/myshop/myshop')">OK</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";


export default {
  data() {
    return {
      myCroppa: null, //v-model croppa
        imgUrl: null, //アウトプットするurlってことかな
        blob: null,
        uploadedName: null,
        uploadedImg: null,
      check: 0,
      formData: {
        tag: "",
        tags: ["陶器"],
      }
    };
  },
  methods: {
    addTag() {
      if (this.formData.tag != "") {
        if (this.formData.tags.length < 4) {
          this.formData.tags.push(this.formData.tag);
          this.formData.tag = "";
        }
      }
    },
    generateImage: function() {
      var type = "image/jpeg";
      let compressionRate = 0.2;
      let url = this.myCroppa.generateDataUrl(type, compressionRate);
      if (!url) {
        alert("画像が選択されていません");
        return;
      }
      this.imgUrl = url;
      // DataURL のデータ部分を抜き出し、Base64からバイナリに変換してる
      var bin = atob(url.split(",")[1]);
      // 空の Uint8Array ビューを作る
      var buffer = new Uint8Array(bin.length);
      // Uint8Array ビューに 1 バイトずつ値を埋める
      for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
      }
      // Uint8Array ビューのバッファーを抜き出し、それを元に Blob を作る
      this.blob = new Blob([buffer.buffer], { type: type });
      console.log(this.blob);
    },
    upload() {
      if (this.imgUrl == null) {
        alert("画像をトリミングしてください");
        return;
      }
      this.$store
        .dispatch("persona/uploadImage", {
          name: "test3",
          file: this.blob
        })
        .then(url => {
          // アップロード完了処理 (ローカルメンバに保存したり)
          app.uploadedImg = url; //アップロードしたURLを返してもらってる
          console.log(app.uploadedImg);
        });
      setTimeout(() => {
        alert("アップロードに成功しました");
      }, 2000);
    }
  },
  mounted() {
    Vue.use(Croppa);
  }
};
</script>

<style>
#workshop_body {
  display: flex;
  width: 100%;
}

#workshop_nav {
  border: 1.2px solid #dee5ec;
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