import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    cardCountry: document.querySelector('.country-info'),
}
refs.input.addEventListener('input', debounce(inputReader, DEBOUNCE_DELAY));
function inputReader(e) {
    const name = e.target.value.trim();
    if (name === "") {
    return;
  }
  fetchCountries(name)
    .then(response => {
      // console.log(response.length);
      renderContryCard(response)
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (response.length === 1) {
        let markup;
        markup = response.map(el => {
            renderContryCard(response);
          })
          // renderContryCard({ response });
          refs.listCountry.innerHTML = markup
        }
         if (response.length >= 2 && response.length <= 10) {
        renderSearchCountry(response);
      }
    })
    .catch(error => console.log(error));
  refs.cardCountry.innerHTML = '';
};
function renderContryCard({ name, capital, population, flags, languages }) {
    // const {name,capital,population,flags,languages} = country
  const markup = `<h1 class="country"><img src="${flags.svg}" alt="flag">${name.official}</h1>
    <p class="capital">Capital: ${capital}</p>
    <p class="population">Population: ${population}</p>
    <p class="languages">Languages: ${language}</p>`
      const language = Object.values(languages)
    refs.cardCountry.innerHTML = markup;
};

function renderSearchCountry({ flags, name }) {
  const markupList = 
  `<li>
      <img src="${flags.png}" alt="flag">
      <p>${name.official}</p>
    </li>`
  return markupList;
  // refs.listCountry.innerHTML = markupList
}
