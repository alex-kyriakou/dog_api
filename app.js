// Fetching data from API
async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();

  createBreedList(data.message);
}

start();

// Create the Select list with all breeds through the data of API
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
    <option>Choose a Dog breed</option>
    ${Object.keys(breedList)
      .map(function (breed) {
        return `<option>${breed}</option>`;
      })
      .join("")}
  </select>
  `;
}

// Looad by Breed
async function loadByBreed(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();

  console.log(data);
}
