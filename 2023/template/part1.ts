import * as fs from "fs";
import * as readline from "readline";

const file = "input.txt";

async function processLineByLine() {
  const fileStream = fs.createReadStream(file);

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

async function main() {
  const contents = await processLineByLine();
}

main();