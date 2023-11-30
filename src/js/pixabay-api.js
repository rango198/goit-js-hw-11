import axios from 'axios';

const KEY = '40817226-5cbcf23b486840d855816afe8';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchPhoto(q, page, perPage) {
  const url = `?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
 const response = await axios.get(url);
 return response.data; 
}
