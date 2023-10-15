import axios from "axios";
import { Notify } from "notiflix";

export default class GetPicturesFromApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getPictures() {
    console.log(this);
    return axios({
      url: 'https://pixabay.com/api/',
      params: {
        key: '40026109-900194399c80021c84c1deb9d',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
      }
    }).then(response => {
      this.page += 1;
      if( response.data.totalHits === 0) {
        throw new Error();
      }
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
      return response.data.hits;
    });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return this.searchQuery = newQuery;
  }
};