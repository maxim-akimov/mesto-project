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

function activateSubmitButton(formElement, options) {
    const btnElement = formElement.querySelector(options.submitButtonSelector);
    btnElement.classList.remove(options.inactiveButtonClass);
    btnElement.disabled = false;
}

function blockedSubmitButton(formElement, options) {
    const btnElement = formElement.querySelector(options.submitButtonSelector);
    btnElement.classList.add(options.inactiveButtonClass);
    btnElement.disabled = true;
}

function isValid(formElement, inputElement, options) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
        blockedSubmitButton(formElement, options)
    } else {
        hideInputError(formElement, inputElement, options);
        activateSubmitButton(formElement, options)
    }
}

function showInputError(formElement, inputElement, errorMessage, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(options.inputErrorClass);
    errorElement.classList.add(options.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
}



