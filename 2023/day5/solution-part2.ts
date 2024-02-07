import * as fs from "fs";
import * as readline from "readline";

interface MapItem {
  source: number;
  dest: number;
  rangeLength: number;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const contents = [];

  for await (const line of rl) {
    contents.push(line);
  }

  return contents;
}

function getDestinations(sources: number[], map: MapItem[]) {

  map.sort((a, b) => b.source - a.source);

  const destinations = sources.map(currSource => {
    for (let i = 0; i < map.length; i++) {
      const combination = map[i];
      if (combination.source <= currSource) {
        // console.log({ cbSource: combination.source, currSource })
        if (combination.source + combination.rangeLength - 1 >= currSource) return combination.dest + currSource - combination.source;
        else return currSource;
      }
    }

    // console.log({ cbSource: "None", currSource })
    return currSource;
  })
  // console.log({ map })
  // console.log({ destinations })
  return destinations;
}

function getLocations(seeds: number[], contents: string[]) {

  let currentSources = seeds;
  let map: MapItem[] = [];

  for (let i = 0; i < contents.length; i++) {
    const line = contents[i];

    const firstChar = line[0];

    if (firstChar === undefined) {
      currentSources = getDestinations(currentSources, map);
      map = []
      continue;
    }

    if (Number.isNaN(Number(firstChar))) continue;

    const [destStart, sourceStart, rangeLength] = line.split(" ");
    map.push({ dest: Number(destStart), source: Number(sourceStart), rangeLength: Number(rangeLength) })

    if (i === contents.length - 1) {
      currentSources = getDestinations(currentSources, map);
    }
  }

  return currentSources;
}

function getLowestLocation(contents: string[]) {
  const firstLine = contents[0];

  const [_, seedsString] = firstLine.split(":");
  const seedsRanges = seedsString.trim().split(" ").map((str) => Number(str))

  let lowestLocation = Infinity;

  let nOperations = 0;

  for (let i = 0; i < seedsRanges.length; i += 2) {
    const initialValue = seedsRanges[i];
    const rangeLength = seedsRanges[i + 1];
    for (let j = 0; j < rangeLength; j++) {
      const seeds = [initialValue + j]
      const locations = getLocations(seeds, contents.slice(3))
      nOperations++;
      if (nOperations % 1000 === 0) console.log(nOperations)
      if (lowestLocation > locations[0]) lowestLocation = locations[0]
    }
  }

  return lowestLocation;
}

async function main() {
  const contents = await processLineByLine();
  const lowestLocation = getLowestLocation(contents);

  console.log({ lowestLocation })
}

main();