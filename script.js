const formEl = document.getElementById("form");
const inputEl = document.getElementById("form-input");
const mainContentEl = document.getElementById("mc-content");
const watchlistEl = document.getElementById("mc-watchlist");
const mcText = document.querySelector(".mc-img-text");
const mcImg = document.querySelector(".mc-img");
async function getData(e) {
  e.preventDefault();
  const res = await fetch(
    `http://www.omdbapi.com/?s=${inputEl.value}&apikey=3c7eed5e`
  );
  const data = await res.json();

  if (data.Response) {
    displayMovies(data.Search);
  }
}

function displayMovies(movies) {
  let html = "";
  if (movies) {
    mainContentEl.innerHTML = "";

    movies.forEach(async (movie) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=3c7eed5e`
      );
      const data = await res.json();

      console.log(data);

      html += `
    <div class="card-container">
    <div class="card">
      <img src="${movie.Poster}" height="200px" width="125px"/>
      <div class="card-info">
        <h2 class="card-title">
          ${movie.Title}
          <img src="images/star.png" height="20px" class="star" />
          <span>${data.Ratings[0].Value}</span>
        </h2>
        <div class="movie-info">
          <span id="time">${data.Runtime}</span>
          <span id="genre">${data.Genre}</span>
          <button class="card-btn">+</button
          ><span class="btn-span">Watchlist</span>
        </div>
        <h3 class="description">
        ${data.Plot}
        </h3>
      </div>
    </div>
    <hr />

    </div>


      `;
      mainContentEl.innerHTML = html;
      addItem();
    });
  } else {
    mcText.classList.remove("hidden");
    mcImg.classList.add("hidden");
  }
}

if (formEl) {
  formEl.addEventListener("submit", getData);
}

function addItem() {
  let arr = [];

  document.querySelectorAll(".card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      arr.push(btn.closest(".card-container").outerHTML);

      localStorage.setItem("value", arr);
    });
  });
}

if (watchlistEl) {
  watchlistEl.innerHTML = localStorage.getItem("value");
}
