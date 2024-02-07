import * as fs from "fs";
import * as readline from "readline";

function isNumber(char: string) {
  return !Number.isNaN(Number(char))
}

function isAsteric(char: string) {
  return char === "*"
}

function getNumberFromCoordinate(coordinate: number, engineSchematic: string[]) {
  const rowLength = engineSchematic[0].length;

  const row = Math.floor(coordinate / rowLength);
  const column = coordinate - row * rowLength;

  let currentNumberCharacter = engineSchematic[row][column];

  let currentColumn = column;

  while (currentColumn > 0) {
    currentColumn -= 1;

    const char = engineSchematic[row][currentColumn];
    if (!isNumber(char)) break;
    currentNumberCharacter = char + currentNumberCharacter;
  }

  currentColumn = column;

  while (currentColumn < rowLength - 1) {
    currentColumn += 1;

    const char = engineSchematic[row][currentColumn];
    if (!isNumber(char)) break;
    currentNumberCharacter = currentNumberCharacter + char;
  }

  return Number(currentNumberCharacter)
}

function checkIfGear(engineSchematic: string[], row: number, column: number): [boolean, number, number] {
  const maxColumnIndex = engineSchematic[0].length - 1;
  const maxRowIndex = engineSchematic.length - 1;
  const numberOfColumns = engineSchematic[0].length;

  const coordinates: number[] = [];

  if (row > 0) {
    for (let i = 0; i < 3; i++) {
      if (column === 0 && i === 0) continue;
      if (column === maxColumnIndex && i === 2) continue;

      const currentRow = row - 1;
      const currentColumn = column - 1 + i;

      const char = engineSchematic[currentRow][currentColumn];

      if (isNumber(char)) {
        const currentCoordinate = currentRow * numberOfColumns + currentColumn;
        if (coordinates.length === 0) coordinates.push(currentCoordinate);
        else {
          const lastCoordinate = coordinates[coordinates.length - 1]
          if (lastCoordinate + 1 === currentCoordinate) {
            coordinates[coordinates.length - 1] = currentCoordinate
          } else {
            coordinates.push(currentCoordinate);
          }
        }
      }

      if (coordinates.length > 2) return [false, 0, 0]
    }
  }

  if (column > 0) {
    const currentRow = row;
    const currentColumn = column - 1;

    const char = engineSchematic[currentRow][currentColumn];

    if (isNumber(char)) {
      const currentCoordinate = currentRow * numberOfColumns + currentColumn;
      coordinates.push(currentCoordinate);

      if (coordinates.length > 2) return [false, 0, 0]
    }
  }

  if (column < maxColumnIndex) {
    const currentRow = row;
    const currentColumn = column + 1;

    const char = engineSchematic[currentRow][currentColumn];

    if (isNumber(char)) {
      const currentCoordinate = currentRow * numberOfColumns + currentColumn;
      coordinates.push(currentCoordinate);

      if (coordinates.length > 2) return [false, 0, 0]
    }
  }

  if (row < maxRowIndex) {
    for (let i = 0; i < 3; i++) {
      if (column === 0 && i === 0) continue;
      if (column === maxColumnIndex && i === 2) continue;

      const currentRow = row + 1;
      const currentColumn = column - 1 + i;

      const char = engineSchematic[currentRow][currentColumn];

      if (isNumber(char)) {
        const currentCoordinate = currentRow * numberOfColumns + currentColumn;
        if (coordinates.length === 0) coordinates.push(currentCoordinate);
        else {
          const lastCoordinate = coordinates[coordinates.length - 1]
          if (lastCoordinate + 1 === currentCoordinate) {
            coordinates[coordinates.length - 1] = currentCoordinate
          } else {
            coordinates.push(currentCoordinate);
          }
        }
      }

      if (coordinates.length > 2) return [false, 0, 0]
    }
  }

  if (coordinates.length === 1) return [false, 0, 0]

  return [true, coordinates[0], coordinates[1]];
}

function getGearRatioSum(engineSchematic: string[]) {

  let gearRatioSum = 0;

  for (let i = 0; i < engineSchematic.length; i++) {
    const engineRow = engineSchematic[i];

    for (let j = 0; j < engineRow.length; j++) {
      const char = engineRow[j];

      if (!isAsteric(char)) continue;

      const [isGear, firstCoordinate, secondCoordinate] = checkIfGear(engineSchematic, i, j);
      if (isGear) {
        const firstNumber = getNumberFromCoordinate(firstCoordinate, engineSchematic);
        const secondNumber = getNumberFromCoordinate(secondCoordinate, engineSchematic);

        gearRatioSum += firstNumber * secondNumber
      }
    }
  }

  return gearRatioSum;
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
  const gearRatioSum = getGearRatioSum(engineSchematic);

  console.log({ gearRatioSum })
}

main();