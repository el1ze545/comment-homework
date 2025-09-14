export function formatDate(dateString = null) {
    if (dateString) return dateString

    return new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}
