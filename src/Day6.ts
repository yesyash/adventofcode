import fs from "fs";
import * as readline from "node:readline";

const filePath = "public/Day6.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
});

const findUniqueSequence = (line: string, sequenceLength: number) => {
  let left = 0,
    right = sequenceLength - 1;

  while (right < line.length) {
    const elements: Map<string, number> = new Map();

    for (let i = left; i <= right; i++) {
      const elementInMap = elements.get(line[i]);

      if (elementInMap) {
        break;
      }

      if (i === right) {
        console.log(`sequence found. num of chars processed = ${right + 1}`);
        return;
      }

      elements.set(line[i], 1);
    }

    left += 1;
    right += 1;
  }
};

const part1 = (line: string) => {
  findUniqueSequence(line, 4);
};

const part2 = (line: string) => {
  findUniqueSequence(line, 14);
};

rl.on("line", (line) => {
  part1(line);
});

rl.on("close", () => {});
