const baseUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=7ec5f5c3a0f43d729be087960445e1ce&language=en-US&page=1";
const imageUrl = "https://image.tmdb.org/t/p/w1280";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=7ec5f5c3a0f43d729be087960445e1ce&language=en-US&page=1&include_adult=true&query=";
const container = document.querySelector(".main-container");
const searchBar = document.querySelector(".search-bar");

async function getMovieList(url) {
  const movies = await fetch(url);

  const moviesJson = await movies.json();

  loadMovieContent(moviesJson);
}

function loadMovieContent(data) {
  console.log(data);
  let content = "";
  data.results.forEach((el) => {
    content += `
    <div class="content">
          <div class="head">
            <img
              src="${imageUrl + el.poster_path}"
              alt="${el.original_title}"
            />
          </div>
          <div class="content-body">
            <h3>${el.original_title}</h3>
            <p class=${
              el.vote_average <= 5
                ? "red"
                : el.vote_average >= 6 && el.vote_average < 7
                ? "yellow"
                : "green"
            }>${el.vote_average}</p>
          </div>
          <div class="content-description">
            <h4>Description :</h4>
            <p>${el.overview}</p>
          </div>
        </div>
    `;
  });

  container.innerHTML = content;
}

searchBar.addEventListener("change", (e) => {
  if (e.target.value === "") {
    getMovieList(baseUrl);
  } else {
    getMovieList(searchUrl + e.target.value);
  }
});

getMovieList(baseUrl);
