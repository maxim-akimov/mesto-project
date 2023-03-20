export function renderLoading (isLoading, btnElement) {
    if (isLoading) {
        btnElement.textContent = 'Сохранение...'
    } else {
        btnElement.textContent = 'Сохранить'
    }
}