import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

const buttonFindMovie = document.getElementById('button-find-movie');

async function getInfos() {
    const url = getUrl();
    if(window.screen.width <= 768){
      document.querySelector('.movie-infos').style.display = 'unset';
    }else {
      document.querySelector('.movie-infos').style.display = 'flex';
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        showError()
      }else{
        showImage(data.poster_path)
        showMovie(data)
      }
    }catch (error){
      showError()
    }
}

function showMovie(movie){
  const title = document.querySelector('.movie-title');
  const description = document.querySelector('.movie-description');

  title.innerHTML = movie.title;
  description.innerHTML = movie.overview;
}

function showImage(image){
  const movieImg = document.querySelector('.movie-img');
  movieImg.src = `${IMG_URL}${image}`;
}

function showError(){
  const title = document.querySelector('.movie-title');
  const description = document.querySelector('.movie-description');

  description.innerHTML = ""
  title.innerHTML = `Ops, hoje não é dia de assistir filme. Bora codar! 🚀`;

  const movieImg = document.querySelector('.movie-img');
  movieImg.src = './assets/img-error.svg';
}

function getUrl(){
  const id = Math.floor(1000 * Math.random() + 1);
  const url = `${BASE_URL}${id}?api_key=${API_KEY}&${language}`;
  return url;
}

buttonFindMovie.addEventListener('click', e => {
  getInfos()
  e.preventDefault()
})