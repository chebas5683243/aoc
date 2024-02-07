import * as fs from "fs";
import * as readline from "readline";

function getGamePower(line: string) {
  const gameSets = line.split(";");

  const bag: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  }

  for (let i = 0; i < gameSets.length; i++) {
    const gameSet = gameSets[i].trim();
    const cubeColors = gameSet.split(",");

    for (let j = 0; j < cubeColors.length; j++) {
      const [nCubes, cubeColor] = cubeColors[j].trim().split(" ");
      if (Number(nCubes) > bag[cubeColor]) bag[cubeColor] = Number(nCubes);
    }
  }

  return bag.red * bag.green * bag.blue;
}

function getGamePowerFromLine(line: string) {
  const [_, secondString] = line.split(":");

  const gamePower = getGamePower(secondString.trim());

  return gamePower;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sumGamePower = 0;

  for await (const line of rl) {
    const gamePower = getGamePowerFromLine(line);
    sumGamePower += gamePower;
  }

  console.log({ sumGamePower });
}

async function main() {
  console.time("solution-part1");
  await processLineByLine();
  console.timeEnd("solution-part1");
}

main();