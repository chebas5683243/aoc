import * as fs from "fs";
import * as readline from "readline";

function isNumber(char: string) {
  return !Number.isNaN(Number(char))
}

function isSymbol(char: string) {
  if (char === ".") return false;
  if (isNumber(char)) return false;
  return true;
}

function checkIfPartNumber(numberChar: string, engineSchematic: string[], row: number, column: number) {
  const maxColumnIndex = engineSchematic[0].length - 1;
  const maxRowIndex = engineSchematic.length - 1;

  const firstColumn = column - numberChar.length + 1;

  for (let i = 0; i < numberChar.length; i++) {

    const currentColumn = firstColumn + i;

    if (i === 0 && currentColumn > 0) {
      const leftChar = engineSchematic[row][currentColumn - 1];
      if (isSymbol(leftChar)) return true;

      if (row > 0) {
        const leftTopChar = engineSchematic[row - 1][currentColumn - 1];
        if (isSymbol(leftTopChar)) return true;
      }

      if (row < maxRowIndex) {
        const leftBottomChar = engineSchematic[row + 1][currentColumn - 1];
        if (isSymbol(leftBottomChar)) return true;
      }
    }

    if (i === numberChar.length - 1 && currentColumn < maxColumnIndex) {
      const rightChar = engineSchematic[row][currentColumn + 1];
      if (isSymbol(rightChar)) return true;

      if (row > 0) {
        const rigthTopChar = engineSchematic[row - 1][currentColumn + 1];
        if (isSymbol(rigthTopChar)) return true;
      }

      if (row < maxRowIndex) {
        const rightBottomChar = engineSchematic[row + 1][currentColumn + 1];
        if (isSymbol(rightBottomChar)) return true;
      }
    }

    if (row > 0) {
      const upperChar = engineSchematic[row - 1][currentColumn];
      if (isSymbol(upperChar)) return true;
    }

    if (row < maxRowIndex) {
      const bottomChar = engineSchematic[row + 1][currentColumn];
      if (isSymbol(bottomChar)) return true;
    }
  }

  return false;
}

function getPartNumbersSum(engineSchematic: string[]) {

  let partNumbersSum = 0;

  for (let i = 0; i < engineSchematic.length; i++) {
    const engineRow = engineSchematic[i];

    let currentNumberChars = "";

    for (let j = 0; j < engineRow.length; j++) {
      const char = engineRow[j];
      const isNumberChar = isNumber(char);

      if (isNumberChar) currentNumberChars += char;

      if (currentNumberChars.length === 0) continue;

      if (!isNumberChar || j === engineRow.length - 1) {
        const isPartNumber = checkIfPartNumber(currentNumberChars, engineSchematic, i, isNumberChar ? j : j - 1);
        if (isPartNumber) partNumbersSum += Number(currentNumberChars);
        currentNumberChars = "";
      }
    }
  }

  return partNumbersSum;
}

async function getEngineSchematic() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const engineSchematic = [];

  for await (const line of rl) {
    engineSchematic.push(line)
  }

  return engineSchematic
}

async function main() {
  const engineSchematic = await getEngineSchematic();
  const partNumbersSum = getPartNumbersSum(engineSchematic);

  console.log({ partNumbersSum })
}

main();