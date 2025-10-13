import { updateComments } from './modules/commentsData.js'
import {renderComments} from './modules/renderComments.js'
import {setupAddCommentHandler} from './modules/eventHandlers.js'

setupAddCommentHandler()

fetch('https://wedev-api.sky.pro/api/v1/ilya-sozykin/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        updateComments(data.comments)
        renderComments()
    })

