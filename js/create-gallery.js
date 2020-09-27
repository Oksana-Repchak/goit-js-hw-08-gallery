import galleryReference from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const CloseModalBtn = document.querySelector('[data-action="close-lightbox"]');
const imageEl = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const modalWindowEl = document.querySelector('.lightbox');

const galleryMarkup = createGalleryMarkup(galleryReference);
galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

galleryList.addEventListener('click', onGalleryListElClick);
CloseModalBtn.addEventListener('click', onCloseModal);
lightboxOverlay.addEventListener('click', onOverlayClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link"
        href="${original}">
            <img class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"/>
        </a>
    </li>`;
    })
    .join('');
}

function onGalleryListElClick(event) {
  event.preventDefault();
  const isGalleryLink = event.target.classList.contains('gallery__image');
  if (!isGalleryLink) {
    return;
  }
  onCloseModal();
  onOpenModal(modalWindowEl);
  setAttributeValue(event.target.dataset.source);
}

function setAttributeValue(srs) {
  imageEl.src = srs;
}

function cleanAttributeValue(src) {
  imageEl.src = '';
}

function onCloseModal(event) {
  window.removeEventListener('keydown', onEscKeyDown);
  const curentActiveImage = document.querySelector('.lightbox.is-open');

  if (curentActiveImage) {
    curentActiveImage.classList.remove('is-open');
  }
  cleanAttributeValue(event);
}

function onOpenModal(modalEl) {
  window.addEventListener('keydown', onEscKeyDown);
  // window.addEventListener('keydown', onPointerKeyDown);
  modalEl.classList.add('is-open');
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyDown(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

// function onPointerKeyDown(event) {
//   if (event.code === 'ArrowRight') {
// event.target = event.target.parentNode.nextSibling;
// console.log(event.target.parentNode.nextSibling);
// }
//     if (event.code === 'ArrowLeft') {
// }
// }
