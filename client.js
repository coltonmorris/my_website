'use strict'

let grpc = require('grpc')
let protofile = __dirname + '/../proto/main.proto'
let mainProto = grpc.load(protofile).main
let client = new mainProto.Classify('192.168.99.101:8888', grpc.credentials.createInsecure())


client.classifyUrl({url: 'http://i.imgur.com/nwertuO.jpg'}, (err, res) => {
  console.log('error: ', err)
  console.log('response: ', res)
})
