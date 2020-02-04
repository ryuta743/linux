INSERT INTO `mydata` (id, name, mail, age) VALUES
(NULL, "taro", "taro@yamada", 35),
(NULL, "hanako", "hanako@flower", 29),
(NULL, "sachi", "sachi@happy", 17),
(NULL, "mami", "mami@mumemo", 9);

INSERT INTO `user_lists` VALUES
(NULL, "takashi","root","takashi@hal.co.jp","001","0","1999/12/07","1","2019/12/26");

INSERT INTO `workshop_lists` VALUES
(NULL,"天職工房",1,"伝統を守る暖かく強い工房です。","2019/12/28","https://firebasestorage.googleapis.com/v0/b/hackmdbase-57369.appspot.com/o/logo.png?alt=media&token=c035d4ed-cd6e-4a4d-b868-04bfd4d41855","8891902","宮崎県都城五本松13-2","kuwataka07@gmail.com");

INSERT INTO `product_lists` VALUES
(NULL,1,"天職小皿","tenshokukozara",1,1200,"2019/12/28","ヒノキの香りがする伝統ある茶碗です。","04.jpg",30,10,"40*40*150(cm)","青銅、鉄","800g");

INSERT INTO `product_lists` VALUES
(NULL,1,"天職コップ","tenshokukoppu",2,1500,"2019/12/28","ヒノキの香りがする伝統ある茶碗です。","05.jpg",30,10,"40*40*150(cm)","青銅、鉄","800g");

INSERT INTO `order_lists` VALUES
(1,1,"takashi",1,"天職工房","2019/12/28","日本(Japan)","8891902","宮崎県三股町五本松13-2",1200,0);

INSERT INTO `order_details` VALUES
(1,1,1,"takashi",1,"天職茶碗",1200,1,0);

INSERT INTO `discount` VALUES
('11212aaaa',1,1,15,'激安天職セット');

INSERT INTO `discount` VALUES
('11212aaaa',2,1,15,'激安天職セット');

INSERT INTO `product_lists` VALUES
(NULL,1,'神のiphoneケース',"kaminoiphoneke-su",15,400000,'2020/01/27','安いよ','06.jpg',8,5,"40*40*150(cm)","青銅、鉄","800g");

INSERT INTO `product_lists` VALUES
(NULL,1,'白遊花人',"hakuyuukajinn",16,5000000,'2020/02/04','「人と人を結ぶ」という意味が込められている水引を用いて作ったお香袋です。お香だけでなく、お好きなポプラやアロマなどを入れてもお使いいただけます。','01.jpg',500,5,"H60mm × W60mm × D50mm","水引","不明");

INSERT INTO `cart_list` VALUES
(1,3,10,'2020/01/31');


























INSERT INTO `product_lists` VALUES
(NULL,1,'花巾着',"hanakinntyaku",40,2530,'2019/02/05','みなさんは花瓶が大きすぎて花が傾いてしまったり、花瓶の収納場所に困ったという経験はありませんか？今回ご紹介する「花巾着」は直接水を入れられる、布でできた巾着型の花器。飾る花の本数にあわせてサイズを調整することができるので、花の本数が少なくなっても立派に立たせることができます。','02.jpg',500,5,"約W185×H260×厚さ5ｍｍ","ポリエステル　裏地PVC　芯材：PETシート","不明");

INSERT INTO `product_lists` VALUES
(NULL,1,'碧丸皿',"hekimaruzara",41,5500,'2019/12/14','京の空と川をイメージした爽やかな碧（あお）の中に、縦にすっと入った本金が上品さを醸し出します。','03.jpg',200,20,"約径21.5㎝×高さ1.6㎝","磁器","約600ｇ");



INSERT INTO `product_lists` VALUES
(NULL,1,'はんなり柿釉 御本手 -ペア鉢-',"hannari",4,5500,'2020/01/31','京都の嘉峰窯(かほうがま)、柿釉シリーズの御本手・ペア鉢。”御本手”とは、使う土や焼き方によって器に出る赤みのある斑紋のことをいい、焼き物の風情として親しまれています。','asdf.jpg',30,10,"約径15.5ｃｍ × 高さ5.5ｃｍ","陶器 （京焼・清水焼）","不明");

INSERT INTO `product_lists` VALUES
(NULL,1,'ダイヤモンドグラス',"diamondgrass",5,8800,'2020/02/02','江戸硝子の伝統技術によって生み出されたワイングラス。職人によって生み出されるダイヤモンド型のグラスは、吹きガラスならではのやわらかい風合いが特徴。','2134123ff.jpg',100,20,"約（約）W90×D77× H140 mm","ガラス","約200cc");

INSERT INTO `product_lists` VALUES
(NULL,1,'アロマデフューザー -夏・うみ-',"aromafuzer",6,4180,'2020/02/05','“YUIRO”のアロマディフューザーです。日本の四季に注目し、季節の移ろいを“香り”で表現しています。','hhsdfghhh.jpg',50,10,"直径 38mm × 高さ 115mm","ガラス","100ml");
