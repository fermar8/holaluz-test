"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XmlReadingAdapter_1 = __importDefault(require("../../../infrastructure/adapters/readings/XmlReadingAdapter"));
const CsvReadingAdapter_1 = __importDefault(require("../../../infrastructure/adapters/readings/CsvReadingAdapter"));
const UnsupportedFileExtensionError_1 = __importDefault(require("./errors/UnsupportedFileExtensionError"));
const adapterMap = {
    '.xml': XmlReadingAdapter_1.default,
    '.csv': CsvReadingAdapter_1.default,
};
class ReadingAdapterFactory {
    static run(extension) {
        const AdapterClass = adapterMap[extension];
        if (!AdapterClass) {
            throw new UnsupportedFileExtensionError_1.default(`Unsupported file extension: ${extension}`);
        }
        return new AdapterClass();
    }
}
exports.default = ReadingAdapterFactory;
