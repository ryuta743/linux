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
    connection.query('SELECT * from order_lists where shop_id=? ORDER BY buy_date DESC', shop_id,
        function (error, results, fields) {
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.json(results);
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
    connection.query('SELECT * from order_details INNER JOIN product_lists ON order_details.product_id = product_lists.product_id where order_details.shop_id=? && order_details.order_number=?', [shop_id, order_num],
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

router.get('/getSale', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from discount INNER JOIN product_lists ON discount.product_id = product_lists.product_id WHERE discount.shop_id=? GROUP BY discount.sale_id', shop_id,
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

router.get('/getSaleitem', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const sale_id = req.query.sale_id;
    console.log('渡されたセールid:' + sale_id)
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from discount INNER JOIN product_lists ON discount.product_id = product_lists.product_id WHERE discount.sale_id=?', sale_id,
        function (error, results, fields) {
            console.log(results)
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

router.get('/getOrderSales', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    console.log('渡されたショップid:' + shop_id)
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from order_details INNER JOIN product_lists ON order_details.product_id = product_lists.product_id WHERE order_details.shop_id=?', shop_id,
        function (error, results, fields) {
            console.log(results)
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

router.get('/getTrend', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    console.log('渡されたショップid:' + shop_id)
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT *,sum(order_details.count) AS datacount from order_details INNER JOIN product_lists ON order_details.product_id = product_lists.product_id WHERE order_details.shop_id=? GROUP BY order_details.product_id ORDER BY datacount DESC', shop_id,
        function (error, results, fields) {
            console.log(results)
            if (error == null) {
                if (results.length > 0) {
                    return res.json(results);
                } else {
                    return res.json(results);
                }
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});


/* インサート */
router.get('/addSale', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const sale_id = req.query.sale_id;
    const product_id = req.query.product_id;
    const shop_id = req.query.shop_id;
    const rate = req.query.rate;
    const sale_name = req.query.sale_name;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('INSERT INTO discount VALUES(?,?,?,?,?)', [sale_id, product_id, shop_id, rate, sale_name],
        function (error) {
            if (error == null) {
                return res.status(200);
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

router.get('/addProduct', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    const product_name = req.query.product_name;
    const product_name_en = req.query.product_name_en;
    const product_number = req.query.product_number;
    const price = req.query.price;
    const record_date = req.query.record_date
    const product_detail = req.query.product_detail
    const product_img = req.query.product_img
    const stock = req.query.stock
    const safety = req.query.safety
    const size = req.query.size
    const mate = req.query.mate
    const weight = req.query.weight
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('INSERT INTO product_lists VALUES(null,?,?,?,?,?,?,?,?,?,?,?,?,?)', [shop_id, product_name, product_name_en, product_number, price, record_date, product_detail, product_img, stock, safety, size, mate, weight],
        function (error) {
            if (error == null) {
                return res.status(200);
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});

/*  アップデート処理 */

router.get('/proccessUp', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const order_number = req.query.order_number;
    const product_id = req.query.product_id;
    const which = req.query.which;
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('UPDATE order_details SET proccess=? WHERE order_number=? AND product_id=?', [which, order_number, product_id],
        function (error) {
            if (error == null) {
                return res.status(200);
            } else {
                console.log('エラーはいてるよ' + error)
                return res.status(504)
            }
        })
    connection.end();
});



router.get('/newest_product', function (req, res) {
    console.log('最新の商品IDセレクトのAPI届いたよ')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    const shop_id = req.query.shop_id
    const sql = 'SELECT product_id FROM product_lists WHERE shop_id=? ORDER BY product_id DESC LIMIT 1';
    console.log(sql)
    connection.query(sql, shop_id, function (error, results) {
        console.log(results)
        if (error) return res.json(error);
        if (results.length > 0) return res.json(results);
        return res.json(results);
    })
    connection.end();
});

router.get('/tag_add', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const product_id = req.query.product_id;
    const tag_jp = req.query.tag_jp;
    const tag_en = req.query.tag_en
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    const sql = `INSERT INTO product_tags VALUES (?,?,?);`;
    connection.query(sql, [product_id, tag_jp, tag_en], function (error) {
        if (error) return res.json(error);
        res.json(1);
    })
    connection.end();
});

//発送済みのやーつ
router.get('/shipping_end', function (req, res) {
    console.log('発送済みにするAPI')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    const order_number = req.query.order_number;
    const sql = `UPDATE order_lists SET status=1 WHERE order_number=?`;
    console.log(sql)
    connection.query(sql, order_number, function (error) {
        if (error) return res.json(error);
        res.json(1);
    })
    connection.end();
})

module.exports = router;

router.get('/get_order_lists', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    const shop_id = req.query.shop_id;
    const order_num = req.query.order_number
    var connection = mysql.createConnection(mysql_setting);
    connection.connect();
    connection.query('SELECT * from order_lists  WHERE shop_id=? && order_number=?', [shop_id, order_num],
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