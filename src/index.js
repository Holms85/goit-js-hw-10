import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    cardCountry: document.querySelector('.country-info'),
}
refs.input.addEventListener('input', inputReader);

// const newName = debounce(fetchCountries, DEBOUNCE_DELAY);
function inputReader(e) {
    const nameValue = e.target.value;
    // console.log(name);
    const country = fetchCountries(nameValue);
    // console.log(country);
    
    
    renderContryCard(country)
    // newName();
};

function renderContryCard() {
    const markup = (country) => {
        return `<h1 class="country"><img src="${flags.png}" alt="flag">${name.official}</h1>
//     <p class="capital">Capital: ${capital}</p>
//     <p class="population">Population: ${population}</p>
//     <p class="languages">Languages: ${languages}</p>`
    }
    refs.cardCountry.innerHTML = markup;
};
