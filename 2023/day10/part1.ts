import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

const contents: string[] = []

const dPipes: Record<string, number[][]> = {
  "|": [[-1, 0], [1, 0]],
  "-": [[0, -1], [0, 1]],
  "L": [[-1, 0], [0, 1]],
  "J": [[-1, 0], [0, -1]],
  "7": [[1, 0], [0, -1]],
  "F": [[1, 0], [0, 1]],
}

const d2 = [[-1, 0], [1, 0], [0, 1], [0, -1]];

const pipes = Object.keys(dPipes);

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

function getCoordinatesFromNumber(number: number) {
  const lineLength = contents[0].length;

  const startX = Math.floor(number / lineLength);
  const startY = number % lineLength;

  return [startX, startY];
}

function getNumberFromCoordinates(x: number, y: number) {
  const lineLength = contents[0].length;
  return x * lineLength + y
}

function solve() {
  let startPosition = -1;
  const graph = new Map<number, [number, number]>();

  contents.forEach((line, xIndex) => {
    line.split("").forEach((char, yIndex) => {
      if (char === "S") {
        startPosition = getNumberFromCoordinates(xIndex, yIndex);
        return;
      }

      if (pipes.includes(char)) {
        const [firstDpipe, secondDpipe] = dPipes[char];
        const [firstX, firstY] = [xIndex + firstDpipe[0], yIndex + firstDpipe[1]]
        const [secondX, secondY] = [xIndex + secondDpipe[0], yIndex + secondDpipe[1]]

        if (firstX < 0 || firstY < 0 || secondX < 0 || secondY < 0) return;

        graph.set(getNumberFromCoordinates(xIndex, yIndex), [
          getNumberFromCoordinates(firstX, firstY),
          getNumberFromCoordinates(secondX, secondY),
        ])
      }
    })
  })

  const [startX, startY] = getCoordinatesFromNumber(startPosition);

  console.log({ startX, startY })

  d2.forEach(dir => {
    let sX = startX + dir[0];
    let sY = startY + dir[1];
    // console.log({ sX, sY })
    const path: number[] = [startPosition];
    let isLoop = false;

    while (true) {
      const pipe = contents[sX]?.[sY];
      if (pipe === undefined) break;

      const nodes = graph.get(getNumberFromCoordinates(sX, sY));
      // console.log({ nodes })
      if (nodes === undefined) break;

      if (!nodes.includes(path[path.length - 1])) break;


      const goTo = path[path.length - 1] === nodes[0] ? nodes[1] : nodes[0];
      path.push(getNumberFromCoordinates(sX, sY));
      // console.log({ last: path[path.length - 1] })
      // console.log({ goTo });
      [sX, sY] = getCoordinatesFromNumber(goTo);

      if (goTo === startPosition) {
        isLoop = true;
        break;
      }

    }

    if (isLoop) {
      console.log({ distance: path.length / 2 });
    }
  })

}

async function main() {
  await processLineByLine();
  solve();
}

main();