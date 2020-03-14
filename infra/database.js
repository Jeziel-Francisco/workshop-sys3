const mongoose = require("mongoose")

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb+srv://jeziel:010065363je@cluster0-fk6kw.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
mongoose.Promise = global.Promise

module.exports = mongoose