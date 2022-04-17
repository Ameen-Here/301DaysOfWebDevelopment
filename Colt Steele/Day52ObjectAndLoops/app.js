let maximum = parseInt(prompt("Enter the maximum number:"));
while (!maximum) {
  maximum = parseInt(prompt("Enter the maximum number:"));
}

const target = Math.trunc(Math.random() * maximum) + 1;

let guess = prompt("Enter your first guess:");
let attempts = 1;

while (parseInt(guess) !== target) {
  attempts++;
  if (guess === "q") {
    attempts = 0;
    console.log("You quit");
    break;
  }
  if (guess < target) {
    guess = prompt("Too low, Enter your guess:");
  } else {
    guess = prompt("Too high, Enter your guess:");
  }
}

if (attempts === 0) {
  console.log(`You failed, the correct answer is ${target}`);
} else {
  console.log(`You got the correct answer ${target} in ${attempts} attempts.`);
}

const arr1 = ["hello", "world"];
for (let word of arr1) {
  console.log(word);
}

const scores = {
  john: 123,
  kate: 235,
};

Object.entries(scores).forEach(([key, value]) => {
  console.log(`key is ${key} : Value is ${value}`);
});

for (const [key, value] of Object.entries(scores)) {
  console.log(`key is ${key} : Value is ${value}`);
}

//////////////////////////////////////////////////////////////////////
// TODO LIST PROMPT APP

let command = " ";
const todo = [];

const showList = function () {
  console.log("************");
  todo.forEach((value, key) => {
    console.log(`${key + 1} : ${value}`);
  });
  console.log("************");
};

while (command !== "quit" && command !== "q") {
  command = prompt("What would you like to do?");

  // To add new todo list to array
  if (command === "new") {
    let action = prompt("what would you like to add to the todo list?");
    todo.push(action);
    console.log(`${action} added to the list`);
  }

  // TO show the list
  else if (command === "list") {
    showList();
  }

  // To delete certain element in the list
  else if (command === "delete") {
    // To print the list
    showList();

    let deleteNum = parseInt(
      prompt("Which todo item you want to delete:(The Number)?")
    );

    // Checking if the user enter a valid number
    while (!deleteNum && todo.length < deleteNum && deleteNum < 0) {
      deleteNum = prompt("Which todo item you want to delete:(The Number)?");
    }

    // Deleting the element in the array using splice
    todo.splice(deleteNum - 1, 1);
    // for (let i = 0; i < todo.length; i++) {
    //   console.log(`${i + 1} : ${todo[i]}`);
    // }

    console.log(`The activity number ${deleteNum} is deleted`);

    showList();
  }
}
console.log("Ok You Quit The App.");
