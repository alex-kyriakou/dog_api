async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();

  breedList(data.message);
}

start();

function breedList(breeds) {
  Object.keys(breeds).map(function (breed) {});
}
