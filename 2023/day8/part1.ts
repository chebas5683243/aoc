import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

const contents: string[] = [];
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
}

function getGraph() {
  for (let i = 2; i < contents.length; i++) {
    addNodeToGraph(contents[i]);
  }
}

function calculateSteps() {
  let nSteps = 0;
  let currentNode = "AAA";
  const nDirections = directions.length;

  while (true) {
    if (currentNode === "ZZZ") break;
    const direction = directions[nSteps % nDirections];
    currentNode = graph.get(currentNode)![direction];
    nSteps++;
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