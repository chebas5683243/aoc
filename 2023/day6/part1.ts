import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

interface Race {
  time: number;
  distance: number;
}

const contents: string[] = []
const races: Race[] = []

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

function getRaces() {
  const [firstLine, secondLine] = contents;

  const [_1, timesStr] = firstLine.split(":");
  const [_2, distanceStr] = secondLine.split(":");

  const times = timesStr.match(/\d+/g)!.map(Number);
  const distances = distanceStr.match(/\d+/g)!.map(Number);

  for (let i = 0; i < times?.length; i++) {
    races.push({
      time: times[i],
      distance: distances[i]
    })
  }
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
  return races.reduce((acc, race) => {
    const ways = getNumberWinningWays(race);
    console.log({ race, ways })
    return acc * ways
  }, 1);
}

async function main() {
  await processLineByLine();
  getRaces();
  const total = getTotalWays();

  console.log({ total })
}

main();