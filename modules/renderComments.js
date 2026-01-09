import { securityHtml } from './security.js'
import { formatDate, getComments } from './commentsData.js'
import { setupLikeHandlers, setupQuoteHandlers } from './eventHandlers.js'

export function renderComments() {
    const commentsEl = document.getElementById('comments')

    const comments = getComments()

    if (!comments || !Array.isArray(comments)) {
        return
    }

    commentsEl.innerHTML = ''

    comments.forEach((comment) => {
        const authorName =
            comment.name || (comment.author ? comment.author.name : 'Аноним')

        const likesCount = comment.likes || 0
        const isLiked = comment.isLiked || false
        const date = comment.date || new Date().toISOString()

        const likeClass = isLiked ? '-active-like' : ''

        const commentHtml = `
            <li class="comment" data-id="${comment.id}">
                <div class="comment-header">
                    <div>${securityHtml(authorName)}</div>
                    <div>${securityHtml(formatDate(date))}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${securityHtml(comment.text)}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${likesCount}</span>
                        <button class="like-button ${likeClass}" data-id="${comment.id}"></button>
                    </div>
                </div>
            </li>
        `
        commentsEl.insertAdjacentHTML('beforeend', commentHtml)
    })

    setupLikeHandlers()
    setupQuoteHandlers()
}
