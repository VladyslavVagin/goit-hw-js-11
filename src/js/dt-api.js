// IMPORTS SOME LIBRARIES FOR USE HERE
import axios from "axios";
import { Notify } from 'notiflix';

// MAKE DEFAULT CLASS 
export default class GetPicturesFromApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  // FUNCTION FOR CREATION API REQUESTS 
   getPictures() {
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
    })
    // IF BAD REQUEST MAKE ERROR !!! AND INCREASE PAGE FOR 1 EVERY CALL API
    .then(response => {
      this.page += 1;
      if( response.data.totalHits === 0) {
        throw new Error(Notify.failure("Sorry, there are no images matching your search query. Please try again."));
      }
      return response.data;
    });
  }


  // SOME USEFUL FUNCTIONS 
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