const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const { engine } = require ('express-handlebars')
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
const route = require('./routes/index')
const apiroute = require('./routes/apiindex')
const db = require('./configs/connect')
const session = require('express-session')
const { prototype } = require('events')
// const fs = require('fs');
// const mainTemplate = fs.readFileSync('layouts/main.hbs', 'utf8');
// const compiledTemplate = handlebars.compile(mainTemplate);
handlebars.registerHelper('compare', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
handlebars.registerHelper('comparee', function (a, b, options) {
  if (a != b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
handlebars.registerHelper('for', function (from, to, options) {
  let result = '';
  for (let i = from; i <= to; i ++) {
    result += options.fn(i);
  }
  return result;
});
// connect database
db.conn;
// 
const app = express()
const port = 8080;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }))
    // Middleware để thêm dữ liệu session vào context của Handlebars
app.use((req, res, next) => {
    // Đảm bảo rằng req.session đã được khởi tạo
    if (!req.session) {
      return next();
    }
  
    // Truyền dữ liệu session vào context của Handlebars
    res.locals.session = req.session;
    next();
  });
app.use(express.urlencoded())
app.use(express.json())

app.use(express.static(path.join(__dirname ,'views/Asset')))
app.use(express.static(path.join(__dirname ,'public')))
app.engine('hbs', engine({
    extname: ".hbs",
    helpers: {
        eq: (a, b) => a === b,
        sum: (a,b) => a + b,
    },
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs')
app.set('views', './src/views')
// // apiRoutes
apiroute(app)
// Routes
route(app)

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})