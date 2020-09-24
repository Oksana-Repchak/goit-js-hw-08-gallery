import galleryReference from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryMarkup(galleryReference);

galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      `<li class="gallery__item">
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
