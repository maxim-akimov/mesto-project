export function getUser() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}



export function getCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}



export function updateUserProfile(name, vocation) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            name: name,
            about: vocation
        })
    })
}




export function addCard(name, link) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
        method: 'POST',
        headers: {
            authorization: 'f07db228-d9f6-44b3-81fa-e5425e2f6a35',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}