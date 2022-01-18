const express = require('express')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')

const route = express.Router() //A constante route guarda todas as funcionalidades de rotas do express

route.get('/', (req, res) => res.render("index", { page: 'enter-room' }))
route.get('/create-room', (req, res) => res.render("index", { page: 'create-room' }))

route.get('/room/:room', roomController.open)
route.post('/create-room', roomController.create)
route.post('/enterroom', roomController.enter)

route.post('/question/create/:room', questionController.create)
route.post('/question/:room/:question/:action', questionController.index) //o : é usado quando irá ser inseridos dados/valores na rota/url

module.exports = route