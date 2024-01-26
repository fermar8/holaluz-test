"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadingService {
    getAllReadingValues(readings) {
        return readings.map((reading) => reading.reading);
    }
    getAllSuspiciousReadings(readings, median) {
        return readings.filter((reading) => this.isSuspicious(reading.reading, median));
    }
    buildSuspiciousReadingsTable(readings, median) {
        return readings.map((reading) => ({
            Client: reading.clientID,
            Month: reading.period,
            Suspicious: reading.reading,
            Median: median,
        }));
    }
    calculateMedian(numbers) {
        const sortedNumbers = numbers.sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedNumbers.length / 2);
        return sortedNumbers[middleIndex];
    }
    isSuspicious(reading, median) {
        return reading > median * 1.5 || reading < median * 0.5;
    }
}
exports.default = ReadingService;
