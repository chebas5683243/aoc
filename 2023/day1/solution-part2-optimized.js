const fs = require("fs")
const readline = require("readline")

function getNumberFromString(numberString) {
  const parsedNumber = Number(numberString);

  if (!Number.isNaN(parsedNumber)) return parsedNumber;

  if (numberString === "one") return 1;
  if (numberString === "two") return 2;
  if (numberString === "three") return 3;
  if (numberString === "four") return 4;
  if (numberString === "five") return 5;
  if (numberString === "six") return 6;
  if (numberString === "seven") return 7;
  if (numberString === "eight") return 8;
  if (numberString === "nine") return 9;

  return 0;
}

function getNumberFromLine(line) {
  const firstNumber = {
    value: 0,
    position: Infinity
  };
  const secondNumber = {
    value: 0,
    position: -1
  };

  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]

  numbers.forEach((value, index) => {
    const firstPosition = line.indexOf(value);
    const lastPosition = line.lastIndexOf(value);

    const currentNumber = getNumberFromString(value);

    if (firstPosition !== -1 && firstPosition < firstNumber.position) {
      firstNumber.position = firstPosition;
      firstNumber.value = currentNumber;
    }

    if (lastPosition !== -1 && lastPosition > secondNumber.position) {
      secondNumber.position = lastPosition;
      secondNumber.value = currentNumber;
    }
  })

  return firstNumber.value * 10 + secondNumber.value;
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
    console.log(line);
    console.log({ calibration });
    totalCalibration += calibration;
  }

  console.log({ totalCalibration });
}

async function main() {
  await processLineByLine();
}

main();