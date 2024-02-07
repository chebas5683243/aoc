import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

interface Hand {
  hand: number[];
  type: number;
  bid: number,
}

const hands: Hand[] = []

async function processLineByLine() {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const contents = [];

  for await (const line of rl) {
    contents.push(line);
    const [handStr, bid] = line.split(" ");
    getTypeFromHand(handStr, Number(bid));
  }

  return contents;
}

function getNumberFromChar(char: string) {
  if (!Number.isNaN(Number(char))) return Number(char);

  if (char === "T") return 10;
  if (char === "J") return 11;
  if (char === "Q") return 12;
  if (char === "K") return 13;
  return 14;
}

function getTypeFromHand(handStr: string, bid: number) {
  const hand = [];
  const repetitions: Record<number, number> = {}

  for (let i = 0; i < handStr.length; i++) {
    const number = getNumberFromChar(handStr[i]);
    hand.push(number);
    if (repetitions[number] === undefined) repetitions[number] = 1;
    else repetitions[number] += 1
  }

  const type = Object.values(repetitions).reduce((acc, reps) => {
    if (reps === 1) return acc
    return acc + 10 ** (reps - 1)
  }, 0)

  hands.push({ hand, bid, type })
}

function compareArrays(arr1: number[], arr2: number[]) {
  for (let i = 0; i < arr1.length; i++) {
    const diff = arr1[i] - arr2[i]
    if (diff !== 0) return diff;
  }

  return 0;
}

function getTotalWinnings() {
  hands.sort((a, b) => {
    const diff = a.type - b.type;
    if (diff === 0) {
      return compareArrays(a.hand, b.hand)
    }

    return diff;
  })

  const totalWinnings = hands.reduce((acc, curr, index) => {
    return acc + curr.bid * (index + 1)
  }, 0)

  console.log({ totalWinnings })
}

async function main() {
  await processLineByLine();
  getTotalWinnings();
}

main();