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
  // connection.query(sql,cartdata, function (error,results) {
  //   console.log(results)
  //   if (error) return res.json(error);
  //   if(results.length > 0) return res.json(results);
  //   return res.json(results);
  // })
  // connection.end();
})