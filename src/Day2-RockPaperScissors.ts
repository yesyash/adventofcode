import fs from "fs";
import * as readline from "node:readline";

const filePath = "public/Day2-RockPaperScissors.txt";

const LOSS_POINTS = 0;
const DRAW_POINTS = 3;
const WIN_POINTS = 6;

const move: Map<string, { win: string; movePoint: number; loss: string }> =
  new Map();
move.set("A", { win: "C", movePoint: 1, loss: "B" });
move.set("B", { win: "A", movePoint: 2, loss: "C" });
move.set("C", { win: "B", movePoint: 3, loss: "A" });

let totalScore = 0;

const part1 = (values: string[]) => {
  totalScore += move.get(values[1])!.movePoint;

  if (values[0] === values[1]) {
    totalScore += DRAW_POINTS; //draw
  } else if (move.get(values[1])?.win === values[0]) {
    totalScore += WIN_POINTS; // win
  }

  totalScore += LOSS_POINTS; // loss
};

const part2 = (values: string[]) => {
  // we calculate total score in this function using
  // totalScore = chosenValue + roundResult

  // need to loose
  if (values[1] === "A") {
    const lossMove = move.get(values[0])!.win; // my loss move would be when the elf wins
    totalScore += move.get(lossMove)!.movePoint + LOSS_POINTS;
  } else if (values[1] === "B") {
    // need to draw here
    const drawMove = values[0]; // to draw need to pick the same as what the elf chose
    totalScore += move.get(drawMove)!.movePoint + DRAW_POINTS;
  } else {
    // need to win here
    const winMove = move.get(values[0])!.loss; // my win move would be where the elf looses
    totalScore += move.get(winMove)!.movePoint + WIN_POINTS;
  }
};

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
});

rl.on("line", (line) => {
  line = line.replaceAll("X", "A");
  line = line.replaceAll("Y", "B");
  line = line.replaceAll("Z", "C");

  const values = line.split(" ");

  part2(values);
});

rl.on("close", () => {
  console.log("total Score: ", totalScore);
});
