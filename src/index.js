import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './export.js';
import { getServicePhoto } from './export.js';
import { createMarkup } from './export.js/markup.js';

const { formSearch, gallery, btnLoadMore } = refs;

const optionNotify = {
  position: 'center-center',
  timeout: 4000,
  width: '400px',
  fontSize: '24px',
};

const perPage = 40;
let page = 1;
let searchPhoto = '';

formSearch.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currenTarget.element;
  searchPhoto = searchQuery.value.trim().toLowerCase().split(' ').join('+');

  if (searchPhoto === '') {
    Notify.info('Enter your request, please!', optionNotify);
    return;
  }

  getServicePhoto(searchPhoto, page, perPage)
    .then(data => {
    const resultSearch = data.hits;
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        optionNotify
      );
    } else {
      Notify.info(`Hooray! We found ${data.totalHits} images.`, optionNotify);
    //  console.log(resultSearch);
     createMarkup(resultSearch);
     lightbox.refresh();
    }
      if (data.totalHits > perPage) {
        btnLoadMore.classList.remove('is-hidden');
        window.addEventListener('scroll', showLoadMorePage);
      }
    })
    .catch(onFetchError);
  
   btnLoadMore.addEventListener('click', onClickLoadMore);

   event.currentTarget.reset();
}
