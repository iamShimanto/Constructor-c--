import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

// Function to mark a commit with a given random date
const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    git.add([path]).commit(date, { "--date": date }).push("origin", "main"); // Push to main branch
  });
};

// Function to generate a random commit message
function generateRandomMessage() {
  const messages = [
    "Random commit",
    "Updated files",
    "Minor fix",
    "Changes made",
    "Fix bugs",
    "Refactored code",
    "Added new features",
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Async function to make multiple commits
const makeCommits = async (n) => {
  if (n === 0) return git.push("origin", "main"); // Ensure to push to main

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  console.log("Commit date:", date);

  await jsonfile.writeFile(path, data);

  // Commit with random message and custom date
  await git.add([path]).commit(generateRandomMessage(), { "--date": date });

  // Recursively call makeCommits to handle the next commit
  return makeCommits(n - 1);
};

// Ensure you're on the main branch before starting the commits
git
  .checkout("main")
  .then(() => {
    // Execute the function to make 100 commits
    makeCommits(100000)
      .then(() => {
        console.log("All commits completed, pushing changes...");
        git.push("origin", "main"); // Push to main branch after all commits
      })
      .catch((err) => {
        console.error("Error making commits:", err);
      });
  })
  .catch((err) => {
    console.error("Error checking out 'main' branch:", err);
  });
