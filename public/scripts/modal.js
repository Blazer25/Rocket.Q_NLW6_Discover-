export default function Modal() {

    const cancelButton = document.querySelector('.button.cancel')
    cancelButton.addEventListener("click", close)

    const modalWrapper = document.querySelector('.modal-wrapper')

    function open() {
        //Atribuir a Classe active para a modal (no html)
        modalWrapper.classList.add("active")
    }
    function close() {
        //Remover a classe Active da modal (no html)
        modalWrapper.classList.remove("active")
    }

    return {
        open,
        close
    }
}