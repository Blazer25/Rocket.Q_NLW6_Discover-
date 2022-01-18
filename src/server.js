const express = require('express') //importando o expres
const route = require('./route')
const path = require('path')

const server = express() // o () inicia o express

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views')) // o path pega o caminho da pasta até esse arquivo (server.js), o JOIN pega o arquivo server.js e junta com a pasta view
server.use(express.static("public")) //irá utilizar a pasta publica e seus arquivos

server.use(express.urlencoded({ extended: true }))

server.use(route)

server.listen(5000, () => console.log("RODANDO O SERVER")) // => é equivalente a uma FUNÇÃO