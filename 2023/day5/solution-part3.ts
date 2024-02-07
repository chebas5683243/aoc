import * as fs from "fs";
import * as readline from "readline";

interface MapItem {
  source: number;
  dest: number;
  rangeLength: number;
}

interface Range {
  source: number;
  rangeLength: number;
}

interface ResponseRange extends Range {
  location: number;
}

const contents: string[] = [];

const maps: MapItem[][] = [[], [], [], [], [], [], []];

const seedRanges: Range[] = []

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    contents.push(line);
  }
}

function completeMap(mapIndex: number) {
  const currentMap = maps[mapIndex];

  currentMap.sort((a, b) => b.source - a.source);

  const temp: MapItem[] = [];

  currentMap.forEach((convertion, index) => {
    if (index === 0) return;

    if (index === currentMap.length - 1 && convertion.source !== 0) {
      temp.push({
        dest: 0,
        source: 0,
        rangeLength: convertion.source
      })
    }

    const prevConvertion = currentMap[index - 1];

    if (convertion.source + convertion.rangeLength === prevConvertion.source) return;

    temp.push({
      dest: convertion.source + convertion.rangeLength,
      source: convertion.source + convertion.rangeLength,
      rangeLength: prevConvertion.source - (convertion.source + convertion.rangeLength)
    })
  })

  currentMap.push(...temp);

  currentMap.sort((a, b) => b.dest - a.dest);
}

function fillAllMaps() {
  let mapIndex = 0;

  for (let i = 3; i < contents.length; i++) {
    const line = contents[i];

    const firstChar = line[0];

    if (firstChar === undefined) {
      completeMap(mapIndex);
      mapIndex++;
      continue;
    }

    if (Number.isNaN(Number(firstChar))) continue;

    const [destStart, sourceStart, rangeLength] = line.split(" ");

    maps[mapIndex].push({ dest: Number(destStart), source: Number(sourceStart), rangeLength: Number(rangeLength) })

    if (i === contents.length - 1) {
      completeMap(mapIndex);
    }
  }
}

function getSeedsRange() {
  const firstLine = contents[0];

  const [_, seedsString] = firstLine.split(":");
  const temp = seedsString.trim().split(" ").map((str) => Number(str))

  for (let i = 0; i < temp.length; i += 2) {
    seedRanges.push({
      source: temp[i],
      rangeLength: temp[i + 1]
    })
  }

  seedRanges.sort((a, b) => a.source - b.source)
}

function getMinLocation() {
  const locationsMap = maps[6];

  for (let i = locationsMap.length - 1; i >= 0; i--) {
    const combination = locationsMap[i];

    const responseRange: ResponseRange = {
      location: combination.dest,
      source: combination.source,
      rangeLength: combination.rangeLength,
    }

    const minLocation = checkForMinLocation(responseRange, 5);
    if (minLocation !== -1) return minLocation;
  }

  return -1;
}

function checkForMinLocation(range: ResponseRange, depth: number): number {
  if (range.rangeLength === 0) return -1;

  if (depth === -1) {
    return checkForFirstRangeValueInSeeds(range);
  }

  const map = maps[depth];

  for (let i = 0; i < map.length; i++) {
    const combination = map[i];
    if (combination.dest <= range.source) {

      if (combination.dest + combination.rangeLength - 1 < range.source) return checkForMinLocation(range, depth - 1);

      const newRange: ResponseRange = {
        location: range.location,
        source: combination.source + range.source - combination.dest,
        rangeLength: Math.min(range.rangeLength, combination.rangeLength + combination.dest - range.source)
      }

      const result = checkForMinLocation(newRange, depth - 1);
      if (result !== -1) return result;


      const secRange: ResponseRange = {
        location: newRange.location + newRange.rangeLength,
        source: range.source + newRange.rangeLength,
        rangeLength: range.rangeLength - newRange.rangeLength,
      }

      return checkForMinLocation(secRange, depth);
    }
  }

  return -1;
}

function checkForFirstRangeValueInSeeds(range: ResponseRange) {
  const firstValue = range.source;
  const lastValue = range.source + range.rangeLength - 1;

  for (let i = 0; i < seedRanges.length; i++) {
    const seedRange = seedRanges[i];
    if (seedRange.source === firstValue) return range.location
    if (seedRange.source > firstValue) {
      if (seedRange.source > lastValue) return -1;
      return range.location + seedRange.source - lastValue;
    };

    if (seedRange.source + seedRange.rangeLength - 1 >= firstValue) return range.location
  }

  return -1;
}

async function main() {
  await processLineByLine();
  fillAllMaps();
  getSeedsRange();
  const minLocation = getMinLocation();

  console.log({ minLocation })
}

main();