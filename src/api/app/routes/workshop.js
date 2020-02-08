var express = require('express');

const router = express.Router();

// sqlを読み込む
var mysql = require('mysql');

module.exports = router;

// mysqlと接続する
var mysql_setting = {
  host: 'db',
  user: 'root',
  password: '',
  database: 'tenshoku',
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