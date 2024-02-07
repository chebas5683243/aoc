import * as fs from "fs";
import * as readline from "readline";

function getPointsFromCard(line: string) {
  const [_, secondString] = line.split(":");

  const [winningString, numbersString] = secondString.trim().split("|");

  const winningNumbers = winningString.trim().split(" ").reduce<number[]>((prev, numberStr) => {
    if (numberStr === "") return prev;
    return [...prev, Number(numberStr)];
  }, []);
  const winningSet = new Set(winningNumbers);

  const myNumbers = numbersString.trim().split(" ").reduce<number[]>((prev, numberStr) => {
    if (numberStr === "") return prev;
    return [...prev, Number(numberStr)];
  }, []);

  const numberOfMatches = myNumbers.reduce((prev, cur) => {
    if (winningSet.has(cur)) return prev + 1;
    return prev;
  }, 0)

  if (numberOfMatches === 0) return 0;
  return Math.pow(2, numberOfMatches - 1);
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sumPoints = 0;

  for await (const line of rl) {
    const points = getPointsFromCard(line);
    sumPoints += points;
  }

  console.log({ sumPoints });
}

async function main() {
  await processLineByLine();
}

main();