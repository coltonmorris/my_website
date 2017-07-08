// my summoner id is 38918850

let express   = require('express')
let path      = require('path')
let app       = express()


app.use(express.static(path.join(__dirname, 'build')))

app.get('/hey', (req, res) => {
  console.log('visiting /hey')
  res.send('Hey, you are cute')
})

app.get('/jessy', (req, res) => {
  console.log('visiting /hey')
  res.send('isnt this neat?')
})

app.get('/', (req, res) => {
  console.log('request just came in')
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
