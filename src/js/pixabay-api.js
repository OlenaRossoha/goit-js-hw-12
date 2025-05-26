import axios from 'axios';

const API_KEY = '50483105-27f5d2c3ecd49e5e7204371e4';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 20;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
