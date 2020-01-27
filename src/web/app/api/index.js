import express from 'express'

// expressの読み込み
var app = express();

const bodyParser = require('body-parser')


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

