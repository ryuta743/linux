var express = require('express');
const cors = require('cors')
const router = express.Router();
router.use(cors())
// sqlを読み込む
var mysql = require('mysql');

module.exports = router;

// mysqlと接続する
var mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tenshoku',
  port: 3306
};

router.get('/get_shop', function (req, res) {
  console.log('工房検索のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const shopdata = '%' + req.query.shop_data + '%';
  console.log(shopdata);
  const sql = 'SELECT * FROM workshop_lists WHERE shop_name LIKE ?';
  console.log(sql)
  connection.query(sql, shopdata, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/random_shop', function (req, res) {
  console.log('ランダムモールのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const shop_id = req.query.shop_id;
  console.log(shop_id);
  const sql = 'SELECT * FROM workshop_lists WHERE shop_id=?';
  console.log(sql)
  connection.query(sql, shop_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/count_shop', function (req, res) {
  console.log('ショップ数検索のAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const sql = 'select count(*) AS count_data from workshop_lists';
  console.log(sql)
  connection.query(sql, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/get_workshop_data', function (req, res) {
  console.log('ランダムモールのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const shop_id = req.query.shop_id;
  console.log(shop_id);
  const sql = 'SELECT * FROM workshop_lists WHERE shop_id=?';
  console.log(sql)
  connection.query(sql, shop_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})