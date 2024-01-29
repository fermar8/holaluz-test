"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2js = __importStar(require("xml2js"));
const XmlParseError_1 = __importDefault(require("./errors/XmlParseError"));
class XmlReadingAdapter {
    async run(filePath) {
        const formattedReadings = [];
        const xmlData = fs_1.default.readFileSync(filePath, 'utf8');
        await new Promise((resolve, reject) => {
            xml2js.parseString(xmlData, (err, result) => {
                if (err) {
                    reject(new XmlParseError_1.default());
                }
                for (const reading of result.readings.reading) {
                    const formattedReading = {
                        clientID: reading.$.clientID.toString(),
                        period: reading.$.period.toString(),
                        reading: Number(reading._),
                    };
                    formattedReadings.push(formattedReading);
                }
                resolve();
            });
        });
        return formattedReadings;
    }
}
exports.default = XmlReadingAdapter;
