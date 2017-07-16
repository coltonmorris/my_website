'use strict'

let express    = require('express')
let path       = require('path')
let app        = express()
let bodyParser = require('body-parser')
let cors       = require('cors')


app.all('*', function(req, res, next){
  console.log('********************************')
  console.log('deep in the middleware of my-website server')
  console.log('********************************')
  //preflight needs to return exact request-header 
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers',
  req.headers['access-control-request-headers'])
  if ('OPTIONS' == req.method) {
    res.send(204)
  }
  next()
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.options('*', cors())
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  console.log('request just came in')
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(80, '0.0.0.0', () => {
  console.log('Server is listening on port 80')
})
