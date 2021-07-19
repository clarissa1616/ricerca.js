const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function formatNumber(x) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function findMatches(wordToMatch, cities) {
  return cities.filter((city) => {
    const regex = new RegExp(wordToMatch, "gi");
    return city.city.match(regex) || city.state.match(regex);
  });
}

function displayMatches(event) {
  const matchArray = findMatches(event.target.value, cities);
  const html = matchArray
    .map((city) => {
      const regex = new RegExp(event.target.value, "gi");
      const cityName = city.city.replace(
        regex,
        `<span class="hl">${event.target.value}</span>`
      );
      const stateName = city.state.replace(
        regex,
        `<span class="hl">${event.target.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${formatNumber(city.population)}</span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
