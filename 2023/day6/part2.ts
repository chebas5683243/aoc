import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

interface Race {
  time: number;
  distance: number;
}

const contents: string[] = []
const race: Race = {
  time: 0,
  distance: 0
}

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

function getRace() {
  const [firstLine, secondLine] = contents;

  const [_1, timeStr] = firstLine.split(":");
  const [_2, distanceStr] = secondLine.split(":");

  const time = Number(timeStr.match(/\d+/g)!.join(""));
  const distance = Number(distanceStr.match(/\d+/g)!.join(""));

  race.time = time
  race.distance = distance

  console.log({ race })
}

function getNumberWinningWays(race: Race) {

  const { time, distance } = race;

  const deviation = time * time - 4 * distance;

  if (deviation < 0) return 0;

  let lowerBound = (time - Math.sqrt(deviation)) / 2;
  let upperBound = (time + Math.sqrt(deviation)) / 2;

  if (Number.isInteger(lowerBound)) lowerBound++;
  else lowerBound = Math.ceil(lowerBound)

  if (Number.isInteger(upperBound)) upperBound--;
  else upperBound = Math.floor(upperBound)

  return Math.max(upperBound - lowerBound + 1, 0);
}

function getTotalWays() {
  const ways = getNumberWinningWays(race);
  console.log({ race, ways })
  return ways
}

async function main() {
  await processLineByLine();
  getRace();
  const total = getTotalWays();

  console.log({ total })
}

main();