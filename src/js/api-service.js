import axios from 'axios';

export class ApiService {
  constructor() {
    (this.query = ''),
      (this.page = 1),
      (this.numberPageLimit = 40),
      (this.BASE_URL = `https://pixabay.com/api/`),
      (this.KEY_PIXABAY = `15400175-8ce22b8808542891276b8dfa1`);
  }

  searchUrlParams() {
    return new URLSearchParams({
      key: this.KEY_PIXABAY,
      q: this.query,
      page: this.page,
      per_page: this.numberPageLimit,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
  }
  totalLoadedItems() {
    return this.numberPageLimit * (this.page - 1);
  }

  async fetchImages() {
    try {
      const { data } = await axios.get(
        `${this.BASE_URL}?${this.searchUrlParams()}`
      );
      this.incrementPage();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get searchQuery() {
    return this.query;
  }
  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}
