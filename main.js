const comments = []


const inputContainer = document.createElement('div')
const input = document.createElement('input')
input.placeholder = 'Comment here!'
const commentsContainer = document.querySelector('#comments-container')

input.classList.add('input')

input.addEventListener('keydown', e=>{
    handleEnter(e,null)
})

commentsContainer.appendChild(inputContainer)
inputContainer.appendChild(input)

function handleEnter(e,current){ ///current => comentario actual
    if(e.key === 'Enter' && e.target.value !== '' ){
        const newComment = {
            text : e.target.value,
            likes:0,
            responses: []
        }
        if (current === null){
            comments.unshift(newComment)

        }else{
            current.responses.unshift(newComment)
        }

        e.target.value = ''
        commentsContainer.innerHTML = ''
        commentsContainer.appendChild(inputContainer)

        renderComments(comments, commentsContainer)
    }

}

function renderComments(arr, parent){
    arr.forEach(element => {
        const commentContainer = document.createElement('span')
        commentContainer.classList.add('comment-container')

        const responsesContainer = document.createElement('div')
        responsesContainer.classList.add('responses-container')

        const replyButton = document.createElement('button')
        const likeButton = document.createElement('button')
        const textContainer = document.createElement('div')
        textContainer.textContent = element.text

        const actionsContainer = document.createElement('div')


        replyButton.textContent='reply'
        likeButton.textContent =
         `${element.likes > 0? `${element.likes} Likes` : 'Like'}`

        replyButton.addEventListener('click', e=>{
            const newInput = inputContainer.cloneNode(true)
            newInput.value = ''
            newInput.focus()
            newInput.addEventListener('keydown', e=> {
                handleEnter(e, element)
            })
            commentContainer.insertBefore(newInput, responsesContainer)
            ///inyectamos un elemento 'A' antes que el 'B'
            ///es decir inyectamos el input antes de el contenedor de las respuestas

        })

        likeButton.addEventListener('click', e=>{
            element.likes++
            likeButton.textContent = `
            ${element.likes > 0 ? `${element.likes} likes` : 'like'}`
        })

        ///append
        ///capas de un comentario
        commentContainer.appendChild(textContainer)
        commentContainer.appendChild(actionsContainer)
        actionsContainer.appendChild(replyButton)
        actionsContainer.appendChild(likeButton)

        commentContainer.appendChild(responsesContainer)

        if (element.responses.length > 0){///recursion
            renderComments(element.responses, responsesContainer) ///responses y en donde las inyectamos
        }
        parent.appendChild(commentContainer)
    })
}