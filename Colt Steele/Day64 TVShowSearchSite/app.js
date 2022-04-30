const inputField = document.querySelector("input");
const form1 = document.querySelector("#searchForm");
const container = document.querySelector(".container");


const showResult = function (results) {
  for (let result of results.data) {

    if (result.show.image) {
      let rating = "";
      if (!result.show.rating.average) {
        rating = "Not available.";
      } else {
        rating = result.show.rating.average;
      }
      const html = ` 
        <div class="insideContainer">
            <img src=${result.show.image.medium} alt="Tv show image">
            <h2>${result.show.name}</h2>
            <h3>${result.show.language}</h3>
            <p>Rating: ${rating}</p>
            <p>${result.show.summary}</p>
        </div>
    `;
      container.insertAdjacentHTML("beforeend", html);
    }
  }
};


form1.addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = inputField.value;
  const config = {
    params: { q: input },
  };
  const res = await axios.get(` https://api.tvmaze.com/search/shows`, config);
  showResult(res);

  inputField.value = "";
});
