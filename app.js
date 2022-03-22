let timer;
let deleteFirstPhotoDeleay;

// Fetching data from API
async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list");
  }
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
  let URL = `https://dog.ceo/api/breed/${breed}/images`;

  if (breed != "Choose a Dog breed") {
    const response = await fetch(URL);
    const data = await response.json();

    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDeleay);

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div  class="slide" style=" background-image: url('${images[0]}')"></div>
  <div  class="slide" style=" background-image: url('${images[1]}')"></div>
  `;

    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div  class="slide" style=" background-image: url('${images[0]}')"></div>
  <div  class="slide"></div>
  `;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div  class="slide" style=" background-image: url('${images[currentPosition]}')"></div>`
      );
    deleteFirstPhotoDeleay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
