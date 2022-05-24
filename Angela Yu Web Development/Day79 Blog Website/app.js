const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const posts = [
  {
    title: "How to use multiple programming languages without losing your mind",
    content: `With all the different programming languages available today, many organizations have become digital polyglots. Open source opens up a world of languages and technology stacks developers can use to accomplish their tasks, including developing and supporting legacy and modern software applications.

  Polyglots can talk with millions more people than those who only speak their native language. In software environments, developers don't introduce new languages to achieve specifc ends, not to communicate better. Some languages are great for one task but not another, so working with multiple programming languages enables developers to use the right tool for the job. In this way, all development is polyglot; it's just the nature of the beast.
  
  The creation of a polyglot environment is often gradual and situational. For example, when an enterprise acquires a company, it takes on the company's technology stacks—including its programming languages. Or as tech leadership changes, new leaders may bring different technologies into the fold. Technologies also fall in and out of fashion, expanding the number of programming languages and technologies an organization has to maintain over time.
  
  A polyglot environment is a double-edged sword for enterprises, bringing benefits but also complexities and challenges. Ultimately, if the situation remains unchecked, polyglot will kill your enterprise.`,
  },
  {
    title: "Why Python devs should use Pipenv",
    content: `To understand the problems that Pipenv solves, it's useful to show how Python package management has evolved.

  Take yourself back to the first Python iteration. We had Python, but there was no clean way to install packages.
  
  Then came Easy Install, a package that installs other Python packages with relative ease. But it came with a catch: it wasn't easy to uninstall packages that were no longer needed.
  
  Enter pip, which most Python users are familiar with. pip lets us install and uninstall packages. We could specify versions, run pip freeze > requirements.txt to output a list of installed packages to a text file, and use that same text file to install everything an app needed with pip install -r requirements.txt.
  
  But pip didn't include a way to isolate packages from each other. We might work on apps that use different versions of the same libraries, so we needed a way to enable that. Along came virtual environments, which enabled us to create small, isolated environments for each app we worked on. We've seen many tools for managing virtual environments: virtualenv, venv, virtualenvwrapper, pyenv, pyenv-virtualenv, pyenv-virtualenvwrapper, and even more. They all play well with pip and requirements.txt files.`,
  },
  {
    title: "Top 4 open source augmented reality SDKs",
    content: `Advancements in augmented reality (AR) technologies have unearthed possibilities that previously were restricted to our imaginations. Today, it's possible to use sophisticated computer-produced vision to augment our physical environment in entirely new and captivating ways.

  The resulting boom has led developers to seek out the best open source AR software development kits (SDKs) to build the next big AR-powered applications and games. This includes people like Swizec, who has spent the past 10 years working in AR and developing apps like the projects shown on LiveEdu.tv.
  
  If you're interested in joining Swizec and the other developers creating innovative AR projects, take a look at this list of the top four free and open source AR software SDKs you can use for powering your applications.
  
  Google's ARCore
  Google launched ARCore in early 2018. ARCore is Google's open source (Apache 2.0 license) augmented reality SDK for bringing compelling AR experiences to Android devices (version 7.0 and above).
  
  ARCore allows you to build apps that use existing phone features to sense the real world and interact with the information for creating exciting AR scenes.
  
  Google's platform comes with various APIs, and some are available on both Android and iOS devices to support shared augmented reality experiences.
  
  To seamlessly blend the digital and the physical worlds, ARCore employs three main capabilities: motion tracking, environmental understanding, and light estimation.
  
  AR.js
  AR.js is an effective JavaScript-powered open source (MIT license) augmented reality SDK for the web. This solution (which developer Swizec uses) enables you to bring AR experiences to your web browser without having to download and install an app.
  
  AR.js runs very fast. In fact, it can reach 60fps (frames per second) on a two-year-old smartphone. Furthermore, you can use it on any mobile platform—including Windows Mobile, Android, and iOS 11 devices.
  
  If you want an open source AR software that runs 100% on the web browser, then AR.js may suit your needs.`,
  },
];

const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//  Handle route for home page
app.get("/", (req, res) => {
  res.render("home.ejs", {
    title: "Home",
    posts,
  });
});

//  Handle route for contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    startingContent: contactContent,
    title: "Contact",
  });
});

//  Handle route for about page
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    startingContent: aboutContent,
    title: "About",
  });
});

//  Handle route for compose page
app.get("/compose", (req, res) => {
  res.render("compose.ejs", { title: "Compose" });
});

// Post the data into the db and redirect to home page
app.post("/", (req, res) => {
  const { postTitle, postBody } = req.body;
  const post = {
    title: postTitle,
    content: postBody,
  }; // Express routing params
  posts.push(post); // Push the new data to db
  res.redirect("/");
});

//  Handle route for post page
app.get("/posts/:postTitle", (req, res) => {
  const { postTitle } = req.params;
  const resPost = posts.find((post) => post.title === postTitle); // Find post with search title
  res.render("post.ejs", {
    title: !resPost ? "Post Not Found" : resPost.title,
    resPost,
  });
});

//  Server listen to port 3000
app.listen("3000", console.log("Server listening to port 3000"));
