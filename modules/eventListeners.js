import { commentsData, replyingToCommentId } from './commentsData.js'
import { securityHtml } from './security.js'
import { formatDate } from './utils.js'
import { renderComments } from './renderComments.js'

export function setupEventListeners() {
    const addNameEl = document.getElementById('add-name')
    const addTextEl = document.getElementById('add-text')
    const buttonEl = document.getElementById('add-form-button')
    const commentsEl = document.getElementById('comments')

    commentsEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const id = Number(event.target.dataset.id)

            const foundComment = commentsData.find(
                (comment) => comment.id === id,
            )

            if (foundComment) {
                foundComment.isLiked = !foundComment.isLiked
                foundComment.likes += foundComment.isLiked ? 1 : -1

                renderComments()
            }

            return
        }

        const commentElement = event.target.closest('.comment')

        if (commentElement) {
            const id = Number(commentElement.dataset.id)
            const foundComment = commentsData.find(
                (comment) => comment.id === id,
            )

            if (foundComment) {
                addTextEl.value = `>${securityHtml(foundComment.name)}:\n>${securityHtml(foundComment.text)}`

                replyingToCommentId = id

                addTextEl.focus()
            }
        }
    })

    buttonEl.addEventListener('click', () => {
        if (!addNameEl.value.trim() || !addTextEl.value.trim()) {
            alert('Пожалуйста, заполните все поля ввода!')
            return
        }

        const newComment = {
            id: Date.now(),
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
        replyingToCommentId = null
    })
}
