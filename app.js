const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const consign = require("consign")

const path = require("path")

let app = express()

app.use(cors())

app.use(bodyParser.json({ limit: "1mb" }))

app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app;

consign({ cwd: path.resolve(`${__dirname}`) })
    .then("routes")
    .into(app)
