import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//Pegar os botões com a classe 'check'
const checkButtons = document.querySelectorAll(".actions a.check") // a constante checkButtons é selecionar os itens que estão dentro da classe 'actions' sendo eles somente itens 'a' da classe 'check'

checkButtons.forEach(button => {
    //adicionar o listen (escuta)       
    button.addEventListener("click", handleClick)
})

//Botão deletar
const deleteButton = document.querySelectorAll(".actions a.delete")
deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false)) // a tag evento leva todo o conteudo do 'evento' executado dentro de si
})

function handleClick(event, check = true) {

    const actionButton = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const form = document.querySelector(".modal form")
    const questionId = event.target.dataset.id //dentro de todo o EVENTO do click, ele ira pegar o dataset.id

    form.setAttribute("action", `/question/${roomId}/${questionId}/${actionButton}`)


    event.preventDefault() //faz com que os links não se comportem como links

    modalTitle.innerHTML = check ? "Marcar como lida" : "Excluir a pergunta"
    modalDescription.innerHTML = check ? "Deseja marcar a pergunta como lida?" : "Deseja excluir a pergunta?"
    modalButton.innerHTML = check ? "Sim" : "Sim"

    if (check == true) {
        modalButton.classList.remove("red")

    } else {
        modalButton.classList.add("red")
    }


    modal.open()
}


//abre a modal
modal.open()