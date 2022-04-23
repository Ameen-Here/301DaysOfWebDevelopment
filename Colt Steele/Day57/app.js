const imgBanner = document.getElementById("banner");
imgBanner.addEventListener("click", () => console.log("clicked"));

const links = document.querySelectorAll("p a");

for (let link of links) {
  console.log(link.href);
}

const h1 = document.querySelector("h1 span");
h1.style.color = "red";
