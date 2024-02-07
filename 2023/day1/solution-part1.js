const fs = require("fs")
const readline = require("readline")

function getNumberFromLine(line) {
  let firstNumber;
  let secondNumber;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const numberFromChar = Number(char);

    if (!Number.isNaN(numberFromChar)) {
      if (firstNumber === undefined) firstNumber = numberFromChar;
      secondNumber = numberFromChar;
    }
  }

  return firstNumber * 10 + secondNumber;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let totalCalibration = 0;

  for await (const line of rl) {
    const calibration = getNumberFromLine(line);
    totalCalibration += calibration;
  }

  console.log({ totalCalibration });
}

async function main() {
  console.time("solution-part1");
  await processLineByLine();
  console.timeEnd("solution-part1");
}

main();