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
(NULL,1,"天職茶碗",1,1200,"2019/12/28","ヒノキの香りがする伝統ある茶碗です。","https://firebasestorage.googleapis.com/v0/b/hackmdbase-57369.appspot.com/o/images.jpeg?alt=media&token=6b99e5bf-ee7c-4919-ade5-91c8710d49cb",30,10);

INSERT INTO `order_lists` VALUES
(1,1,"takashi",1,"天職工房","2019/12/28","日本(Japan)","8891902","宮崎県三股町五本松13-2",1200,0);

INSERT INTO `order_details` VALUES
(1,1,1,"takashi",1,"天職茶碗",1200,1,0);