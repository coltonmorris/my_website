'use strict'

let rp = require('request-promise')
let superagent = require('superagent')
let axios = require('axios')

console.log('trying cop-classifier')
let options = {
  method: 'POST',
  uri: 'http://cop-classifier/image',
  json: true,
  body: { url: 'http://i.imgur.com/nwertuO.jpg'}
}

let c = () => {
  return axios({method: 'post', url:'http://cop-classifier/image', data: JSON.stringify({url: 'http://i.imgur.com/nwertuO.jpg'})})
  .then((res) => {
    console.log('response keys: ', Object.keys(res))
    console.log('res body person: ', res.body.person)
    console.log('res body result: ', res.body.result)
  })
  .catch((err) => {
    console.log('error getting image info')
    console.log(Object.keys(err))
    console.log('err.response: ', err.response)
    console.log('err obj: ', err)
  })
}

let b = () => {
  return superagent
  .post('http://cop-classifier/image')
  .set('Content-Type', 'application/json')
  .send('{"url":"http://i.imgur.com/nwertuO.jpg"}')
  .then((res) => {
    console.log('response keys: ', Object.keys(res))
    console.log('res body person: ', res.body.person)
    console.log('res body result: ', res.body.result)
  })
  .catch((err) => {
    console.log('error getting image info')
    console.log(Object.keys(err))
    console.log('err.response: ', err.response)
    console.log('err full: ', err)
  })
}

let a = () => {
  console.log('request-promise')
  return rp(options)
  .then((res) => {
    console.log('response keys: ', Object.keys(res))
    console.log('response person: ', res.person)
    console.log('response result: ', res.result)
  })
  .catch((err) => {
    console.log('error getting image info')
    console.log(Object.keys(err))
    console.log('response err: ', err)

  })
  .then(() => {
    console.log('superagent')
    return b()
  })
  .then(() => {
    console.log('axios')
    return c()
  })
}


a()

