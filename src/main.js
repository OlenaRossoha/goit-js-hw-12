import './css/styles.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.target.elements.query.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found. Try another search.' });
      return;
    }

    createGallery(data.hits);
    if (data.totalHits > 15) showLoadMoreButton();
  } catch (err) {
    iziToast.error({ message: 'Fetch error.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const { height } = document.querySelector('#gallery a').getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: `We're sorry, but you've reached the end of search results.` });
    }
  } catch (err) {
    iziToast.error({ message: 'Error loading more images.' });
  } finally {
    hideLoader();
  }
});
