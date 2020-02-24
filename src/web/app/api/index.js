import express from 'express'

// expressの読み込み
var app = express();

const bodyParser = require('body-parser')
// メール用
var nodemailer = require('nodemailer')

// var express = require('express');

const router = express.Router();

module.exports={
    path: '/api',
    handler: app
}

app.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

app.use(
    bodyParser.json()
)

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user : 'tenshokuproject2020@gmail.com',
    pass : 'tenshoku'
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

// セッション登録用
app.post('/sessionin', function (req, res) {
    console.log('セッションスタート');
    const user_data = req.body.kekka;
    console.log(user_data)
    if(user_data){
      console.log('true')
      req.session.loginuserdata = {user_data : user_data[0]}
      console.log('true2')
      console.log(req.session.loginuserdata)
      return res.json({user_data : user_data[0]})
    }
    return res.status(401).json({ message: 'Bad credentials' })
})

// ログアウト
app.post('/logout', (req, res) => {
    delete req.session.loginuserdata
    res.json({ ok: true })
})

// メール送信用
app.get('/send_mail', function (req,res) {
    console.log('toujou')
    // メッセージ
    var message = {
        from    : 'tenshokuproject2020@gmail.com',
        to      : req.query.to,
        subject : req.query.subject,
        text    : req.query.mail
    };
    console.log(message)
    // ここからメール送る関数
    transporter.sendMail(message, function(err, response) {
        if(err){
            return res.json(0)
        }else{
            return res.json(1)
        }
    });
})
