const express = require('express')()

const http = require("http")

const cors = require('cors')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

express.use(cors())

express.use(bodyParser.json({ limit: "1mb" }))

express.use(bodyParser.urlencoded({ extended: true }))


let server

const port = 3000
express.set("port", process.env.PORT || port)

server = http.createServer(express)

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb+srv://jeziel:010065363je@cluster0-fk6kw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const User = mongoose.model('users', { name: String, document: String, birthday: Date, username: String, password: String })

express.post('/user', async (req, res, next) => {

    const user = new User({
        name: req.body.name,
        document: req.body.document,
        birthday: req.body.birthday,
        username: req.body.username,
        password: req.body.password
    })

    await user.save()

    res.json(user)
})

express.get('/user', async (req, res, next) => {

    let data = await User.find()

    res.json(data)
})

express.get('/user/:document', async (req, res, next) => {

    let data = await User.find({ document: req.params.document })

    res.json(data)
})

express.post('/login', async (req, res, next) => {

    let { username, password } = req.body

    let data = await User.find({ username, password })

    res.json(data)
})







function onError(error) {
    console.log("error: ", error)
}

function onListening() {
    console.log(`Online port ${port}`)
}