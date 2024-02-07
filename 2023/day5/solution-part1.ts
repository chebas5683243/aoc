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

function getSeeds(contents: string[]) {
  const firstLine = contents[0];

  const [_, seedsString] = firstLine.split(":");
  const seeds = seedsString.trim().split(" ").map((str) => Number(str))

  return seeds;
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

async function main() {
  const contents = await processLineByLine();
  const seeds = getSeeds(contents);

  const locations = getLocations(seeds, contents.slice(3))
  // console.log({ locations })

  locations.sort((a, b) => a - b);
  // console.log({ locations })

  console.log({ lowestLocation: locations[0] })
}

main();