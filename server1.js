const express = require('express')
const server = express()
const parser = require('body-parser')
const routes = require('./routes1').routes
const PORT = process.argv[2] || 4005

server.use(parser.json())

server.get('/status',(rq,rs)=>{
    rs.send({
        message : 'Server is Running'
    })
})

// set the projects routes
server.use('/projects',routes)
// listening port
server.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})