"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReadingService_1 = __importDefault(require("../../../../domain/service/readingsService/ReadingService"));
describe('ReadingService', () => {
    const service = new ReadingService_1.default();
    const mockReading = {
        reading: 10,
        clientID: 'client1',
        period: '2016-12',
    };
    it('getAllReadingValues - should return all reading values', () => {
        const readings = [mockReading];
        const result = service.getAllReadingValues(readings);
        expect(result).toEqual([10]);
    });
    it('getAllSuspiciousReadings - should filter suspicious readings', () => {
        const readings = [mockReading];
        const median = 10;
        const result = service.getAllSuspiciousReadings(readings, median);
        expect(result).toEqual([]);
    });
    it('buildSuspiciousReadingsTable - should build suspicious readings table', () => {
        const suspiciousMockReading = {
            reading: 18,
            clientID: 'client1',
            period: '2016-12',
        };
        const readings = [suspiciousMockReading];
        const median = 10;
        const result = service.buildSuspiciousReadingsTable(readings, median);
        expect(result).toEqual([
            {
                Client: 'client1',
                Month: '2016-12',
                Suspicious: 18,
                Median: 10,
            },
        ]);
    });
    it('calculateMedian - should calculate median', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 8, 10, 15];
        const result = service.calculateMedian(numbers);
        expect(result).toEqual(5);
    });
    it('isSuspicious - should determine if a reading is suspicious', () => {
        const reading = 16;
        const median = 10;
        const result = service.isSuspicious(reading, median);
        expect(result).toEqual(true);
    });
});
