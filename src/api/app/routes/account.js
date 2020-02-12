var express = require('express');

const router = express.Router();

// sqlを読み込む
var mysql = require('mysql');

module.exports = router;

// mysqlと接続する
var mysql_setting = {
  host: 'db-service.default.svc.cluster.local',
  user: 'root',
  password: '',
  database: 'tenshoku',
};


router.get('/createuser', function (req, res) {
  console.log('API届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const name = req.query.name;
  const password = req.query.pass;
  const mail = req.query.mail;
  const gender = req.query.gender;
  const country = req.query.country;
  const type = req.query.user_type;
  const now = req.query.date;
  const sql = `INSERT INTO user_lists(user_id,user_name,user_pass,user_mail,nationality,gender,birth,user_type,create_day) VALUES (null,'${name}','${password}','${mail}',${country},${gender},'2019/12/07',${type},'${now}');`
  console.log(sql)
  connection.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
  connection.end();
})

router.get('/loginuser', function (req, res) {
  console.log('loginのAPI届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const mail = req.query.mail;
  console.log(mail);
  const password = req.query.password;
  console.log(password);
  const sql = 'SELECT * FROM user_lists WHERE user_mail=? AND user_pass=?';
  console.log(sql)
  connection.query(sql, [mail, password], function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) {
      if (results[0].user_type == 1) {
        haveWs(res, results)
      } else {
        return res.json(results);
      }
    } else {
      return res.json(0);
    }
  })
  connection.end();
})

function haveWs(res, user_data) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  var connection = mysql.createConnection(mysql_setting);
  connection.connect();
  console.log(user_data[0])
  const sql = 'SELECT * FROM workshop_lists WHERE shop_owner=?';
  connection.query(sql, user_data[0].user_id, function (error, results) {
    console.log(results)
    if (error) return res.json(error);
    if (results.length > 0) {
      user_data[0].shop_id = results[0].shop_id;
      return res.json(user_data)
    }
    return res.json(user_data);
  })
  connection.end();
}