const http = require("http")

const mongoose = require('mongoose')

const app = require('./app')

let server

const port = 3000

app.set("port", process.env.PORT || port)

server = http.createServer(app)

server.listen(port)

server.on("error", onError)

server.on("listening", onListening)

function onError(error) {
    console.log("error: ", error)
}

function onListening() {
    console.log(`Online port ${port}`)
}