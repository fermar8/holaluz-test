"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessReadingsUseCase_1 = __importDefault(require("../../../../useCases/readings/ProcessReadingsUseCase"));
jest.mock('../../../../infrastructure/adapters/readings/ReadingAdapter');
jest.mock('../../../../domain/service/readingsService/ReadingService');
describe('ProcessReadingUseCase', () => {
    describe('#run', () => {
        it('should process readings', async () => {
            const filePath = '/path/to/file';
            const readings = [
                { clientID: 'client1', period: 'period1', reading: 1 },
                { clientID: 'client2', period: 'period2', reading: 2 },
            ];
            const readingValues = [1, 2];
            const median = 1.5;
            const suspiciousReadings = [
                { clientID: 'client1', period: 'period1', reading: 1 },
            ];
            const suspiciousReadingsTable = [[1], ['client1', 'period1', 1]];
            const readingAdapter = {
                run: jest.fn().mockResolvedValue(readings),
            };
            const readingService = {
                getAllReadingValues: jest.fn().mockReturnValue(readingValues),
                calculateMedian: jest.fn().mockReturnValue(median),
                getAllSuspiciousReadings: jest.fn().mockReturnValue(suspiciousReadings),
                buildSuspiciousReadingsTable: jest
                    .fn()
                    .mockReturnValue(suspiciousReadingsTable),
            };
            const useCase = new ProcessReadingsUseCase_1.default(readingAdapter, readingService);
            await useCase.run(filePath);
            expect(readingAdapter.run).toHaveBeenCalledWith(filePath);
            expect(readingService.getAllReadingValues).toHaveBeenCalledWith(readings);
            expect(readingService.calculateMedian).toHaveBeenCalledWith(readingValues);
            expect(readingService.getAllSuspiciousReadings).toHaveBeenCalledWith(readings, median);
            expect(readingService.buildSuspiciousReadingsTable).toHaveBeenCalledWith(suspiciousReadings, median);
        });
    });
});
