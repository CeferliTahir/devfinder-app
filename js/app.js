//! light dark mode
const bodyS = document.querySelector(".body-s");
const body = document.querySelector("body");
const themeSwitchText = document.querySelector("#theme-switch-text");
const iconMoon = document.querySelector("#moon");
const iconSun = document.querySelector("#sun");
let bodyColorClick = false;

function darkMode() {
  body.classList.add("dark-theme");
  themeSwitchText.textContent = "LIGHT";
  iconMoon.classList.add("hidden");
  iconSun.classList.remove("hidden");
  bodyColorClick = true;
  localStorage.setItem("bodyMode", "dark");
}

function sunMode() {
  body.classList.remove("dark-theme");
  themeSwitchText.textContent = "DARK";
  iconSun.classList.add("hidden");
  iconMoon.classList.remove("hidden");
  bodyColorClick = false;
  localStorage.setItem("bodyMode", "light");
}

bodyS.addEventListener("click", () => bodyColorClick ? sunMode() : darkMode());
document.addEventListener("DOMContentLoaded", () => (localStorage.getItem("bodyMode") === "dark" ? darkMode() : sunMode()));

//! main part
const searchInput = document.querySelector(".search-input");
const btnPrimary = document.querySelector(".btn-primary");
const userSection = document.querySelector(".user-section");
const searchError = document.querySelector("#search-error");
const emptyField = document.querySelector("#empty-field");

function fetchFunctions(inputPlace) {
  const BASE_URL = "https://api.github.com";

  fetch(`${BASE_URL}/users/${inputPlace}`)
    .then((data) => {
      return data.json()
    })
    .then((result) => {
      result.bio = result.bio === null ? "This profile has no bio" : result.bio;
      result.location = result.location === null ? "Not Available" : result.location;
      result.blog = result.blog === "" ? "Not Available" : result.blog;
      userSection.innerHTML = `<img
                src=${result.avatar_url}
                class="user-img"
                id="user-img"
                alt="User profile image"
              />
              <div class="user-main">
                <div class="user-top">
                  <img
                    src=${result.avatar_url}
                    class="user-img"
                    id="user-img-mobile"
                    alt="User profile image"
                  />
                  <h1 class="user-name" id="user-name">${result.name}</h1>
                  <time class="body user-joined" id="user-joined-time"
                    >Joined  ${new Date(result.created_at).toLocaleDateString()}</time
                  >
                  <h3 class="user-username" id="user-username">@${result.login}</h3>
                </div>
                <p class="body user-bio" id="user-bio">${result.bio}</p>
                <ul class="user-stats">
                  <li>
                    <h4 class="user-stat-title">Repos</h4>
                    <h2 class="user-stat-value" id="user-repos">${result.public_repos}</h2>
                  </li>
                  <li>
                    <h4 class="user-stat-title">Followers</h4>
                    <h2 class="user-stat-value" id="user-followers">${result.followers}</h2>
                  </li>
                  <li>
                    <h4 class="user-stat-title">Following</h4>
                    <h2 class="user-stat-value" id="user-following">${result.following}</h2>
                  </li>
                </ul>
                <section class="user-links">
                  <div class="user-link-container" id="user-location">
                    <svg
                      height="20"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                      class="user-link-icon"
                    >
                      <path
                        d="M12.797 3.425C11.584 1.33 9.427.05 7.03.002a7.483 7.483 0 00-.308 0C4.325.05 2.17 1.33.955 3.425a6.963 6.963 0 00-.09 6.88l4.959 9.077.007.012c.218.38.609.606 1.045.606.437 0 .828-.226 1.046-.606l.007-.012 4.96-9.077a6.963 6.963 0 00-.092-6.88zm-5.92 5.638c-1.552 0-2.813-1.262-2.813-2.813s1.261-2.812 2.812-2.812S9.69 4.699 9.69 6.25 8.427 9.063 6.876 9.063z"
                        fill="#4b6a9b"
                      />
                    </svg>
                    <span class="body user-link">${result.location}</span>
                  </div>
                  <div class="user-link-container" id="user-website">
                    <svg
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      class="user-link-icon"
                    >
                      <g fill="#4b6a9b">
                        <path
                          d="M7.404 5.012c-2.355 2.437-1.841 6.482.857 8.273.089.06.207.048.283-.027.568-.555 1.049-1.093 1.47-1.776a.213.213 0 00-.084-.3A2.743 2.743 0 018.878 10.1a2.64 2.64 0 01-.223-1.803c.168-.815 1.043-1.573 1.711-2.274l-.004-.002 2.504-2.555a2.568 2.568 0 013.648-.019 2.6 2.6 0 01.037 3.666l-1.517 1.56a.266.266 0 00-.06.273c.35 1.012.435 2.44.201 3.519-.006.03.031.05.053.028l3.228-3.295c2.062-2.105 2.044-5.531-.04-7.615a5.416 5.416 0 00-7.691.04L7.417 4.998l-.013.014z"
                        />
                        <path
                          d="M13.439 13.75a.401.401 0 00.006-.003c.659-1.204.788-2.586.48-3.933l-.002.002-.001-.001a5.434 5.434 0 00-2.19-3.124.3.3 0 00-.333.015c-.553.448-1.095 1.021-1.452 1.754a.243.243 0 00.096.317c.415.24.79.593 1.04 1.061h.001c.196.33.388.958.263 1.632-.116.894-1.019 1.714-1.736 2.453-.546.559-1.935 1.974-2.49 2.542a2.6 2.6 0 01-3.666.037 2.6 2.6 0 01-.038-3.666l1.521-1.564A.266.266 0 005 11.004c-.338-1.036-.43-2.432-.217-3.51.006-.03-.031-.049-.053-.027l-3.179 3.245c-2.083 2.126-2.066 5.588.04 7.693 2.125 2.083 5.57 2.048 7.653-.078.723-.81 3.821-3.678 4.195-4.577z"
                        />
                      </g>
                    </svg>
                    <a
                      href=""
                      class="body user-link"
                      target="_blank"
                      rel="noreferrer"
                      >${result.blog}</a
                    >
                  </div> `
    })
}

window.onload = () => {
  const inputPlace = "CeferliTahir";
  fetchFunctions(inputPlace);
};

btnPrimary.addEventListener("click", (e) => {
  e.preventDefault();
  let inputPlace = searchInput.value.trim();
  if (inputPlace === "") {
    emptyField.classList.remove("hidden")
  } else {
    emptyField.classList.add("hidden")
    fetchFunctions(inputPlace);
  }
  searchInput.value = "";
})