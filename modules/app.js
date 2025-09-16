import { renderComments } from './renderComments.js'
import { setupAddCommentHandler } from './eventHandlers.js'

export function initApp() {
    setupAddCommentHandler()

    renderComments()
}
