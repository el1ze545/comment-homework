const BaseUrl = 'https://wedev-api.sky.pro/api/v1/ilya-sozykin'
export function getComments() {
    const commentsEl = document.getElementById('comments')
    const defaultCommentsHTML = commentsEl.innerHTML

    comments.innerHTML =
        '<div class="loading-page-message">Загрузка списка комментариев...</div>'

    const addFormEl = document.getElementById('add-form')

    addFormEl.disabled = true

    return fetch(`${BaseUrl}/comments`)
        .then((response) => {
            comments.innerHTML = defaultCommentsHTML
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }

            return response.json()
        })
        .then((data) => {
            return data.comments
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Проверьте подключение к интернету')
            } else {
                alert('Ошибка при загрузке комментариев')
            }
            throw error
        })
        .finally(() => {
            addFormEl.disabled = false
        })
}

export function postComment({ name, text }) {
    return fetch(`${BaseUrl}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            name: name.trim(),
            text: text.trim(),
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался')
            }

            if (response.status === 400) {
                throw new Error('Плохой запрос')
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`)
            }

            return response.json()
        })

        .then((data) => {
            return data.comment || data
        })

        .catch((error) => {
            console.log('Ошибка в postComment:', error.message)
            if (error.message === 'Failed to fetch') {
                throw new Error('Ошибка подключения к интернету')
            } else {
                throw error
            }
        })
}
