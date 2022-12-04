import fs from "fs";
import * as readline from "node:readline";

const filePath = "public/Day1-CalorieCounting.txt";
const caloriesList: number[] = [];
let sum = 0;

const printMaxValue = (arr: number[]) => {
  console.log("Max of array: ", Math.max(...arr));
};

const printSumOfTopThreeValues = (arr: number[]) => {
  arr.sort((a, b) => b - a);
  const topThreeValues = arr.slice(0, 3);
  const sum = topThreeValues.reduce((prev, curr) => prev + curr, 0);

  console.log("Sum of top three values: ", sum);
};

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
});

rl.on("line", (line) => {
  const value = Number(line);

  if (value === 0) {
    caloriesList.push(sum);
    sum = 0;
  } else {
    sum += value;
  }
});

rl.on("close", () => {
  // Push the remaining sum to the array once we reach end of file.
  if (sum > 0) {
    caloriesList.push(sum);
    sum = 0;
  }

  printMaxValue(caloriesList);

  const caloriesListCopy: number[] = JSON.parse(JSON.stringify(caloriesList));
  printSumOfTopThreeValues(caloriesListCopy);
});
