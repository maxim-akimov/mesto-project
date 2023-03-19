export function renderLoading (isLoading) {
    if (isLoading) {
        this._saveButton.textContent = 'Сохранение...'
    } else {
        this._saveButton.textContent = 'Сохранить'
    }
}