const express = require('express')()

const http = require("http")

const cors = require('cors')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

express.use(cors())

express.use(bodyParser.json({ limit: "1mb" }))

express.use(bodyParser.urlencoded({ extended: true }))


let server

const port = normalizePort(process.env.PORT || "3000")
express.set("port", port)

server = http.createServer(express)

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port))
        return val

    if (port >= 0)
        return port

    return false
}

function onError(error) {
    if (error.syscall !== "listen")
        throw error

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + " is already in use")
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    const addr = server.address()
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
    console.log(`Online ${bind}`)
}