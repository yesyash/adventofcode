import fs from "fs";
import * as readline from "node:readline";

const filePath = "public/Day5.txt";

const stack: Map<number, string[]> = new Map();
let numSpaces = 0;
let crateIndex = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
});

const generateCratesData = (lineData: string[]) => {
  for (const value of lineData) {
    if (value === "") {
      numSpaces++;
    } else {
      if (value[0] !== "[") return;

      crateIndex = crateIndex + Math.floor(numSpaces / 4) + 1;
      const crate = stack.get(crateIndex);

      if (crate) {
        crate.unshift(value);
      } else {
        stack.set(crateIndex, [value]);
      }

      numSpaces = 0;
    }
  }

  numSpaces = 0;
  crateIndex = 0;
};

const transferCrates = (
  stackNumber: number,
  transferStack: string[] | undefined,
  crates: string[]
) => {
  if (transferStack) {
    transferStack.push(...crates);
  } else {
    stack.set(stackNumber, [...crates]);
  }
};

const part1 = (pickupStack: string[]) => {
  const crate = pickupStack.pop();
  if (crate) {
    return [crate];
  }

  return [];
};

const part2 = (pickupStack: string[], numCrates: number) => {
  const stackLength = pickupStack.length;

  return pickupStack.splice(stackLength - numCrates, stackLength);
};

rl.on("line", (line) => {
  const lineData = line.split(" ");

  if (lineData[0] === "move") {
    const numCrates = parseInt(lineData[1]);
    const fromStack = parseInt(lineData[3]);
    const toStack = parseInt(lineData[5]);

    const pickupStack = stack.get(fromStack);
    const dropStack = stack.get(toStack);

    if (pickupStack) {
      const cratesToMove = part1(lineData);
      // const cratesToMove = part2(pickupStack, numCrates);

      transferCrates(toStack, dropStack, cratesToMove);
    }
  } else {
    generateCratesData(lineData);
  }
});

rl.on("close", () => {
  const finalAnswer = [];

  for (const [key, value] of new Map([...stack].sort())) {
    const topCrateOfStack = value[value.length - 1];
    finalAnswer.push(topCrateOfStack.split("")[1]);
  }

  console.log("final: \n", stack, "\n");

  console.log(finalAnswer.join(""));
});
