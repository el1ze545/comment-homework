import { updateComments } from './modules/commentsData.js'
import { renderComments } from './modules/renderComments.js'
import { setupAddCommentHandler } from './modules/eventHandlers.js'
import { getComments } from './modules/api.js'

setupAddCommentHandler()

getComments()
    .then((comments) => {
        updateComments(comments)
        renderComments()
    })
    .catch((error) => {
        console.error('Ошибка загрузки:', error)
    })
