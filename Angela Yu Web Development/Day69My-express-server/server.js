const express = require("express");

const app = express();

const htmlContact = `<h1>Hello World</h1>
<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, voluptatibus
  reprehenderit? Amet delectus magnam incidunt ex. Quod, esse amet maxime,
  dolores dolorem similique sapiente quos illo maiores, architecto sit tempora!
</p>
<button>Click Me</button>
`;

const htmlAbout = `
<h1 style="font-family: cursive">Ameen Noushad</h1>
<h2>I'm a self taught developr
</h2>
<p>
    konows how to code in:
    <ol>
        <li>JavaScript</li>
        <li>Java</li>
        <li>Python</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>Python</li>
    </ol>
</p>
<h3> Feel free to contact </h3>
`;

app.get("/", function (req, res) {
  console.log(req);
  res.send(htmlContact);
});

app.get("/contact", function (req, res) {
  res.send("Contact me at : My house");
});

app.get("/about", function (req, res) {
  res.send(htmlAbout);
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
