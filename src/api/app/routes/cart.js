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

// カート情報insert
router.get('/cart_up', function (req, res) {
  console.log('カート追加のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const cartdata = req.query.cart_data;
  const userdata = req.query.user_data;
  const now = req.query.date;
  const count = req.query.count;
  console.log(cartdata);
  console.log(userdata);
  const sql = `INSERT INTO cart_list(user_id,product_id,count,add_date) VALUES (${userdata},${cartdata},${count},'${now}');`;
  console.log(sql)
  connection.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

// カート情報引き出し
router.get('/get_cart_data', function (req, res) {
  console.log('カート引き出しのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_id = req.query.user_id;
  console.log(user_id);
  const sql = `SELECT * from cart_list INNER JOIN product_lists ON product_lists.product_id = cart_list.product_id WHERE cart_list.user_id=?;`;
  console.log(sql)
  connection.query(sql, user_id, function (error, results) {
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

// カート情報塗り替え
router.get('/cart_upd', function (req, res) {
  console.log('カートカウント追加のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_data = req.query.user_id;
  const product_data = req.query.product_id;
  const new_count = req.query.new_count;
  const sql = `UPDATE cart_list SET count=? WHERE user_id=? AND product_id=?;;`;
  console.log(sql)
  connection.query(sql, [new_count, user_data, product_data], function (error) {
    if (error) return res.json(error);
    res.json(0721);
  })
  connection.end();
})