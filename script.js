const addNameEl = document.getElementById('add-name')
const addTextEl = document.getElementById('add-text')
const buttonEl = document.getElementById('add-form-button')
const commentsEl = document.getElementById('comments')

const commentsData = [
    {
        id: 1,
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        id: 2,
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    },
]

let replyingToCommentId = null

function formatDate(dateString = null) {
    if (dateString) return dateString

    return new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function renderComments() {
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

commentsEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-button')) {
        const id = Number(event.target.dataset.id)

        const foundComment = commentsData.find((comment) => comment.id === id)

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
        const foundComment = commentsData.find((comment) => comment.id === id)

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

renderComments()

function securityHtml(unsecurityText) {
    if (typeof unsecurityText !== 'string') {
        return unsecurityText
    }

    return unsecurityText
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}
