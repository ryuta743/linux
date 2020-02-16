var express = require('express');
const cors = require('cors')
var router = express.Router();
router.use(cors())
var mysql = require('mysql');

// MySQLの設定情報
var mysql_setting = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tenshoku',
    port: 3306
};

router.get('/checkmail', (req, res, next) => {
    const mail = req.query.mail;
    const line_id = req.query.id;
    var user_id;
    console.log('渡された文字列:' + mail)
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from user_lists where user_mail=?', mail,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    if (results[0].user_name) {
                        user_id = results[0].user_id;
                        linkAccount(res, user_id, line_id)
                    }
                } else {
                    return res.json({
                        result: false
                    })
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.json({
                    result: 'error'
                })
            }
        })
    connection.end();
});

function linkAccount(res, user_id, line_id) {
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('INSERT INTO line_link VALUES(?,?)', [user_id, line_id], function (error) {
        if (error == null) return res.json({
            result: true
        });
        return res.json({
            result: 'e',
            error: error
        })
    })
    connection.end();
}

module.exports = router;