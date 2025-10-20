import { updateComments, getComments } from './commentsData.js'
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

    buttonEl.addEventListener('click', () => {
        handleAddComment(addNameEl, addTextEl)
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

function handleAddComment(addNameEl, addTextEl) {
    if (!addNameEl.value.trim() || !addTextEl.value.trim()) {
        alert('Пожалуйста, заполните все поля ввода!')
        return
    }

    const newComment = {
        name: addNameEl.value,
        text: addTextEl.value,
    }

    postComment(newComment)
        .then(() => {
            return fetchComments()
        })
        .then((comments) => {
            updateComments(comments)
            renderComments()
        })
        .catch((error) => {
            console.error('Ошибка:', error)
            alert('Не удалось добавить комментарий')
        })

    addNameEl.value = ''
    addTextEl.value = ''
    clearReplyingToCommentId()
}
