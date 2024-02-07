import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

const contents: string[] = [];
const startingPoints: string[] = [];
let directions: number[] = [];

const graph = new Map<string, [string, string]>();

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

function getDirections() {
  directions = contents[0].split("").map(direction => direction === "R" ? 1 : 0)
}

function addNodeToGraph(line: string) {
  const [node, childsStr] = line.split(" = ");
  const [firstChild, secondChild] = childsStr.match(/[A-Z]+/g)!;
  graph.set(node, [firstChild, secondChild])

  if (node.endsWith("A")) startingPoints.push(node);
}

function getGraph() {
  for (let i = 2; i < contents.length; i++) {
    addNodeToGraph(contents[i]);
  }
}

function calculateSteps() {
  let nSteps = 0;
  const nDirections = directions.length;

  while (true) {
    let nZs = 0;

    startingPoints.forEach((start, index) => {
      const direction = directions[nSteps % nDirections];
      const endNode = graph.get(start)![direction];
      if (endNode.endsWith("Z")) nZs++;
      startingPoints[index] = endNode;
    })

    nSteps++;
    if (nSteps % 5000000 === 0) console.log({ nSteps })
    if (nZs === startingPoints.length) break;
  }

  console.log({ nSteps })
}

async function main() {
  await processLineByLine();
  getDirections();
  getGraph();
  calculateSteps();
}

main();