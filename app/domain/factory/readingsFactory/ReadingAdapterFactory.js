"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XmlReadingAdapter_1 = __importDefault(require("../../../infrastructure/adapters/readings/XmlReadingAdapter"));
const CsvReadingAdapter_1 = __importDefault(require("../../../infrastructure/adapters/readings/CsvReadingAdapter"));
class ReadingAdapterFactory {
    static run(extension) {
        switch (extension) {
            case '.xml':
                return new XmlReadingAdapter_1.default();
            case '.csv':
                return new CsvReadingAdapter_1.default();
            default:
                throw new Error(`Unsupported file extension: ${extension}`);
        }
    }
}
exports.default = ReadingAdapterFactory;
