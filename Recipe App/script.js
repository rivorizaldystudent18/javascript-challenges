const mainMealsImg = document.getElementById("main-meals-img");
const mealsName = document.querySelector(".meals-name");
const likeButton = document.querySelector(".like-button");
const likeIcon = document.querySelector(".like-button i");
const ul = document.querySelector("#meals-list");

loadRandomRecipe();
getFavoriteList();

const li = document.querySelectorAll(".meals-item");

if (li) {
  li.forEach((el) => {
    el.addEventListener("mouseover", () => {
      const icon = el.querySelector(".item-delete");
      icon.classList.add("active");
      icon.addEventListener("click", () => {
        deleteFavorite(icon.getAttribute("data-meal"));
      });
    });

    el.addEventListener("mouseleave", () => {
      const icon = el.querySelector(".item-delete");
      icon.classList.remove("active");
    });
  });
}

function deleteFavorite(mealsName) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  const filteredFavorites = favorites.filter(
    (el) => el.mealsName !== mealsName
  );
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));

  modifyFavoriteSection(filteredFavorites);
}

function loadRandomRecipe() {
  return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      appendDataToMainMeals(data);
    });
}

function getFavoriteList() {
  if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", JSON.stringify([]));
  } else {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    let li = "";
    favorites.forEach((element) => {
      li += `<li class="meals-item">
    <img
      src="${element.mealsImg}"
      alt=""
    /><span>${formatString(element.mealsName)}</span>
    <i class="fas fa-times-circle item-delete" data-meal="${
      element.mealsName
    }"></i>
  </li>`;
    });

    ul.innerHTML = li;
  }
}

function appendDataToMainMeals(data) {
  mainMealsImg.src = data.meals[0].strMealThumb;
  mealsName.innerHTML = data.meals[0].strMeal;
  likeButton.setAttribute("data-meals-name", data.meals[0].strMeal);
  likeButton.setAttribute("data-meals-img", data.meals[0].strMealThumb);
}

likeButton.addEventListener("click", toggleLikeButton);

function toggleLikeButton(e) {
  likeIcon.classList.toggle("active");
  if (likeIcon.classList.contains("active")) {
    addToFavorite();
  } else {
    removeFromFavorite();
  }
}

function addToFavorite() {
  const favorite = {
    mealsName: likeButton.getAttribute("data-meals-name"),
    mealsImg: likeButton.getAttribute("data-meals-img"),
  };
  localStorage.setItem("meal", JSON.stringify(favorite));
  addToFavoriteSection(favorite);
}

function removeFromFavorite() {
  removeFromFavoriteSection(likeButton.getAttribute("data-meals-name"));
  localStorage.removeItem("meal");
}

function addToFavoriteSection(meals) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  favorites.push(meals);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  modifyFavoriteSection(favorites);
}

function removeFromFavoriteSection(mealsName) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  const filteredFavorites = favorites.filter(
    (el) => el.mealsName !== mealsName
  );
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));

  modifyFavoriteSection(filteredFavorites);
}

function modifyFavoriteSection(favorites) {
  let li = "";
  favorites.forEach((element) => {
    li += `<li>
    <img
      src="${element.mealsImg}"
      alt=""
    /><span>${formatString(element.mealsName)}</span>
  </li>`;
  });

  ul.innerHTML = li;
}

function formatString(string) {
  return string.split(" ").join(" ").length <= 25
    ? string
    : string.split(" ").join(" ").substr(0, 25) + "...";
}

// container.style.visibility = "hidden";
