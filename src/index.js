import 'animate.css';
import { btnLoadMore, formEl, galleryEl, spinnerEl } from './js/refs';
import { ApiService } from './js/api-service';
import { markupImages } from './js/template/markupImages';
import {
  clearDomELements,
  renderElementsMarkup,
  hideELements,
  nitiflix,
  scrollSmoth,
} from './js/utils';
import { lightbox } from './js/modal';
const apiService = new ApiService();

function searchImagesSubmit(e) {
  e.preventDefault();
  const queryValue = e.target.searchQuery.value.trim();
  if (!queryValue) return;

  hideELements(btnLoadMore, true);
  apiService.searchQuery = queryValue;
  apiService.resetPage();

  fetchImagesFunc();
  clearDomELements(galleryEl);
  e.target.reset();
}

async function fetchImagesFunc() {
  hideELements(btnLoadMore, false);
  hideELements(spinnerEl, false);

  try {
    const result = await apiService.fetchImages();
    onResolve(result);
  } catch (error) {
    onReject(error);
  }
}

function onResolve(resp) {
  const { totalHits, hits } = resp;
  hideELements(spinnerEl, true);

  if (apiService.page === 2 && totalHits > 0) {
    nitiflix('success', `Hooray! We found ${totalHits} images.`);

    if (totalHits <= apiService.totalLoadedItems()) {
      hideELements(btnLoadMore, true);
    }
  }
  if (totalHits === 0) {
    nitiflix(
      'failure',
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hideELements(btnLoadMore, true);
  }
  if (
    apiService.page !== 2 &&
    apiService.totalLoadedItems() >= totalHits &&
    totalHits !== 0
  ) {
    nitiflix(
      'warning',
      "We're sorry, but you've reached the end of search results."
    );
    hideELements(btnLoadMore, true);
  }

  if (totalHits > 0) {
    renderElementsMarkup(galleryEl, markupImages, hits);
    scrollSmoth('.gallery');
    lightbox.refresh();
  }
}

function onReject(err) {
  nitiflix('failure', err.message);
}

btnLoadMore.addEventListener('click', fetchImagesFunc);
formEl.addEventListener('submit', searchImagesSubmit);
