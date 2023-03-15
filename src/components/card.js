import { insertLike, deleteLike } from "./api";
import {openPicturePopup, openPopup} from "./modal";
import { userId } from "./utils";



//Контейнер для карточек
export const cardContainer = document.querySelector('.elements');

//Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;



/**
 * Подготовка карточки и вставка на страницу
 */
//Подготовка разметки карточки
/*export function buildCard(id, name, link, likes, isRemovable, hasLike) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
//?
    cardElement.setAttribute('data-card-id', id);
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.element__heading').textContent = name;
    cardElement.querySelector('.element__like-counter').textContent = likes;

    if(!isRemovable) {
        cardElement.querySelector('.btn_style_delete').remove();
    }

    if(hasLike) {
        cardElement.querySelector('.btn_style_like').classList.add('btn_style_like-active')
    }

    //cardElement.querySelector('.btn_style_like').addEventListener('click', toggleLike);
    cardImage.addEventListener('click', () => openPicturePopup(name, link));

    return cardElement;
}



export function checkLikeState(user, likes) {
    if(likes) {
        for(let i = 0; i < likes.length; i++ ) {
            if(user._id === likes[i]._id) {
                return true;
            }
        }
    }
    return false;
}
*/


//Вставка карточки в разметку страницы
export function prependCard(cardObject) {
    cardContainer.prepend(cardObject)
}


/*
export function deleteCardMarkup(id) {
    cardContainer.querySelector(`.element[data-card-id="${id}"]`).remove();
}


//Постановка лайка
export function setLike(evt) {
    if (evt.target.classList.contains('btn_style_like')) {
        const likeButton = evt.target;
        const cardElement = evt.target.closest('.element');
        const cardId = cardElement.dataset.cardId;

        likeButton.style.visibility = 'hidden';

        insertLike(cardId)
            .then(res => {
                evt.target.classList.add('btn_style_like-active');
                cardElement.querySelector('.element__like-counter').textContent = res.likes.length;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                likeButton.style.visibility = 'visible';
            });
    }
}



//Снятие лайка
export function resetLike(evt) {
    if (evt.target.classList.contains('btn_style_like')) {
        const likeButton = evt.target;
        const cardElement = evt.target.closest('.element');
        const cardId = cardElement.dataset.cardId;

        likeButton.style.visibility = 'hidden';

        deleteLike(cardId)
            .then(res => {
                evt.target.classList.remove('btn_style_like-active');
                cardElement.querySelector('.element__like-counter').textContent = res.likes.length;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                likeButton.style.visibility = 'visible';
            });
    }
}



export function toggleLike(evt) {
    if (evt.target.classList.contains('btn_style_like')) {
        if(evt.target.classList.contains('btn_style_like-active')) {
            resetLike(evt);
        } else {
            setLike(evt);
        }
    }
}*/


export class Card {
    constructor (data/*, selector*/) {
        this._data = data;
        //this._selector = selector
        this._cardElement = this._createElement();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeElement = this._cardElement.querySelector('.btn_style_like');
        this._setEventListeners();
        this._toggleLike()
        console.log(this._cardElement._id)
        
    }
//создаем элемент карточки
    _createElement() {
        const cardEl = cardTemplate.querySelector('.element').cloneNode(true)
        //const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
        const cardImage = cardEl.querySelector('.element__image')
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        cardEl.querySelector('.element__heading').textContent = this._data.name;
        
        return cardEl
    }
//находим лайк
    _likeCard() {
        this._likeElement.classList.toggle('btn_style_like-active');
    }
   //удаление 
    _removeCard() {
        this._cardElement.remove()
        
    }
//открытие окна изображения
    _openPreview() {
        const popupPictureView = document.querySelector('.popup_action_show-card');
        const popupImageElement = popupPictureView.querySelector('.popup__image');
        const popupFigcaptionElement = popupPictureView.querySelector('.popup__figcaption');
        popupImageElement.src = this._data.link;
        popupFigcaptionElement.textContent = this._data.name
        openPopup(popupPictureView)
   }
//добавление обработчиков лайка, удаления, открытия картинки
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._openPreview()
        });

        
        const trashIcon = this._cardElement.querySelector('.btn_style_delete');
        trashIcon.addEventListener('click', () => {
            this._removeCard()
        
        })
    
    
        this._likeElement.addEventListener('click', () => {
            this._likeCard()
        })
        

    }
    _setLike() {
        if (this._likeElement.classList.contains('btn_style_like')) {
            //const likeButton = evt.target;
            //const cardElement = evt.target.closest('.element');
            //const cardId = cardElement.dataset.cardId;
            const cardId = this._cardElement._id
    
            //this._likeElement.style.visibility = 'hidden';
    
            insertLike(cardId)
                .then(res => {
                    
                    this._likeElement.classList.add('btn_style_like-active');
                    this._cardElement.querySelector('.element__like-counter').textContent = res.likes.length;
                })
                .catch(err => {
                    console.log(err);
                })
                /*.finally(() => {
                    this._likeElement.style.visibility = 'visible';
                });*/
        }
    }
    _resetLike() {
        if (this._likeElement.contains('btn_style_like')) {
           // const likeButton = evt.target;
            //const cardElement = evt.target.closest('.element');
            //const cardId = cardElement.dataset.cardId;
            const cardId = this._cardElement._id
    
           // this._likeElement.style.visibility = 'hidden';
    
            deleteLike(cardId)
                .then(res => {
                    this._likeElement.classList.remove('btn_style_like-active');
                    this._cardElement.querySelector('.element__like-counter').textContent = res.likes.length;
                })
                .catch(err => {
                    console.log(err);
                })
                /*.finally(() => {
                    this._likeElement.style.visibility = 'visible';
                });*/
        }
    }
    _toggleLike() {
        if (this._likeElement.classList.contains('btn_style_like')) {
            if(this._likeElement.classList.contains('btn_style_like-active')) {
                this._resetLike();
            } else {
                this._setLike();
            }
        }
    }
   

    getElement() {
        return this._cardElement
    }
}