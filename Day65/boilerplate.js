const projectName = process.argv[2] || "project";
const fileName = process.argv.slice(3) || [];

console.log(fileName);

const fs = require("fs");

fs.mkdirSync(projectName);

for (let file of fileName) {
  console.log(`${projectName}/${file}`);
  fs.writeFile(`${projectName}/${file}`, "", function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
