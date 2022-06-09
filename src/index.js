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
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
        if (response.length === 1) {
          renderContryCard({ response });
      }
    })
    .catch(error => console.log(error));
//   clearSearchCountry();
    // console.log(name);
    // const countryAll = fetchCountries(name);
    // renderContryCard(countryAll);
           
};
function renderContryCard(country) {
    const {name,capital,population,flags,languages} = country
    const markup = ({ name, capital, population, flags, languages }) => {
        return `<h1 class="country"><img src="${flags.png}" alt="flag">${name.official}</h1>
    <p class="capital">Capital: ${capital}</p>
    <p class="population">Population: ${population}</p>
    <p class="languages">Languages: ${languages}</p>`
    };
    refs.cardCountry.innerHTML = markup;
};
