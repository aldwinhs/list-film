const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie");
    movieE1.innerHTML = `
        <img
            src="${IMG_URL + poster_path}"
            alt="${title}"
          />

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        
        <button class="view" id="${id}">View</button>

        `;

    main.appendChild(movieE1);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(movie);
    });
  });
}

/* Open when someone clicks on the span element */
function openNav(movie) {
  let title = movie.title;
  let overview = movie.overview;
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("overlay-content").innerHTML = `
        <h2>${title}</h2>
        <p>${overview}</p>
    `;
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchKey = search.value;

  if (searchKey) {
    getMovies(searchURL + "&query=" + searchKey);
  } else {
    getMovies(API_URL);
  }
});
