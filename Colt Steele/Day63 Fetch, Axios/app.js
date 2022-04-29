const getStarWarPerson = async function () {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/1/`);
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
  }
};

const getDadJoke = async function () {
  try {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    const res = await axios.get(`https://icanhazdadjoke.com/`, config);
    const html = `<br><li>${res.data.joke}</li>`;
    document.querySelector("ol").insertAdjacentHTML("beforeend", html);
  } catch (err) {
    console.log(err.message);
  }
};

getStarWarPerson();
document.querySelector("button").addEventListener("click", getDadJoke);
