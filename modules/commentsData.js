export let commentsData = []

let replyingToCommentId = null

export function getReplyingToCommentId() {
    return replyingToCommentId
}

export function setReplyingToCommentId(id) {
    replyingToCommentId = id
}

export function clearReplyingToCommentId() {
    replyingToCommentId = null
}

export let updateComments = (newCommentsData) => {
    commentsData = newCommentsData
}

export const formatDate = (dateString) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
