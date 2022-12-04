import fs from "fs";
import * as readline from "node:readline";

const filePath = "public/Day3-Rucksack.txt";

const priorityValue: Map<string, number> = new Map();
let SumOfPriorities = 0;

const setPriorityValues = () => {
  let count = 1;
  let i: number;

  // for characters from a-z
  i = 97;
  while (i <= 122) {
    priorityValue.set(String.fromCharCode(i), count);
    count++;
    i++;
  }

  // for characters from A-Z
  i = 65;
  while (i <= 90) {
    priorityValue.set(String.fromCharCode(i), count);
    count++;
    i++;
  }
};

const splitString = (str: string): string[] => {
  const mid = Math.floor(str.length / 2);

  return [str.slice(0, mid), str.slice(mid)];
};

const findFirstRepeatingChar = (arr: string[]): string => {
  let res = [...arr[0]];

  for (let i = 1; i < arr.length; i++) {
    res = res.filter((char) => {
      const oldStrLength = arr[i].length;

      arr[i] = arr[i].replace(char, "");
      return oldStrLength > arr[i].length;
    });
  }
  return res[0];
};

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
});

setPriorityValues();
let tempArr: string[] = [];
let linesCount = 0;

const part1 = (line: string) => {
  const values = splitString(line);

  const repeatingChar = findFirstRepeatingChar(values);
  if (repeatingChar) {
    const repeatingCharPriority = priorityValue.get(repeatingChar);

    if (repeatingCharPriority) {
      SumOfPriorities += repeatingCharPriority;
    }
  }
};

const part2 = (line: string) => {
  if (linesCount === 2) {
    tempArr.push(line);
    const repeatingChar = findFirstRepeatingChar(tempArr);

    if (repeatingChar) {
      const repeatingCharPriority = priorityValue.get(repeatingChar);

      if (repeatingCharPriority) {
        SumOfPriorities += repeatingCharPriority;
      }
    }

    linesCount = 0;
    tempArr = [];
  } else {
    tempArr.push(line);
    linesCount++;
  }
};

rl.on("line", (line) => {
  // part1(line);
  part2(line);
});

rl.on("close", () => {
  console.log(SumOfPriorities);
});
