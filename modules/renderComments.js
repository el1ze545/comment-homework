import { securityHtml } from './security.js'
import { commentsData } from './commentsData.js'

export function renderComments() {
    const commentsEl = document.getElementById('comments')
    commentsEl.innerHTML = ''
    commentsData.forEach((comment) => {
        const likeClass = comment.isLiked ? '-active-like' : ''

        const commentHtml = `
            <li class="comment" data-id="${comment.id}">
            <div class="comment-header">
                <div>${securityHtml(comment.name)}</div>
                <div>${securityHtml(comment.date)}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${securityHtml(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${likeClass}" data-id="${comment.id}"></button>
                </div>
            </div>
            </li>
        `
        commentsEl.insertAdjacentHTML('beforeend', commentHtml)
    })
}
