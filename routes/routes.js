const User = require('../infra/user')

const bcrypt = require('bcryptjs')

module.exports = app => {

    app.get('/', (req, res, next) => res.json('sucesso'))

    app.post('/user', async (req, res, next) => {

        let data = User.findOne({ username: req.body.username })

        if (data)
            return res.status(401).json("Usuário já cadastrado")

        let user = await new User(
            {
                name: req.body.name,
                document: req.body.document,
                birthday: req.body.birthday,
                username: req.body.username,
                password: req.body.password
            }

        ).save()

        res.json(user)
    })

    app.get('/user', async (req, res, next) => {

        let data = await User.find()

        res.json(data)
    })

    app.get('/user/:document', async (req, res, next) => {

        let data = await User.find({ document: req.params.document })

        res.json(data)
    })

    app.post('/login', async (req, res, next) => {

        let { username, password } = req.body

        let data = await User.findOne({ username: username })

        if (!data)
            return res.status(401).json("Usuário ou senha inválido")

        if (!await bcrypt.compare(password, data.password || ''))
            return res.status(401).json("Usuário ou senha inválido")

        res.json(data)
    })
}