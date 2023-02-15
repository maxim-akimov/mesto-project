export function enableValidation(options) {
    if (typeof options === 'object') {
        const formElement = document.querySelectorAll(options.formSelector);
        formElement.forEach(form => {
            setEventListeners(form, options);
        })
    }
}

function setEventListeners(formElement, options) {
    const inputsList = formElement.querySelectorAll(options.inputSelector)

    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(formElement, input, options);
        })
    })
}

function isValid(formElement, inputElement, options) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
}

function showInputError(formElement, inputElement, errorMessage, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.classList.add(`${options.errorClass}_visible`);;
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(`${options.errorClass}_visible`);
    errorElement.textContent = '';
}



