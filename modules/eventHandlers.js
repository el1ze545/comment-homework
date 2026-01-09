import { updateComments, getComments, addComment } from './commentsData.js'
import { securityHtml } from './security.js'
import {
    setReplyingToCommentId,
    clearReplyingToCommentId,
} from './commentsData.js'
import { renderComments } from './renderComments.js'
import { postComment, getComments as fetchComments } from './api.js'

export function setupLikeHandlers() {
    const likeButtons = document.querySelectorAll('.like-button')

    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            const id = Number(button.dataset.id)
            handleLikeClick(id)
        })
    })
}

export function setupQuoteHandlers() {
    const commentElements = document.querySelectorAll('.comment')

    commentElements.forEach((comment) => {
        comment.addEventListener('click', (event) => {
            if (!event.target.closest('.like-button')) {
                const id = Number(comment.dataset.id)
                handleQuoteClick(id)
            }
        })
    })
}

export function setupAddCommentHandler() {
    const buttonEl = document.getElementById('add-form-button')
    const addNameEl = document.getElementById('add-name')
    const addTextEl = document.getElementById('add-text')
    const addFormEl = document.getElementById('add-form')

    buttonEl.addEventListener('click', () => {
        handleAddComment(addNameEl, addTextEl, addFormEl)
    })
}

function handleLikeClick(id) {
    const comments = getComments()
    const foundComment = comments.find((comment) => comment.id === id)

    if (foundComment) {
        foundComment.isLiked = !foundComment.isLiked
        foundComment.likes += foundComment.isLiked ? 1 : -1

        const updatedComments = comments.map((comment) =>
            comment.id === id ? foundComment : comment,
        )
        updateComments(updatedComments)
        renderComments()
    }
}

function handleQuoteClick(id) {
    const addTextEl = document.getElementById('add-text')
    const foundComment = getComments().find((comment) => comment.id === id)

    if (foundComment) {
        const authorName = foundComment.author
            ? foundComment.author.name
            : 'Аноним'
        addTextEl.value = `>${securityHtml(authorName)}:\n>${securityHtml(foundComment.text)}`
        setReplyingToCommentId(id)
        addTextEl.focus()
    }
}

function handleAddComment(addNameEl, addTextEl, addFormEl) {
    if (!addNameEl.value.trim() || !addTextEl.value.trim()) {
        alert('Пожалуйста, заполните все поля ввода!')
        return
    }

    const buttonEl = addFormEl.querySelector('button')
    const originalButtonText = buttonEl.textContent

    buttonEl.textContent = 'Отправляется...'
    buttonEl.disabled = true
    addNameEl.disabled = true
    addTextEl.disabled = true

    const nameValue = addNameEl.value
    const textValue = addTextEl.value

    const newComment = {
        name: nameValue,
        text: textValue,
    }

    postComment(newComment)
        .then((result) => {
            console.log('Ответ от сервера:', result)

            return fetchComments()
        })
        .then((updatedComments) => {
            updateComments(updatedComments)
            renderComments()

            addNameEl.value = ''
            addTextEl.value = ''
            clearReplyingToCommentId()
        })

        .catch((error) => {
            console.log('Ошибка при добавлении комментария:', error.message)

            addNameEl.value = nameValue
            addTextEl.value = textValue

            if (error.message === 'Ошибка подключения к интернету') {
                alert('Проверьте подключение к интернету')
            } else if (error.message === 'Сервер сломался') {
                alert('Сервер временно недоступен, попробуйте позже')
            } else if (error.message === 'Плохой запрос') {
                alert('Имя и комментарий должны быть не короче 3-х символов')
            } else {
                alert('Произошла ошибка при добавлении комментария')
            }
        })
        .finally(() => {
            buttonEl.textContent = originalButtonText
            buttonEl.disabled = false
            addNameEl.disabled = false
            addTextEl.disabled = false
        })
}
