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
    </div>
    <v-container grid-list-xs style="min-height: 85vh;width: 85%;overflow-y: scroll;">
      <v-content v-if="check == 0">
        <v-card>
          <v-card-title primary-title><v-icon>mdi-plus</v-icon>新規登録商品情報入力</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-flex xs12 md5>
              <h3 style="padding-bottom: 10px;">登録商品イメージ</h3>
            </v-flex>
            <v-flex xs12 md12>
              <v-layout row wrap>
                <client-only>
                  <croppa
                    v-model="myCroppa"
                    placeholder="画像を選択"
                    :placeholder-font-size=20
                    :width=500
                    :height=500
                    canvas-color="#777"
                    :file-size-limit="700000"
                    :remove-button-size="30"
                  ></croppa>
                </client-only>
              </v-layout>
            </v-flex>
            
            <v-divider></v-divider>
            <v-card-text　v-if="imgUrl">
              <h2 style="padding-bottom: 10px;">トリミング後の画像</h2>
              <img class="output" :src="imgUrl" width="1200" height="500" />
              <!-- <img src="https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2Ftest3?alt=media&token=3747dfca-14b7-4476-b20d-7d23f993aa49" width="1000" height="400" alt=""> -->
            </v-card-text>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">登録商品番号</h3>
            <v-layout row wrap>
              <v-flex xs12 md5>
                <v-text-field label="商品番号" outlined v-model="formData.product_number" type="number"></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">登録商品名</h3>
            <v-layout row wrap>
              <v-flex xs12 md5>
                <v-text-field label="商品名(全角日本語)" outlined v-model="formData.product_name"></v-text-field>
              </v-flex>
              <v-flex xs12 md5>
                <v-text-field label="商品名(カナ)" outlined v-model="formData.product_name_en"></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs5 md3>
              <h3 style="padding-bottom: 10px;">販売価格</h3>
              <v-layout row wrap align-center>
                <v-text-field label="価格" outlined type="number" v-model="formData.price"></v-text-field>
                <h2>円</h2>
              </v-layout>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">在庫数</h3>
            <v-layout row wrap align-center>
              <v-flex xs5 md2>
                <v-text-field type="number" label="初期在庫数" v-model="formData.stock" outlined></v-text-field>
              </v-flex>
              <h2>個</h2>
              <v-flex xs0 md1></v-flex>
              <v-flex xs5 md2>
                <v-text-field type="number" label="安全在庫数" outlined v-model="formData.safety"></v-text-field>
              </v-flex>
              <h2>個</h2>
            </v-layout>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs12 md12>
              <h3 style="padding-bottom: 10px;">商品説明</h3>
              <v-text-field outlined label="商品説明" v-model="formData.description"></v-text-field>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs12 md12>
              <h3 style="padding-bottom: 10px;">サイズ</h3>
              <v-text-field outlined label="サイズ" v-model="formData.size"></v-text-field>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <v-flex xs12 md12>
              <h3 style="padding-bottom: 10px;">素材</h3>
              <v-text-field outlined label="素材" v-model="formData.mate"></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <h3 style="padding-bottom: 10px;">重量</h3>
              <v-text-field outlined label="重量" v-model="formData.weight"></v-text-field>
            </v-flex>
            <v-divider style="padding-bottom: 20px;"></v-divider>
            <h3 style="padding-bottom: 10px;">
              商品につけるタグ
              <span style="font-size: 15px;color: #999;">(3つまで)</span>
            </h3>
            <!-- ここからタグ追加 -->
            <v-layout row wrap>
              <v-flex xs10 md10>
                <v-text-field outlined label="追加タグ(全角カナ)" v-model="formData.tag.japan" clearable></v-text-field>
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
                      {{item.japan}}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <!-- 　　　　ここからは英語だよーーーーーー　　　　 -->
            <v-layout row wrap>
              <v-flex xs10 md10>
                <v-text-field outlined label="追加タグ(ローマ字)" v-model="formData.tag.english" clearable></v-text-field>
                {{ formData.tag.japan }}
                {{ formData.tag.english }}
              </v-flex>
              <v-flex xs1 md1>
                <v-btn color="info" style="width: 100%;height: 55px;" outlined @click="addTag">追加</v-btn>
              </v-flex>
            </v-layout>
            <!-- ここまで -->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout row wrap justify-center>
              <v-flex xs12 md1>
                <v-btn color="info" style="width: 100%;" @click="check = 1">確認</v-btn>
                <!--  -->
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
                  <td>商品名(日本語)</td>
                  <td>{{formData.product_name}}</td>
                </tr>
                <tr>
                  <td>商品名(カタカナ)</td>
                  <td>{{formData.product_name_en}}</td>
                </tr>
                <tr>
                  <td>販売価格</td>
                  <td>{{formData.price}}</td>
                </tr>
                <tr>
                  <td>初期在庫数</td>
                  <td>{{formData.stock}}</td>
                </tr>
                <tr>
                  <td>安全在庫数</td>
                  <td>{{formData.safety}}</td>
                </tr>
                <tr>
                  <td>商品説明</td>
                  <td>{{formData.description}}</td>
                </tr>
                <tr>
                  <td>タグ</td>
                  <td><span v-for="(item,index) in formData.tags" :key="index">{{item.japan}}　　　</span></td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-flex xs12 md1>
                <v-btn color="info" style="width: 100%;" @click="upload">登録</v-btn>
              </v-flex>
              <v-flex xs12 md1>
                <v-btn style="width: 100%;" @click="check = 0">戻る</v-btn>
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
import {mapActions,mapGetters} from 'vuex'


export default {
middleware: 'auth',

  data() {
    return {
      myCroppa: null, //v-model croppa
        imgUrl: null, //アウトプットするurlってことかな
        blob: null,
        uploadedName: null,
        uploadedImg: null,
      check: 0,
      formData: {
        product_name: "",
        product_name_en: "",
        product_number: 0,
        price: 0,
        stock: 0,
        safety: 0,
        description: '',
        tag: {
          japan:'',
          english:'',
        },
        tags:[],
        img: "",
        size:"",
        mate:"",
        weight:"",
      }
    };
  },
  methods: {
    async addTag() {
      if (this.formData.tag.japan != "" && this.formData.tag.english != "") {
        const result =  await this.checkTags();
        this.formData.tag.japan = "";
        this.formData.tag.english = "";
      }
    },
    checkTags(){
      if (this.formData.tags.length < 3) {
          var payload = {
            japan:this.formData.tag.japan,
            english:this.formData.tag.english
          }
          this.formData.tags.push(payload);
          this.formData.tags.push();
      }
      return true
    },
    // ここからは完成してる-------------------------------------------------------------------------
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
    async upload() {

      if(!this.formData.product_name && !this.formData.product_name_en && !this.formData.price && !this.formData.stock && !this.formData.safety && !this.formData.description && !this.formData.size && !this.formData.mate && !this.formData.weight) return alert('未入力内容があります')

      var strong = 1000;
      const name = new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);

      //トリミング
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

      //ここからアップロード

      if (this.imgUrl == null) {
        alert("画像をトリミングしてください");
        return;
      }
      await this.$store
        .dispatch("persona/uploadImage", {
          file: this.blob,
          name: name,
          wsid: this.loginuserdata.user_data.shop_id
        })
        .then(url => {
          // アップロード完了処理 (ローカルメンバに保存したり)
          app.uploadedImg = url; //アップロードしたURLを返してもらってる
          console.log(app.uploadedImg);
        });
      var payload = this.formData
      payload.wsid = this.loginuserdata.user_data.shop_id
      console.log('uploadedImg:' + app.uploadedImg)
      payload.img = name
      console.log('DBに入れた画像名:' + payload.img)
      await this.addProduct({payload});
      this.check = 2;
      // ここからタグ追加処理
      const tag_datas = {
        tag_data: this.formData.tags,
        shop_id: payload.wsid
      }
      console.log(tag_datas);
      await this.tag_add({tag_datas})
    },
    // async tag_tuika(){
    //   const tag_data = this.formData.tags;
    //   console.log(tag_data);
    //   await this.tag_add({tag_data})
    // },
    ...mapActions("workshop_manage",["addProduct","tag_add"]),
    ...mapActions("persona",["uploadImage"]),
  },
  mounted() {
    Vue.use(Croppa);
    console.log(this.loginuserdata)
  },
  computed:{
    ...mapGetters(["loginuserdata"]),
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