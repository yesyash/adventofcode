import fs from "fs";
import * as readline from "node:readline";

const filePath = "public/Day4.txt";

let completeOverLaps = 0;
let overlaps = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
});

const part1 = (elf1: string[], elf2: string[]) => {
  const overlapping = [
    Math.min(Number(elf1[0]), Number(elf2[0])),
    Math.max(Number(elf1[1]), Number(elf2[1])),
  ].join("-");

  if (overlapping === elf1.join("-") || overlapping === elf2.join("-")) {
    completeOverLaps += 1;
  }
};

const part2 = (elf1: string[], elf2: string[]) => {
  const range = [
    Math.min(Number(elf1[0]), Number(elf2[0])),
    Math.min(Number(elf1[1]), Number(elf2[1])),
  ];

  // Get the elf who has the highest start & end number
  const elfWithMaxNumbers = [
    Math.max(Number(elf1[0]), Number(elf2[0])),
    Math.max(Number(elf1[1]), Number(elf2[1])),
  ];

  // Checking if the first value exists in the range
  if (elfWithMaxNumbers[0] >= range[0] && elfWithMaxNumbers[0] <= range[1]) {
    overlaps += 1;
  }
};

rl.on("line", (line) => {
  const sections = line.split(",");
  const elf1 = sections[0].split("-");
  const elf2 = sections[1].split("-");

  part1(elf1, elf2);
  part2(elf1, elf2);
});

rl.on("close", () => {
  console.log("Overlaps = ", overlaps);
  console.log("Complete Overlaps = ", completeOverLaps);
});
