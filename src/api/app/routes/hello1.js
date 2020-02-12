var express = require('express');
const cors = require('cors')
var router = express.Router();
router.use(cors())

var mysql = require('mysql'); //★追加


// MySQLの設定情報
var mysql_setting = {
    host: 'db-service',
    user: 'root',
    password: 'root',
    database: 'tenshoku',
    port: 3306
};


// GETアクセスの処理
router.get('/', (req, res, next) => {


    // コネクションの用意
    var connection = mysql.createConnection(mysql_setting);


    // データベースに接続
    connection.connect();


    // データを取り出す
    connection.query('SELECT * from mydata',
        function (error, results, fields) {
            // データベースアクセス完了時の処理
            if (error == null) {
                var data = {
                    title: 'mysql',
                    content: results
                };
                res.render('hello/index', data);
            } else {
                console.log("hoge  " + error);
            }
        });


    // 接続を解除
    connection.end();
});