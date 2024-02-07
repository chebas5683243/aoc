import * as fs from "fs";
import * as readline from "readline";

const recurrency: number[] = [];

function addCardToRecurrency(line: string) {
  const [firstString, secondString] = line.split(":");

  let cardId: number = -1;

  firstString.trim().split(" ").forEach((str) => {
    if (!Number.isNaN(Number(str))) cardId = Number(str)
  });

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


  if (recurrency[cardId] === undefined) recurrency[cardId] = 1

  const currentRecurrency = recurrency[cardId];

  for (let i = 1; i <= numberOfMatches; i++) {
    if (recurrency[cardId + i] === undefined) recurrency[cardId + i] = 1 + currentRecurrency;
    else recurrency[cardId + i] += currentRecurrency;
  }
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    addCardToRecurrency(line);
  }

  const totalCards = recurrency.reduce((prev, cur) => prev + cur, 0);

  console.log({ totalCards });
  console.log({ recurrency });
}

async function main() {
  await processLineByLine();
}

main();