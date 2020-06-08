const express = require('express')
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Sequelize } = require('sequelize')

const app = express()

const port = 3000
const factorial = n => !(n > 1) ? 1 : factorial(n - 1) * n;

app.use(bodyParser.json())

const sequelize = new Sequelize(process.env.DB_URI)
sequelize.authenticate().then(() => console.log("sequelize connected"))

app.get('/api/', (req, res) => res.json({ message: 'Hello world' }))
app.get('/api/factorial/:n', (req, res) => res.json({ factorial: factorial(req.params.n) }))

app.post("/api/signin", async (req, res) => {
    if (!req.body.email) return res.status(500).json({ error: "email not provided" })
    if (!req.body.pass) return res.status(500).json({ error: "password cannot be null" })
    const pass = bcrypt.hashSync(req.body.pass, 8)
    const email = req.body.email
    try {
        const result = await sequelize.query("INSERT INTO public.users (email, password) values (:email, :pass)", { replacements: { email, pass } })
        return res.json({ result })
    } catch (e) {
        return res.status(500).json({ error: e })
    }

})

app.post("/api/login", async (req, res) => {
    if (!req.body.email) return res.status(500).json({ error: "email not provided" })
    if (!req.body.pass) return res.status(500).json({ error: "password cannot be null" })
    const pass = req.body.pass
    const email = req.body.email
    try {
        const result = await sequelize.query("SELECT id, email, password, role FROM public.users WHERE email=:email", {
            replacements: { email }
        })
        if (result[0].length == 0) throw new Error("Login not possible")
        const user = result[0][0]
        const isCorrect = bcrypt.compareSync(pass, user.password)
        console.log(user, isCorrect)
        if (!isCorrect) throw new Error("Login not possible")
        delete user.password
        const data = {
            "sub": `${user.id}`,
            "name": user.email,
            "admin": false,
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["editor", "user", "mod"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": `${user.id}`,
                "x-hasura-role": user.role
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret')
        return res.json({ token })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))