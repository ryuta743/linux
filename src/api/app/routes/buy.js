var express = require('express');
const cors = require('cors');
const router = express.Router();
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

// 購入（注文一覧/order_lists）

router.get('/cart_buy', function (req, res) {
  console.log('カート購入(order_lists)のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const order_id = req.query.order_id;
  const shop_id = req.query.shop_id;
  const now = req.query.now;
  const country = req.query.country;
  const postalcode = req.query.postalcode;
  const address = req.query.address;
  const total = req.query.total;
  const user_id = req.query.user_id;
  const user_name = req.query.user_name;
  const buy_type = req.query.buy_type;
  const mail = req.query.mail;
  const tel = req.query.tel;
  // const sql = `INSERT INTO order_lists VALUES ('${order_id}',${user_id},'${user_name}',${shop_id},'${now}','${country}','${postalcode}','${address}',${total},0,${buy_type},'${mail}',${tel});`;
  const sql = `INSERT INTO order_lists VALUES ('${order_id}',${user_id},'${user_name}',${shop_id},'${now}','${country}','${postalcode}','${address}',${total},0,${buy_type},'${mail}',${tel});`;
  console.log(sql)
  connection.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

router.get('/buy_details', function (req, res) {
  console.log('カート購入(order_lists)のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const order_id = req.query.order_id
  const shop_id = req.query.shop_id
  const user_id = req.query.user_id
  const user_name = req.query.user_name
  const product_id = req.query.product_id
  const product_name = req.query.product_name
  const price = req.query.price
  const count = req.query.count
  const sql = `INSERT INTO order_details VALUES ('${order_id}',${shop_id},${user_id},'${user_name}',${product_id},'${product_name}',${price},${count},0);`;
  console.log(sql)
  connection.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

// 購入履歴引き出し
router.get('/get_buy_history', function (req, res) {
  console.log('カート引き出しのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_id = req.query.user_id;
  console.log(user_id);
  const sql = `SELECT * from order_details INNER JOIN order_lists ON order_lists.order_number = order_details.order_number INNER JOIN workshop_lists ON workshop_lists.shop_id = order_lists.shop_id WHERE order_lists.user_id=? ORDER BY buy_date DESC;`;
  console.log(sql)
  connection.query(sql, user_id, function (error, results) {
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})