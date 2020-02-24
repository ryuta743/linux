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

// レビューinsert
router.get('/post_contact', function (req, res) {
  console.log('コンタクト')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const user_id = req.query.user_id;
  const text = req.query.text;
  const now = req.query.now;
  const sql = `INSERT INTO contacts(contact_id,user_id,contact_date,contact_detail,helper_id) VALUES (null,?,?,?,null);`;
  console.log(sql)
  connection.query(sql, [user_id, now, text], function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

// 管理者用全ての問合せセレクト
router.get('/admin_contact', function (req, res) {
  console.log('adminコンタクト')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const sql = `SELECT * FROM contacts INNER JOIN user_lists ON contacts.user_id = user_lists.user_id ;`;
  console.log(sql)
  connection.query(sql, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(0);
  })
  connection.end();
})

// 管理者用個別のお問い合わせセレクト
router.get('/admin_contact_detail', function (req, res) {
  console.log('admin個別コンタクト')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const contact_id = req.query.contact_id;
  const sql = `SELECT * FROM contacts INNER JOIN user_lists ON contacts.user_id = user_lists.user_id WHERE contacts.contact_id=? ;`;
  console.log(sql)
  connection.query(sql, contact_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) return res.json(results);
    return res.json(0);
  })
  connection.end();
})