var express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

// sqlを読み込む
var mysql = require('mysql');

module.exports = router;

// mysqlと接続する
var mysql_setting = {
  host: 'db-service',
  user: 'root',
  password: 'root',
  database: 'tenshoku',
  port: 3306
};


router.get('/get_product', function (req, res) {
  console.log('商品名検索のAPI届いたよ')
  console.log('エラーなおれ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  // 俺は悪くない
  const product = '%' + req.query.pro_data + '%';
  console.log(product);
  const sql = 'SELECT product_lists.product_id AS product_id,product_lists.shop_id AS shop_id,product_lists.product_name AS product_name,product_lists.product_name_en AS product_name_en, product_lists.product_number AS product_number, product_lists.price AS price, product_lists.record_date AS recode_date, product_lists.product_detail AS product_detail, product_lists.product_img AS product_img, product_lists.stock AS stock, product_lists.safety AS safety, product_lists.size AS size, product_lists.material AS material, product_lists.weight AS weight , COALESCE(AVG(reviews.evaluation),0) AS rate FROM product_lists LEFT OUTER JOIN reviews ON product_lists.product_id = reviews.product_id WHERE product_lists.product_name LIKE ? GROUP BY product_lists.product_id';
  console.log(sql)
  connection.query(sql, product, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(0);
  })
  connection.end();
})

// タグ検索
router.get('/get_tags', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  // 俺は悪くない
  const tags = req.query.tags;
  console.log(tags);
  const sql = 'SELECT * FROM product_lists INNER JOIN product_tags ON product_lists.product_id = product_tags.product_id WHERE product_tags.tag=? ';
  console.log(sql)
  connection.query(sql, tags, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(0);
  })
  connection.end();
})

router.get('/get_details', function (req, res) {
  console.log('商品詳細のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const details = req.query.id_data;
  console.log(details);
  const sql = 'SELECT * FROM product_lists WHERE product_id=?';
  console.log(sql)
  connection.query(sql, details, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/get_tag', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  // 俺は悪くない
  const product_id = req.query.product_id;
  const sql = 'SELECT * FROM product_tags WHERE product_id=? ';
  console.log(sql)
  connection.query(sql, product_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(0);
  })
  connection.end();
})

router.get('/get_newdata', function (req, res) {
  console.log('登録されたてホヤホヤの商品情報API届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const sql = 'SELECT product_lists.product_id AS product_id,product_lists.shop_id AS shop_id,product_lists.product_name AS product_name,product_lists.product_name_en AS product_name_en, product_lists.product_number AS product_number, product_lists.price AS price, product_lists.record_date AS recode_date, product_lists.product_detail AS product_detail, product_lists.product_img AS product_img, product_lists.stock AS stock, product_lists.safety AS safety, product_lists.size AS size, product_lists.material AS material, product_lists.weight AS weight , COALESCE(AVG(reviews.evaluation),0) AS rate FROM product_lists LEFT OUTER JOIN reviews ON product_lists.product_id = reviews.product_id GROUP BY product_lists.product_id ORDER BY product_lists.product_id DESC';
  console.log(sql)
  connection.query(sql, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})


// 商品購入時の現在の個数取得用
router.get('/now_count', function (req, res) {
  console.log('カウントのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const p_id = req.query.p_id;
  const sql = 'SELECT stock FROM product_lists WHERE product_id=?';
  console.log(sql)
  connection.query(sql, p_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

// 商品個数のアップデートよん♡
router.get('/upd_count', function (req, res) {
  console.log('カウント数減らす奴に届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const new_count = req.query.new_count;
  const product_id = req.query.p_id;
  const sql = `UPDATE product_lists SET stock=? WHERE product_id=?`;
  console.log(sql)
  connection.query(sql, [new_count, product_id], function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

router.get('/random_shop_products', function (req, res) {
  console.log('愛の力で届いたZ prat2')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const shop_id = req.query.shop_id
  console.log(shop_id)
  const sql = 'SELECT * FROM product_lists WHERE shop_id=? ORDER BY product_id DESC LIMIT 3';
  console.log(sql)
  connection.query(sql, shop_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/product_favo', function (req, res) {
  console.log('愛の力で届いたZ prat2')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_id = req.query.user_id
  const product_id = req.query.product_id
  console.log(user_id)
  const sql = `INSERT INTO product_favo(user_id,product_id) VALUES (?,?);`;
  console.log(sql)
  connection.query(sql, [user_id, product_id], function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(1);
  })
  connection.end();
})

router.get('/favo_data', function (req, res) {
  console.log('愛の力で届いたZ prat2')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_id = req.query.user_id
  console.log(user_id)
  const sql = 'SELECT * FROM product_favo INNER JOIN product_lists ON product_lists.product_id = product_favo.product_id WHERE product_favo.user_id=?';
  console.log(sql)
  connection.query(sql, user_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/del_favo_data', function (req, res) {
  console.log('愛の力で届いたZ prat2')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_id = req.query.user_id
  const product_id = req.query.product_id
  console.log(user_id)
  console.log(product_id)
  const sql = `DELETE FROM product_favo WHERE user_id = ? AND product_id = ?;`;
  console.log(sql)
  connection.query(sql, [user_id, product_id], function (error, results) {
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(1);
  })
  connection.end();
})