"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
function isNumber(char) {
    return !Number.isNaN(Number(char));
}
function isAsteric(char) {
    return char === "*";
}
function getNumberFromCoordinate(coordinate, engineSchematic) {
    var rowLength = engineSchematic[0].length;
    var row = Math.floor(coordinate / rowLength);
    var column = coordinate - row * rowLength;
    var currentNumberCharacter = engineSchematic[row][column];
    var currentColumn = column;
    while (currentColumn > 0) {
        currentColumn -= 1;
        var char = engineSchematic[row][currentColumn];
        if (!isNumber(char))
            break;
        currentNumberCharacter = char + currentNumberCharacter;
    }
    currentColumn = column;
    while (currentColumn < rowLength - 1) {
        currentColumn += 1;
        var char = engineSchematic[row][currentColumn];
        if (!isNumber(char))
            break;
        currentNumberCharacter = currentNumberCharacter + char;
    }
    return Number(currentNumberCharacter);
}
function checkIfGear(engineSchematic, row, column) {
    var maxColumnIndex = engineSchematic[0].length - 1;
    var maxRowIndex = engineSchematic.length - 1;
    var numberOfColumns = engineSchematic[0].length;
    var coordinates = [];
    if (row > 0) {
        for (var i = 0; i < 3; i++) {
            if (column === 0 && i === 0)
                continue;
            if (column === maxColumnIndex && i === 2)
                continue;
            var currentRow = row - 1;
            var currentColumn = column - 1 + i;
            var char = engineSchematic[currentRow][currentColumn];
            if (isNumber(char)) {
                var currentCoordinate = currentRow * numberOfColumns + currentColumn;
                if (coordinates.length === 0)
                    coordinates.push(currentCoordinate);
                else {
                    var lastCoordinate = coordinates[coordinates.length - 1];
                    if (lastCoordinate + 1 === currentCoordinate) {
                        coordinates[coordinates.length - 1] = currentCoordinate;
                    }
                    else {
                        coordinates.push(currentCoordinate);
                    }
                }
            }
            if (coordinates.length > 2)
                return [false, 0, 0];
        }
    }
    if (column > 0) {
        var currentRow = row;
        var currentColumn = column - 1;
        var char = engineSchematic[currentRow][currentColumn];
        if (isNumber(char)) {
            var currentCoordinate = currentRow * numberOfColumns + currentColumn;
            coordinates.push(currentCoordinate);
            if (coordinates.length > 2)
                return [false, 0, 0];
        }
    }
    if (column < maxColumnIndex) {
        var currentRow = row;
        var currentColumn = column + 1;
        var char = engineSchematic[currentRow][currentColumn];
        if (isNumber(char)) {
            var currentCoordinate = currentRow * numberOfColumns + currentColumn;
            coordinates.push(currentCoordinate);
            if (coordinates.length > 2)
                return [false, 0, 0];
        }
    }
    if (row < maxRowIndex) {
        for (var i = 0; i < 3; i++) {
            if (column === 0 && i === 0)
                continue;
            if (column === maxColumnIndex && i === 2)
                continue;
            var currentRow = row + 1;
            var currentColumn = column - 1 + i;
            var char = engineSchematic[currentRow][currentColumn];
            if (isNumber(char)) {
                var currentCoordinate = currentRow * numberOfColumns + currentColumn;
                if (coordinates.length === 0)
                    coordinates.push(currentCoordinate);
                else {
                    var lastCoordinate = coordinates[coordinates.length - 1];
                    if (lastCoordinate + 1 === currentCoordinate) {
                        coordinates[coordinates.length - 1] = currentCoordinate;
                    }
                    else {
                        coordinates.push(currentCoordinate);
                    }
                }
            }
            if (coordinates.length > 2)
                return [false, 0, 0];
        }
    }
    if (coordinates.length === 1)
        return [false, 0, 0];
    return [true, coordinates[0], coordinates[1]];
}
function getGearRatioSum(engineSchematic) {
    var gearRatioSum = 0;
    for (var i = 0; i < engineSchematic.length; i++) {
        var engineRow = engineSchematic[i];
        for (var j = 0; j < engineRow.length; j++) {
            var char = engineRow[j];
            if (!isAsteric(char))
                continue;
            var _a = checkIfGear(engineSchematic, i, j), isGear = _a[0], firstCoordinate = _a[1], secondCoordinate = _a[2];
            if (isGear) {
                var firstNumber = getNumberFromCoordinate(firstCoordinate, engineSchematic);
                var secondNumber = getNumberFromCoordinate(secondCoordinate, engineSchematic);
                gearRatioSum += firstNumber * secondNumber;
            }
        }
    }
    return gearRatioSum;
}
function getEngineSchematic() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, engineSchematic, _d, rl_1, rl_1_1, line, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream('input.txt');
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
                    engineSchematic = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _e.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _e.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    engineSchematic.push(line);
                    _e.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, engineSchematic];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var engineSchematic, gearRatioSum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEngineSchematic()];
                case 1:
                    engineSchematic = _a.sent();
                    gearRatioSum = getGearRatioSum(engineSchematic);
                    console.log({ gearRatioSum: gearRatioSum });
                    return [2 /*return*/];
            }
        });
    });
}
main();
