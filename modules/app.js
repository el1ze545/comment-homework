import { renderComments } from './renderComments.js'
import { setupEventListeners } from './eventListeners.js'

export function initApp() {
    setupEventListeners()
    renderComments()
}
