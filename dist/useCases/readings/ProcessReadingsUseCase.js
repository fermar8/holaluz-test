"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessReadingUseCase {
    constructor(readingAdapter, readingService) {
        this.readingAdapter = readingAdapter;
        this.readingService = readingService;
        this.readingAdapter = readingAdapter;
        this.readingService = readingService;
    }
    async run(filePath) {
        const readings = await this.readingAdapter.run(filePath);
        const readingValues = this.readingService.getAllReadingValues(readings);
        const median = this.readingService.calculateMedian(readingValues);
        const suspiciousReadings = this.readingService.getAllSuspiciousReadings(readings, median);
        const suspiciousReadingsTable = this.readingService.buildSuspiciousReadingsTable(suspiciousReadings, median);
        console.table(suspiciousReadingsTable);
    }
}
exports.default = ProcessReadingUseCase;
