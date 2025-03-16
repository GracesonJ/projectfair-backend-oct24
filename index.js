// import dotenv
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import Router
const router = require('./router')

// import connection
require('./connection')

// create server
const pfServer = express()

// use cors
pfServer.use(cors())

// Prase data - Returns middleware that only parses json data
pfServer.use(express.json())

// user route
pfServer.use(router)

// export uploads folder
pfServer.use('/upload', express.static('./uploads'))

// set port
const PORT = 4000 || process.env.PORT

// listen
pfServer.listen(PORT, ()=>{
    console.log(`Server is running successfully at PORT ${PORT}`);
    
})

pfServer.get('/', (req, res)=>{
    // console.log(`Get Request Recieved`);
    res.send(`Get Request Recieved`)
})

// pfServer.post('/', (req, res)=>{
//     res.send(`Post Request Recieved`)
// })

// pfServer.put('/', (req, res)=>{
//     res.send(`Put Request Recieved`)
// })

// pfServer.delete('/', (req, res)=>{
//     res.send(`Delete Request Recieved`)
// })