import express from 'express';

const router = express.Router();

// sqlを読み込む
var mysql = require('mysql');

export default {
  path: '/api',
  handler: router
}

// mysqlと接続する
var db = mysql.createConnection({
  host: 'db:9080', //後で変える
  user: 'root:9080',
  password: 'root',
  database: 'tensyoku'
});

router.get('/createuser', function (req, res) {
  console.log('API届いたよ')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  const name = req.query.name;
  const password = req.query.pass;
  const mail = req.query.mail;
  const gender = req.query.gender;
  const countory = req.query.countory;
  const type = req.query.user_type;
  const sql = `INSERT INTO user_lists(user_id,user_name,user_pass,user_mail,nationality,gender,user_type,createday) VALUES (null,'${name}','${password}','${mail}','${countory}',${gender},'${type}','GETDATA()');`
  console.log(sql)
  db.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
})