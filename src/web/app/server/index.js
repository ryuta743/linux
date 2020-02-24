const express = require('express')
const consola = require('consola')
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
const { createTerminus } = require('@godaddy/terminus')
const app = express()
const session = require('express-session')
var MemoryStore = require('memorystore')(session)
// メール   
var nodemailer = require('nodemailer')

// メッセージ
var message = {
  from    : 'tenshokuproject2020@gmail.com',
  to      : 'hankun0127taktak@gmail.com',
  subject : 'テスト',
  text    : 'テストです'
};

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

transporter.sendMail(message, function(err, response) {
  console.log(err || response);
});

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.use(
  session({
    secret: 'tenshoku',
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000}
  })
)

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  const server = http.createServer(app)

  async function beforeShutdown () {
    return new Promise(resolve => {
      setTimeout(resolve, 5000)
    })
  }
  
  createTerminus(server, {
    beforeShutdown
  })

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
