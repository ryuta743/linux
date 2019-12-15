// expressを読み込む
var app = require('express')();

// 私はapiです宣言
// apiの下層をパスにする
module.exports = {
  path: '/api',
  handler: app
}

// mysqlを読み込む
var mysql = require('mysql');

// mysqlと接続する
var db = mysql.createConnection({
  // host: 'mariadb',
  host: 'http://db:3306/',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

// createAccountにアクセスがあったときに行う処理を書きます
app.get('/createAccount', function (req, res) {
  const id = req.query.id;
  const password = req.query.password;
  //const id = Math.floor(Math.random() * 1111);
  //const password = 'root';
  const sql = `INSERT INTO userLists (id,password) VALUES ('${id}', '${password}');`;
  db.query(sql, function (error) {
    if (error) return res.json(error);
    res.json(1);
  })
})

// userListsを表示
app.get('/showUserLists', function (req, res) {
  const id = req.query.id;
  const sql = `SELECT * FROM userLists;`;
  db.query(sql, function (error, results) {
    if (error) return res.json(error);
    res.json(results);
    //console.log(results);
  })
})

//axiosから呼び出すやーつ
app.get('/apiReq', function (req, res) {
  //ここすら動いてない
  //apiにアクセスできてない？？？
  // 治ったぞごるぁあぁ 再起動何度もしたのになんですぐ治らんのじゃくそぼけ
  //console.log("test");
  //console.log(req.query.data.id);
  const box = req.query.id;
  //console.log(box.id);
  const sql = `SELECT * FROM userLists WHERE id = '${box}';`;
  db.query(sql, function (error, results) {
    if (error) return res.json(error);
    res.json(results);
  })
})

//インサートapi
app.get('/insertReq', function (req, res) {
  console.log("insertReq:Start");
  const bob = req.query.id;
  const ben = req.query.pass;
  console.log("bob id=" + bob);
  console.log("ben pass=" + ben);
  const sql = `INSERT INTO userLists (id,password) VALUES ('${bob}', '${ben}');`;
  db.query(sql, function (error, results) {
    if (error) return res.json(error);
    res.json(results);
  })
})
