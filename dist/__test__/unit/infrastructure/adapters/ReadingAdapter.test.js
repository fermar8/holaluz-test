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
const CsvReadingAdapter_1 = __importDefault(require("../../../../infrastructure/adapters/readings/CsvReadingAdapter"));
const XmlReadingAdapter_1 = __importDefault(require("../../../../infrastructure/adapters/readings/XmlReadingAdapter"));
const CsvParseError_1 = __importDefault(require("../../../../infrastructure/adapters/readings/errors/CsvParseError"));
const XmlParseError_1 = __importDefault(require("../../../../infrastructure/adapters/readings/errors/XmlParseError"));
jest.mock('fs');
jest.mock('csv-parser');
jest.mock('xml2js');
describe('CsvReadingAdapter', () => {
    describe('#run', () => {
        it('should parse CSV file and return Readings', async () => {
            const expectedReadings = [
                { clientID: 'client1', period: 'period1', reading: 1 },
                { clientID: 'client2', period: 'period2', reading: 2 },
            ];
            const filePath = '/path/to/file';
            const parserStream = {
                pipe: jest.fn().mockReturnThis(),
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'data') {
                        expectedReadings.forEach((reading) => callback({
                            client: reading.clientID,
                            period: reading.period,
                            reading: reading.reading,
                        }));
                    }
                    else if (event === 'end') {
                        callback();
                    }
                    return parserStream;
                }),
            };
            const readStream = {
                pipe: jest.fn().mockReturnValue(parserStream),
            };
            fs_1.default.createReadStream.mockReturnValue(readStream);
            const adapter = new CsvReadingAdapter_1.default();
            const result = await adapter.run(filePath);
            expect(result).toEqual(expectedReadings);
            expect(fs_1.default.createReadStream).toHaveBeenCalledWith(filePath);
        });
        it('should throw CsvParseError when there is an error', async () => {
            const filePath = '/path/to/file';
            const parserStream = {
                pipe: jest.fn().mockReturnThis(),
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'error') {
                        callback(new CsvParseError_1.default('Simulated error'));
                    }
                    return parserStream;
                }),
            };
            const readStream = {
                pipe: jest.fn().mockReturnValue(parserStream),
            };
            fs_1.default.createReadStream.mockReturnValue(readStream);
            const adapter = new CsvReadingAdapter_1.default();
            try {
                await adapter.run(filePath);
            }
            catch (error) {
                expect(error).toBeInstanceOf(CsvParseError_1.default);
            }
        });
    });
});
describe('XmlReadingAdapter', () => {
    describe('#run', () => {
        it('should parse XML file and return Readings', async () => {
            const expectedReadings = [
                { clientID: 'client1', period: 'period1', reading: 1 },
                { clientID: 'client2', period: 'period2', reading: 2 },
            ];
            const filePath = '/path/to/file';
            const xmlData = `<readings><reading clientID="client1" period="period1"><_>1</_></reading><reading clientID="client2" period="period2"><_>2</_></reading></readings>`;
            fs_1.default.readFileSync.mockReturnValue(xmlData);
            xml2js.parseString.mockImplementation((xml, callback) => {
                const result = {
                    readings: {
                        reading: expectedReadings.map((reading) => ({
                            $: Object.assign({}, reading),
                            _: reading.reading,
                        })),
                    },
                };
                callback(null, result);
            });
            const adapter = new XmlReadingAdapter_1.default();
            const result = await adapter.run(filePath);
            expect(result).toEqual(expectedReadings);
            expect(fs_1.default.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
            expect(xml2js.parseString).toHaveBeenCalledWith(xmlData, expect.any(Function));
        });
        it('should throw XmlParseError when there is an error', async () => {
            const filePath = '/path/to/file';
            const xmlData = `<readings><reading clientID="client1" period="period1"><_>1</_></reading><reading clientID="client2" period="period2"><_>2</_></reading></readings>`;
            fs_1.default.readFileSync.mockReturnValue(xmlData);
            xml2js.parseString.mockImplementation((xml, callback) => {
                callback(new XmlParseError_1.default('Simulated error'), null);
            });
            const adapter = new XmlReadingAdapter_1.default();
            try {
                await adapter.run(filePath);
            }
            catch (error) {
                expect(error).toBeInstanceOf(XmlParseError_1.default);
            }
        });
    });
});
