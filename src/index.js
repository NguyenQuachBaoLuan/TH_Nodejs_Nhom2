const express = require('express') 
const ejs = require('ejs')
const app = express()
const port = 3000 
app.set('view engine','ejs')
app.set('views','./src/views')
app.get('/', (req, res) => {  res.send('Hello World!') })
app.get('/about', (req, res) => {  res.render('about') }) 
app.get('/test', (req, res) => {  res.render('test') }) 

app.listen(port, () => { 
 console.log(`Example app listening on port ${port}`) })