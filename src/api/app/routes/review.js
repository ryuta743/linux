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

// レビューinsert
router.get('/post_review', function (req, res) {
  console.log('レビュー投稿')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const product_id = req.query.product_id;
  const user_id = req.query.user_id;
  const review_point = req.query.review_point;
  const review_text = req.query.review_text;
  const now = req.query.now;
  const sql = `INSERT INTO reviews(review_id,product_id,user_id,evaluation,comment,post_time) VALUES (null,${product_id},${user_id},${review_point},'${review_text}','${now}');`;
  console.log(sql)
  connection.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

router.get('/get_review', function (req, res) {
  console.log('レビュー引き出しのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const product_id = req.query.product_id;
  const sql = `SELECT * from reviews INNER JOIN user_lists ON user_lists.user_id = reviews.user_id WHERE product_id=? ORDER BY review_id DESC;`
  console.log(sql)
  connection.query(sql, product_id, function (error, results) {
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})

router.get('/get_evaluation', function (req, res) {
  console.log('星平均')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const product_id = req.query.product_id;
  const sql = `SELECT AVG(evaluation) AS avg_eva from reviews WHERE product_id=? ;`
  console.log(sql)
  connection.query(sql, product_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(results);
  })
  connection.end();
})