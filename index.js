require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const { registerError } = require('./src/presenters/register')
const { validateBodyJSON } = require('./src/presenters/handle')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({}))
app.use(cors())
app.use(morgan('combined'))
app.use(compression())
app.use(helmet())

app.disable('x-powered-by')

const port = process.env.PORT || 3000
const server = http.createServer(app)

require('./src/presenters/routes')(app)
app.use(validateBodyJSON)

app.use(registerError)
app.use((_, res) => res.status(404).json({ errors: [{ title: '404', message: 'Route not found' }] }))

server.listen(port, () => console.info(`Server start in host: http://localhost:${port}`))

module.exports = app
