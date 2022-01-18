const Database = require("../db/config")

module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action


        const password = req.body.password // o password deve ser o nome que foi atribuido no input name de criação da sala

        // console.log(`room = ${roomId}, questionId = ${questionId}, action = ${action},
        // password = ${password}`)

        //Verificar se a senha da sala está correta
        const VerifyPassRoom = await db.get(`SELECT * FROM rooms WHERE id =${roomId}`) // o Get só traz um único dado do banco de dados, enquanto o All, traz todos os dados
        if (VerifyPassRoom.pass == password) {
            if (action == "delete") {

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

            } else if (action == "check") {

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
                //Se a senha estiver em branco
        }
        if (password == "") {
            res.render(`nullpassword`, { roomId: roomId })
        } else { //se a senha estiver errada
            res.render(`passwordincorrect`, { roomId: roomId })
        }

    },

    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
            )VALUES(
                "${question}",
                ${roomId},
                0
            )`)
            // console.log("Pergunta criada")

        res.redirect(`/room/${roomId}`)
    }
}