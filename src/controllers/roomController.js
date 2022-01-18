const Database = require("../db/config")

module.exports = {
    async create(req, res) {

        const db = await Database()
        const password = req.body.password

        let roomId
        let isRoom = true

        while (isRoom) // rodar enquanto isRoom = true 
        {

            //GERA O NÚMERO DA SALA
            for (var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                    roomId += Math.floor(Math.random() * 10).toString()
            }

            //VERIFICA SE O NÚMERO DA SALA JÁ EXISTE
            const roomsExistId = await db.all(`SELECT id FROM rooms`) //all é usado para retornos do banco de daados
            isRoom = roomsExistId.some(roomsExistId => roomsExistId === roomId)

            if (!isRoom) {
                //INSERE A SALA NO BANCO DE DADOS
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VAlUES (
                    ${parseInt(roomId)},
                    ${password}
                )`)
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    //Passa o número da sala criada
    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        let isNoQuestions

        //verificar se não há nenhuma pergunta
        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true
            }
        }

        res.render("room", { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions })
    },

    //usado para entrar em alguma sala já criada
    async enter(req, res) {
        const db = await Database()
        const roomId = req.body.roomId
        const VerifyIdRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if (VerifyIdRoom == null) {
            res.render(`idroomincorrect`)
        } else {
            res.redirect(`/room/${roomId}`)
        }
    }
}