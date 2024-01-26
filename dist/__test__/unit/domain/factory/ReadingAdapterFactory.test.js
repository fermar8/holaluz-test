"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReadingAdapterFactory_1 = __importDefault(require("../../../../domain/factory/readingsFactory/ReadingAdapterFactory"));
const CsvReadingAdapter_1 = __importDefault(require("../../../../infrastructure/adapters/readings/CsvReadingAdapter"));
const XmlReadingAdapter_1 = __importDefault(require("../../../../infrastructure/adapters/readings/XmlReadingAdapter"));
describe('ReadingAdapterFactory', () => {
    it('should return XmlReadingAdapter for .xml extension', () => {
        const adapter = ReadingAdapterFactory_1.default.run('.xml');
        expect(adapter).toBeInstanceOf(XmlReadingAdapter_1.default);
    });
    it('should return CsvReadingAdapter for .csv extension', () => {
        const adapter = ReadingAdapterFactory_1.default.run('.csv');
        expect(adapter).toBeInstanceOf(CsvReadingAdapter_1.default);
    });
    it('should throw error for unsupported extension', () => {
        expect(() => ReadingAdapterFactory_1.default.run('.unsupported')).toThrow(`Unsupported file extension: .unsupported`);
    });
});
