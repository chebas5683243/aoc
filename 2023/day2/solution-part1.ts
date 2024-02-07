import * as fs from "fs";
import * as readline from "readline";

const bag: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
}

function checkIfGameIsPossible(line: string) {
  const gameSets = line.split(";");
  console.log({ gameSets })

  for (let i = 0; i < gameSets.length; i++) {
    const gameSet = gameSets[i].trim();
    const cubeColors = gameSet.split(",");

    for (let j = 0; j < cubeColors.length; j++) {
      const [nCubes, cubeColor] = cubeColors[j].trim().split(" ");
      if (bag[cubeColor] < Number(nCubes)) return false;
    }
  }

  return true;
}

function getIdIfGameIsPossible(line: string) {
  const [firstString, secondString] = line.split(":");

  const [_, gameId] = firstString.split(" ");

  const isGamePossible = checkIfGameIsPossible(secondString.trim());

  if (isGamePossible) return Number(gameId);

  return 0;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sumIds = 0;

  for await (const line of rl) {
    const id = getIdIfGameIsPossible(line);
    console.log({ id })
    sumIds += id;
  }

  console.log({ sumIds });
}

async function main() {
  console.time("solution-part1");
  await processLineByLine();
  console.timeEnd("solution-part1");
}

main();