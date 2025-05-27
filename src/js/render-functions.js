import SimpleLightbox from 'simplelightbox';

let lightbox = new SimpleLightbox('#gallery a');

const galleryEl = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="gallery-info">
          <p><b>Likes:</b> <span>${likes}</span></p>
          <p><b>Views:</b> <span>${views}</span></p>
          <p><b>Comments:</b> <span>${comments}</span></p>
          <p><b>Downloads:</b> <span>${downloads}</span></p>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('show');
}

export function hideLoader() {
  loader.classList.remove('show');
}

export function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
