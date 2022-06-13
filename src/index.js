import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  cardCountry: document.querySelector('.country-info'),
};
refs.input.addEventListener('input', debounce(inputReader, DEBOUNCE_DELAY));
function inputReader(e) {
  const name = e.target.value.trim();
if (name === "") {
        return;
}
  
  fetchCountries(name)
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (response.length === 1) {
        let markup;
        markup = response.map(el => {
          renderContryCard(response);
        });
      }
      if (response.length >= 2 && response.length <= 10) {
        renderSearchCountry(response);
      }
    })
    .catch(error => console.log(error));
  clearList();
}
function clearList() {
  refs.cardCountry.innerHTML = '';
  refs.listCountry.innerHTML = '';
}
function renderContryCard(response) {
  const markupCountryCard = response
    .map(
      el =>
        `<h1 class="country"><img class="img-country" src="${el.flags.svg}" alt="flag" width=50>${
          el.name.official
        }</h1>
    <p class="capital"><b>Capital:</b> ${el.capital}</p>
    <p class="population"><b>Population:</b> ${el.population}</p>
    <p class="languages"><b>Languages:</b> ${Object.values(el.languages)}</p>`
    )
    .join("");

  refs.cardCountry.innerHTML = markupCountryCard;
}

function renderSearchCountry(response) {
  const markUpList = response
    .map(
      el =>
        `<li class="item">
      <img src="${el.flags.svg}" alt="flag" width=30>
      <p class="country-name">${el.name.official}</p>
    </li>`
    )
    .join("");
  refs.listCountry.innerHTML = markUpList;
}
