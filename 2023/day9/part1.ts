import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";
const contents: string[] = [];

async function processLineByLine() {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    contents.push(line);
  }
}

function getNextValue(numbers: number[]): number {
  if (numbers.length === 1) return numbers[0];

  const temp: number[] = [];
  let allZeros = true;

  numbers.forEach((number, index) => {
    if (index === 0) return;

    const diff = number - numbers[index - 1]
    if (diff !== 0) allZeros = false;
    temp.push(diff);
  })

  if (allZeros) return numbers[numbers.length - 1];

  const nextValue = numbers[numbers.length - 1] + getNextValue(temp);
  return nextValue
}

function solve() {
  const response = contents.reduce((acc, curr) => {
    const numbers = curr.split(" ").map(Number);
    const nextValue = getNextValue(numbers);

    return acc + nextValue;
  }, 0);

  console.log({ response })
}

async function main() {
  await processLineByLine();
  solve();
}

main();