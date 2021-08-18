

const button = document.getElementById("click-me")
button.addEventListener("click", (event) => {
  console.log(event);
  // callback
  console.log(event.currentTarget);
  event.currentTarget.innerText = "Hold Still!";
  event.currentTarget.setAttribute("disabled", "");
})

const results = document.querySelector("#results");
// const url = "http://www.omdbapi.com/?s=harry potter&apikey=adf1f2d7"
// fetch(url).then((response) => {
//   response.json()
//   .then((data) => {
//     //response
//     console.log(data);
//     //array
//     console.log(data.Search);
//     data.Search.forEach((result) => {
//       //define a movie tag
//       const movieTag = `<li class="list-inline-item">
//       <img src="${result.Poster}" alt="">
//       <p>${result.Title}</p>
//       </li>`;
//       // add it to the end of the ul
//       results.insertAdjacentHTML("beforeend", movieTag)
//     })
//   })
//   // Do something once HTTP response is received

// });

const searchMovies = (query) => {
  fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`).then((response) => {
    response.json()
      .then((data) => {
        //response
        console.log(data);
        //array
        console.log(data.Search);
        data.Search.forEach((result) => {
          //define a movie tag
          const movieTag = `<li class="list-inline-item">
      <img src="${result.Poster}" alt="">
      <p>${result.Title}</p>
      </li>`;
          // add it to the end of the ul
          results.insertAdjacentHTML("beforeend", movieTag)
        })
      })
    // Do something once HTTP response is received

  });
}


const form = document.querySelector('#search-movies');

form.addEventListener("submit", (event) => {
  /// prevents form from doing a new HTTP request
  event.preventDefault();
  const input = document.querySelector("#query");
  results.innerHTML = '';
  searchMovies(input.value);
})

const searchAlgoliaPlaces = (event) => {

  fetch("https://places-dsn.algolia.net/1/places/query", {
    method: "POST",
    body: JSON.stringify({query: event})
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data.hits);
  })
}

const algoliaForm = document.querySelector("#algolia-form")

algoliaForm.addEventListener("submit", (event) => {
  /// prevents form from doing a new HTTP request
  //console.log(event);
  event.preventDefault();
  const algoliaInput = event.currentTarget.querySelector(".form-control");
  results.innerHTML = '';
  // console.log(algoliaInput);
  // console.log(algoliaInput.value);
  searchAlgoliaPlaces(algoliaInput.value);
})



