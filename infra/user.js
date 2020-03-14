const mongoose = require('./database')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        require: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

userSchema.pre('updateOne', function (next) {
    this.updatedAt = Date.now

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User