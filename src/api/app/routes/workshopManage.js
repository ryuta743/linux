var express = require('express');
var router = express.Router();

var mysql = require('mysql');

// MySQLの設定情報
var mysql_setting = {
    host: 'db',
    user: 'root',
    password: '',
    database: 'tenshoku',
};

//ショップ情報をショップidから引き出す
router.get('/getShopdata', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from workshop_lists where shop_id=?', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403).json('You dont have workshop')
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getOrderlist', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from order_lists where shop_id=?', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getOrderdetail', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    const order_num = req.query.order_number
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from order_details INNER JOIN product_lists ON order_details.product_id = product_lists.product_id where order_details.shop_id=? && order_details.order_number=?', [shop_id,order_num],
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/getProducts', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from product_lists WHERE shop_id=? ', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.status(403)
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

module.exports = router;