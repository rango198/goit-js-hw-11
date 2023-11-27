import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = "40817226-5cbcf23b486840d855816afe8"

export async function getServicePhoto(q, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  const responce = await axios.get(url);
  return responce.data
}
