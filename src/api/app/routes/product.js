var express = require('express');

const router = express.Router();

// sqlを読み込む
var mysql = require('mysql');

module.exports = router;

// mysqlと接続する
var mysql_setting = {
  host: '133.18.194.128:3306',
  user: 'root',
  password: '',
  database: 'tenshoku',
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
  const sql = 'SELECT * FROM product_lists WHERE product_name LIKE ?';
  console.log(sql)
  connection.query(sql, product, function (error, results) {
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

router.get('/get_newdata', function (req, res) {
  console.log('登録されたてホヤホヤの商品情報API届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const sql = 'SELECT * FROM product_lists ORDER BY record_date DESC';
  console.log(sql)
  connection.query(sql, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})