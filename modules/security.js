export function securityHtml(unsecurityText) {
    if (typeof unsecurityText !== 'string') {
        return unsecurityText
    }

    return unsecurityText
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}
