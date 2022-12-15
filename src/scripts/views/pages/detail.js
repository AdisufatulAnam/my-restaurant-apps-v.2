import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import {
  createMovieDetailTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="movie" class="movie"></div>
        <div class="movie-menu">
          <h3>Foods Menu</h3>
          <p id="food"></p>
        </div>
        <div class="movie-menu">
          <h3>Drinks Menu</h3>
          <p id="drink"></p>
        </div>
        <div class="movie-reviews">
          <h3>Reviews</h3>
          <hp id="review"></hp>
        </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await TheMovieDbSource.detailMovie(url.id);
    const movieContainer = document.querySelector('#movie');
    movieContainer.innerHTML = createMovieDetailTemplate(movie.restaurant);
    const foodContainer = document.querySelector('#food');
    Object.keys(movie.restaurant.menus.foods).forEach((index) => {
      foodContainer.innerHTML += `<li>${movie.restaurant.menus.foods[index].name}</li>`;
    });

    const drinkContainer = document.querySelector('#drink');
    Object.keys(movie.restaurant.menus.drinks).forEach((index) => {
      drinkContainer.innerHTML += `<li>${movie.restaurant.menus.drinks[index].name}</li>`;
    });

    const reviewContainer = document.querySelector('#review');
    Object.keys(movie.restaurant.customerReviews).forEach((index) => {
      reviewContainer.innerHTML += `
      <li><b>${movie.restaurant.customerReviews[index].name}</b></li>
      <p>${movie.restaurant.customerReviews[index].review}</p>
      <small>${movie.restaurant.customerReviews[index].date}</small>`;
    });

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movie.restaurant.id,
        name: movie.restaurant.name,
        description: movie.restaurant.description,
        pictureId: movie.restaurant.pictureId,
        rating: movie.restaurant.rating,
      },
    });
  },
};

export default Detail;
