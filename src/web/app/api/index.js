import express from 'express'

// expressの読み込み
var app = express();

// var express = require('express');

const router = express.Router();

export default {
    path: '/api',
    handler: router
}

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})


// セッション登録用
router.post('/sessionin', function (req, res) {
    console.log('セッションスタート');
    const user_data = req.body.kekka;
    if(user_data){
      req.session.loginuserdata = {user_data : user_data[0]}
      console.log(req.session.loginuserdata)
      return res.json({user_data : user_data[0]})
    }
    return res.status(401).json({ message: 'Bad credentials' })
})

// ログアウト
router.post('/logout', (req, res) => {
    delete req.session.loginuserdata
    res.json({ ok: true })
  })

