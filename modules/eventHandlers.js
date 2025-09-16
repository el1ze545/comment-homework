import { commentsData } from './commentsData.js'
import { securityHtml } from './security.js'
import {
    setReplyingToCommentId,
    clearReplyingToCommentId,
} from './commentsData.js'
import { renderComments } from './renderComments.js'
import { generateId, formatDate } from './utils.js'

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
    const commentsEl = document.getElementById('comments')

    buttonEl.addEventListener('click', () => {
        handleAddComment(addNameEl, addTextEl, commentsEl)
    })
}

function handleLikeClick(id) {
    const foundComment = commentsData.find((comment) => comment.id === id)

    if (foundComment) {
        foundComment.isLiked = !foundComment.isLiked
        foundComment.likes += foundComment.isLiked ? 1 : -1
        renderComments()
    }
}

function handleQuoteClick(id) {
    const addTextEl = document.getElementById('add-text')
    const foundComment = commentsData.find((comment) => comment.id === id)

    if (foundComment) {
        addTextEl.value = `>${securityHtml(foundComment.name)}:\n>${securityHtml(foundComment.text)}`
        setReplyingToCommentId(id)
        addTextEl.focus()
    }
}

function handleAddComment(addNameEl, addTextEl, commentsEl) {
    if (!addNameEl.value.trim() || !addTextEl.value.trim()) {
        alert('Пожалуйста, заполните все поля ввода!')
        return
    }

    const newComment = {
        id: generateId(),
        name: addNameEl.value.trim(),
        date: formatDate(),
        text: addTextEl.value.trim(),
        likes: 0,
        isLiked: false,
    }

    commentsData.push(newComment)
    renderComments()

    addNameEl.value = ''
    addTextEl.value = ''
    clearReplyingToCommentId()
}
