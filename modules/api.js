const BaseUrl = 'https://wedev-api.sky.pro/api/v1/ilya-sozykin'
export function getComments() {
    return fetch(`${BaseUrl}/comments`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки комментариев')
            }
            return response.json()
        })
        .then((data) => {
            return data.comments
        })
}

export function postComment({ name, text }) {
    return fetch(`${BaseUrl}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            name: name.trim(),
            text: text.trim(),
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка добавления комментария')
        }
        return response.json()
    })
}
