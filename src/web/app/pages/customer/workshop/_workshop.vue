<template>
  <v-layout row wrap id="workshop_body">
    <div id="bread_list"> <!-- パンくずリスト -->
      <div class="bread"><v-icon>mdi-home</v-icon>トップ</div>
      <div class="bread">></div>
      <div class="bread">ショップ</div>
      <div class="bread">></div>
      <div class="bread">工房名</div>
    </div>

    <v-flex xs12 md12>
      <div id="workshop_infos">
        <div id="workshop_header">
          <v-lazy-image style="width: 100%;object-fit: cover;height: 350px;" :src="item.src" />
        </div>
        <!-- <v-btn
          style="position: absolute;z-index: 1;top: 65px;left: 25px;"
          icon
          @click="$router.go(-1)"
        >
          <v-icon>mdi-chevron-left</v-icon>back
        </v-btn> -->
        <div id="workshop_info">
          <div id="workshop_icon">
            <v-lazy-image
              style="width: 110px;object-fit: cover;height: 110px;border-radius: 100px;"
              :src="item.icon"
            />
          </div>
          <div id="workshop_detail">
            <div id="workshop_title">{{item.title}}</div>
            <div id="workshop_description">{{item.description}}</div>
            <div id="workshop_rate">
              <v-rating
                color="yellow darken-3"
                background-color="grey darken-1"
                v-model="item.rating"
                readonly
                size="19px"
                half-increments
              ></v-rating>
              <p id="workshop_rate_count">総評価数(12)</p>
            </div>
          </div>
          <div id="workshop_ui">
            <v-hover v-slot:default="{ hover }">
              <v-btn :color="hover ? 'red':'grey'" icon>
                <!-- <v-btn color="red" icon> -->
                <v-icon x-large>mdi-shield-star</v-icon>
              </v-btn>
            </v-hover>
            <div id="review_btn">
              <v-btn depressed color="#000000" style="color: white;height: 31px;">レビューを書く</v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-flex>

    <!-- ワークショップナビ -->
    <div id="workshop_nav">
      <div
        @click="now_page = index"
        :class="{nav_item:true,notactive_nav:now_page != index,active_nav:now_page == index}"
        v-for="(item, index) in nav_item"
        :key="index"
      >{{item}}</div>
    </div>

    <!-- ワークショップコンテンツ -->

    <div id="workshop_contents">
      <!-- 商品コンテンツ -->
      <transition name="slide-fade"><!-- アニメーション -->
      <div id="products_content" v-if="now_page==0">
        <div id="product_header">
          <div class="content_title"><v-icon>mdi-gift-outline</v-icon>  全ての商品</div>
          <div id="result_count">-全{{products.length}}件</div>
          <div id="search_icon">
            <v-btn color="#444444" large icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
          <div id="search_ui">
            <v-btn
              color="#F8CE38"
              depressed
              style="color: white;height: 34px;font-weight: bold;"
            >条件を変える</v-btn>
          </div>
        </div>
        <div id="products">
          <div id="no_products" v-if="products.length == 0">
            <div id="no_product">
              <img src="../../../static/grey_logo.png" width="100px" alt="no-product">
              <p>検索結果が見つかりませんでした</p>
            </div>
          </div>
          <div class="product" v-for="(item, index) in products" :key="index" @click="$router.push(`/customer/product/${item.product_id}`)">
            <div class="product_img">
              <v-lazy-image
                :src=item.product_img
                style="width: 100%;height: 220px;object-fit: cover;"
              />
            </div>
            <div class="product_detail">
              <div class="product_title">{{item.title}}</div>
              <div class="product_price">¥ {{exprice(item.price)}}（税抜）</div>
              <div class="product_rate">
                <v-rating
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  v-model="item.rating"
                  readonly
                  size="15px"
                  half-increments
                ></v-rating>
                <p class="product_rate_count">(6)</p>
              </div>
            </div>
          </div>
          <div id="products_more">
            <v-btn depressed color="#dddddd" style="width: 50%;min-height: 55px;" v-if="products.length>5">もっとみる</v-btn>
          </div>
        </div>
      </div>
      </transition>

      <!-- 工房スキル -->
      <transition name="slide-fade"><!-- アニメーション -->
      <div id="skill_contents" v-if="now_page==1">
        <div id="skill_header">
          <div class="content_title"><v-icon>mdi-hammer</v-icon>工房スキル</div>
        </div>
        <div id="skill_video">
          <div id="youtube">
            <iframe src="https://www.youtube.com/embed/HxWFF_n0ikQ" frameborder="0" allow="" allowfullscreen></iframe>
          </div>
          <div id="skill_table">
            <table>
              <tr>
                <td class="sawarabi"><b>主な伝承技術</b></td>
                <td class="sawarabi">駿河竹千筋細工</td>
              </tr>
              <tr>
                <td class="sawarabi"><b>取り扱い品目数</b></td>
                <td class="sawarabi">約23品目</td>
              </tr>
              <tr>
                <td class="sawarabi"><b>創業年度</b></td>
                <td class="sawarabi">2019年</td>
              </tr>
              <tr>
                <td class="sawarabi"><b>代表工芸品</b></td>
                <td class="sawarabi">あああ</td>
              </tr>
              <tr>
                <td class="sawarabi"><b>経歴・歴史</b></td>
                <td class="sawarabi">ドン勝5連続獲得</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      </transition>

      <!-- 工房コンタクト -->
      <transition name="slide-fade"><!-- アニメーション -->
      <div id="workshop_contact" v-if="now_page == 2">
        <div id="contact_header">
          <div class="content_title"><v-icon>mdi-mail</v-icon>コンタクト</div>
          <div id="chat_message">
            <v-btn color="success" depressed @click="$router.push('/customer/workshop/chat')"><v-icon>mdi-message</v-icon>チャットを送る</v-btn>
          </div>
        </div>
        <div style="margin-bottom:7px;color: #444;" class="sawarabi">お仕事連絡用メールアドレス</div>
        <div id="contact_mail">
          <div id="mail_icon"><v-icon x-large color="white">mdi-email</v-icon></div>
          <div id="mailaddress">tenshoku20@hal.co.jp</div>
        </div>
        <div style="margin-bottom:7px;color: #444;" class="sawarabi">お仕事連絡用電話番号</div>
        <div id="contact_mail">
          <div id="mail_icon"><v-icon x-large color="white">mdi-phone</v-icon></div>
          <div id="mailaddress">080-9066-8833</div>
        </div>
        <div id="contact_form">
          <div class="sawarabi" style="font-size: 19px;">お問い合わせフォーム</div>
          <div style="margin: 10px 0;font-size: 14px;color: #444444;">お問い合わせ内容をご入力の上、「確認画面へ」ボタンをクリックしてください。</div>
          <form @submit.prevent>
            <table>
              <tr>
                <td class="th"><label>お名前<span>必須</span></label></td>
                <td class="input">
                  <input type="text" name="name" placeholder="例）山田太郎">
                </td>
              </tr>
              <tr>
                <td class="th"><label>あなたのメールアドレス<span>必須</span></label></td>
                <td class="input">
                  <input type="text" name="name" placeholder="例）tenshoku20@hal.co.jp">
                </td>
              </tr>
              <tr>
                <td class="th"><label>あなたの電話番号<span style="background-color: #999999;">任意</span></label></td>
                <td class="input">
                  <input type="text" name="name" placeholder="例）tenshoku20@hal.co.jp">
                </td>
              </tr>
              <tr>
                <td class="th"><label>お問い合わせ内容<span>必須</span></label></td>
                <td class="input">
                  <textarea name="content" rows="5" cols="76" placeholder="お問合せ内容を入力" style="border: 1px solid #cccccc;background: #fff;padding-left: 10px;border-radius: 4px;"></textarea>
                </td>
              </tr>
            </table>
          </form>
          <div id="form_btn"><v-btn depressed　color="success" style="width: 150px;">送信</v-btn></div>
        </div>
      </div>
      </transition>
      
    </div>

  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      now_page: 0,
      nav_item: ["商品", "工房スキル", "コンタクト"],
      item: {
        title: "天職工房",
        rating: 5,
        icon:
          "https://firebasestorage.googleapis.com/v0/b/hackmdbase-57369.appspot.com/o/logo.png?alt=media&token=c035d4ed-cd6e-4a4d-b868-04bfd4d41855",
        subTitle: "自然あふれる食卓へ",
        src:
          "http://www.toraya-kobo.jp/wp-content/uploads/2016/05/20150530-01.jpg",
        tags: ["陶器", "自然"],
        description:
          "便利だけど人為的なものが身の回りに増える現代生活。自然素材なら安心して使うことができます。陶芸は地球の一部を拝借しての楽しい手作り生活です。「ゆう工房」は人為を感じない土味ある焼きものを提案しています。"
      },
      products: [
        {
          product_id: 1,
          title: "スマイル鉢植え",
          product_img: 'https://image1.shopserve.jp/taikeian.net/pic-labo/llimg/310a.jpg?t=20190824100607',
          rating: 4.5,
          price: 980,
          tags: ["陶器", "食卓"]
        },
        {
          product_id: 2,
          title: "天職茶碗",
          product_img: 'https://image1.shopserve.jp/taikeian.net/pic-labo/llimg/310a.jpg?t=20190824100607',
          rating: 5,
          price: 3000,
          tags: ["陶器", "食卓"]
        },
        {
          product_id: 3,
          title: "味噌茶碗",
          product_img: 'https://base-ec2if.akamaized.net/w=1024,a=1,q=90,u=0/images/user/blog/79663/blog/e5ae64b3059a46195f0afded25141798.jpg',
          rating: 3.5,
          price: 3000,
          tags: ["陶器", "食卓"]
        },
        {
          product_id: 4,
          title: "小鳥のおもちゃ",
          product_img: 'https://shop6-makeshop.akamaized.net/shopimages/hinohara/0000000001922.jpg',
          rating: 1.5,
          price: 2500,
          tags: ["陶器", "食卓"]
        },
        {
          product_id: 5,
          title: "小鳥のおもちゃ",
          product_img: 'https://shop6-makeshop.akamaized.net/shopimages/hinohara/0000000001922.jpg',
          rating: 1.5,
          price: 2500,
          tags: ["陶器", "食卓"]
        },
        {
          product_id: 6,
          title: "小鳥のおもちゃ",
          product_img: 'https://shop6-makeshop.akamaized.net/shopimages/hinohara/0000000001922.jpg',
          rating: 1.5,
          price: 2500,
          tags: ["陶器", "食卓"]
        }
      ]
    };
  },
  methods:{
    exprice(val){
      return val.toLocaleString();
    },
  }
};
</script>

<style scoped>
.sawarabi{
  font-family: "Sawarabi Mincho";
}

#bread_list{
  display: flex;
  align-items: flex-end;
  margin: 20px 0;
  width: 100%;
  height: 30px;
  border-bottom: 1.2px solid #e1e1e1;
}

.bread{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 14px;
  cursor: pointer;
  width: 80px;
  color: #444444;
}


#workshop_body {
  width: 1080px;
  margin: 0 auto 80px auto;
}

#workshop_infos {
  display: flex;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 350px;
  background-color: #e9e9e9;
  overflow: hidden;
}

#workshop_header {
  width: 100%;
  height: 350px;
  position: absolute;
  top: 0;
  z-index: 1;
}

#workshop_info {
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

#workshop_icon {
  width: 110px;
  height: 110px;
}

#workshop_detail {
  width: 750px;
  height: 125px;
  box-sizing: border-box;
  padding: 5px 5px 5px 25px;
}

#workshop_title {
  font-size: 24px;
  letter-spacing: 5px;
  width: 100%;
  height: 35px;
  color: white;
}

#workshop_description {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-weight: 550;
  font-size: 14px;
  color: white;
}

#workshop_rate {
  display: flex;
  width: 100%;
  height: 30px;
}

#workshop_rate_count {
  margin-top: 9px;
  font-size: 13px;
  color: #ffffff;
}

#workshop_ui {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 170px;
  box-sizing: border-box;
  padding: 10px;
  height: 120px;
}

#review_btn {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 35px;
}

/* workshop nav */
#workshop_nav {
  display: flex;
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #e1e1e1;
}

.nav_item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 60px;
}

.notactive_nav {
  background-color: #a6a6a6;
}

.acitive_nav {
}

#workshop_contents {
  width: 100%;
  background-color: #e1e1e1;
  box-sizing: border-box;
  padding: 40px 30px;
}

#product_header {
  display: flex;
  align-items: center;
  padding: 50px 30px 20px 30px;
  width: 100%;
  height: 30px;
  background-color: #ffffff;
  border-radius: 3px 3px 0 0;
}

#result_count {
  display: flex;
  align-items: flex-end;
  height: 30px;
  margin-left: 30px;
  color: #444444;
  font-size: 14px;
}

#search_icon {
  height: 40px;
  margin-left: 30px;
}

#search_ui {
  display: flex;
  justify-content: flex-end;
  width: 680px;
}

.content_title {
  height: 36px;
  display: flex;
  align-items: center;
  font-size: 21px;
}

#products_content {
  width: 100%;
  min-height: 500px;
}

#products {
  position: relative;
  box-sizing: border-box;
  padding: 30px 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 0 0 3px 3px;;
  background-color: #ffffff;
}

.product {
  transition: 0.5s;
  transition: 0.2s;
  cursor: pointer;
  width: 270px;
  height: 320px;
  margin-bottom: 60px;
}

/* .product:hover {
  box-shadow: 0 0 4px grey;
} */

.product_detail {
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px;
}

.product_img {
  width: 100%;
  height: 220px;
  background-color: #e9e9e9;
}

.product_title {
  width: 100%;
  height: 35px;
  letter-spacing: 2px;
  font-size: 18px;
  font-family: "Sawarabi Mincho";
}

.product_price {
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 13px;
}

.product_rate{
  color: #222;
  font-size: 11px;
  display: flex;
}

.product_rate_count{
  color: blue;
  margin-top: 7px;
}

#products_more{
  display: flex;
  justify-content: center;
  width: 100%;
}

#no_products{
  position: absolute;
  padding: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 420px;
}

#no_product{
  opacity: 0.6;
  color: #444444;
  text-align: center;
  width: 250px;
}

/* 工房スキル */
#skill_contents{
  width: 100%;
  height: 450px;
}

#skill_video{
  display: flex;
  padding: 20px 0;
  width: 100%;
}

#youtube{
  transition: 0.5s;
  width: 450px;
  height: 350px;
  background-color: #ffffff;
}

iframe{
  width: 450px;
  height: 350px;
}

#skill_table{
  width: 580px;
  height: 350px;
  margin-left: 20px;
  background-color: #ffffff;
  border-radius: 2px;
  display: flex;
  align-items: center;
}

#skill_table table{
  margin: 0 auto;
}

#skill_table td{
  text-align: center;
  width: 220px;
  padding: 10px;
  color: #666666;
  border-bottom: 1.2px solid #333333
}

/* コンタクト */

#workshop_contact{
  width: 100%;
  min-height: 500px
}

#contact_header{
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 35px;
}

#chat_message{
  width: 890px;
  display: flex;
  justify-content: flex-end;
}

#contact_mail{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 70px;
  border-radius: 3px;
  margin-bottom: 20px;
  background-color: #ffffff;
  font-size: 17px;
  letter-spacing: 2px;
}

#contact_mail #mail_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  height: 70px;
  width: 80px;
  background-color: #888888;
}

#contact_form{
  margin-top: 50px;
  width: 100%;
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  padding: 20px;
}

#contact_form table{
  padding: 20px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #dddddd;
  background-color: #f6f6f6;
}

#contact_form .th{
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 300px;
  font-size: 13px;
  padding: 10px;
}

#contact_form .th span{
  width: 50px;
  margin-left: 5px;
  padding: 5px;
  font-size: 10px;
  background-color: #FA3B6F;
  border-radius: 4px;
  color: white;
}

#contact_form .input{
  width: 630px;
}

#contact_form .input input{
  width: 100%;
  height: 35px;
  padding-left: 10px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #cccccc;
}

#form_btn{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-lazy-image {
  opacity: 0;
  transition: opacity 0.4s;
}
.v-lazy-image-loaded {
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
</style>