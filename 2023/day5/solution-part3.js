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
var contents = [];
var maps = [[], [], [], [], [], [], []];
var seedRanges = [];
function processLineByLine() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, _d, rl_1, rl_1_1, line, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream('input.txt');
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
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
                    contents.push(line);
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
                case 12: return [2 /*return*/];
            }
        });
    });
}
function completeMap(mapIndex) {
    var currentMap = maps[mapIndex];
    currentMap.sort(function (a, b) { return b.source - a.source; });
    var temp = [];
    currentMap.forEach(function (convertion, index) {
        if (index === 0)
            return;
        if (index === currentMap.length - 1 && convertion.source !== 0) {
            temp.push({
                dest: 0,
                source: 0,
                rangeLength: convertion.source
            });
        }
        var prevConvertion = currentMap[index - 1];
        if (convertion.source + convertion.rangeLength === prevConvertion.source)
            return;
        temp.push({
            dest: convertion.source + convertion.rangeLength,
            source: convertion.source + convertion.rangeLength,
            rangeLength: prevConvertion.source - (convertion.source + convertion.rangeLength)
        });
    });
    currentMap.push.apply(currentMap, temp);
    currentMap.sort(function (a, b) { return b.dest - a.dest; });
}
function fillAllMaps() {
    var mapIndex = 0;
    for (var i = 3; i < contents.length; i++) {
        var line = contents[i];
        var firstChar = line[0];
        if (firstChar === undefined) {
            completeMap(mapIndex);
            mapIndex++;
            continue;
        }
        if (Number.isNaN(Number(firstChar)))
            continue;
        var _a = line.split(" "), destStart = _a[0], sourceStart = _a[1], rangeLength = _a[2];
        maps[mapIndex].push({ dest: Number(destStart), source: Number(sourceStart), rangeLength: Number(rangeLength) });
        if (i === contents.length - 1) {
            completeMap(mapIndex);
        }
    }
}
function getSeedsRange() {
    var firstLine = contents[0];
    var _a = firstLine.split(":"), _ = _a[0], seedsString = _a[1];
    var temp = seedsString.trim().split(" ").map(function (str) { return Number(str); });
    for (var i = 0; i < temp.length; i += 2) {
        seedRanges.push({
            source: temp[i],
            rangeLength: temp[i + 1]
        });
    }
    seedRanges.sort(function (a, b) { return a.source - b.source; });
}
function getMinLocation() {
    var locationsMap = maps[6];
    for (var i = locationsMap.length - 1; i >= 0; i--) {
        var combination = locationsMap[i];
        var responseRange = {
            location: combination.dest,
            source: combination.source,
            rangeLength: combination.rangeLength,
        };
        var minLocation = checkForMinLocation(responseRange, 5);
        if (minLocation !== -1)
            return minLocation;
    }
    return -1;
}
function checkForMinLocation(range, depth) {
    if (range.rangeLength === 0)
        return -1;
    if (depth === -1) {
        return checkForFirstRangeValueInSeeds(range);
    }
    var map = maps[depth];
    for (var i = 0; i < map.length; i++) {
        var combination = map[i];
        if (combination.dest <= range.source) {
            if (combination.dest + combination.rangeLength - 1 < range.source)
                return checkForMinLocation(range, depth - 1);
            var newRange = {
                location: range.location,
                source: combination.source + range.source - combination.dest,
                rangeLength: Math.min(range.rangeLength, combination.rangeLength + combination.dest - range.source)
            };
            var result = checkForMinLocation(newRange, depth - 1);
            if (result !== -1)
                return result;
            var secRange = {
                location: newRange.location + newRange.rangeLength,
                source: range.source + newRange.rangeLength,
                rangeLength: range.rangeLength - newRange.rangeLength,
            };
            return checkForMinLocation(secRange, depth);
        }
    }
    return -1;
}
function checkForFirstRangeValueInSeeds(range) {
    var firstValue = range.source;
    var lastValue = range.source + range.rangeLength - 1;
    for (var i = 0; i < seedRanges.length; i++) {
        var seedRange = seedRanges[i];
        if (seedRange.source === firstValue)
            return range.location;
        if (seedRange.source > firstValue) {
            if (seedRange.source > lastValue)
                return -1;
            return range.location + seedRange.source - lastValue;
        }
        ;
        if (seedRange.source + seedRange.rangeLength - 1 >= firstValue)
            return range.location;
    }
    return -1;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var minLocation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, processLineByLine()];
                case 1:
                    _a.sent();
                    fillAllMaps();
                    getSeedsRange();
                    minLocation = getMinLocation();
                    console.log({ minLocation: minLocation });
                    return [2 /*return*/];
            }
        });
    });
}
main();
