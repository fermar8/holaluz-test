import Reading from '../../model/reading/Reading';

export default class ReadingService {
  getAllReadingValues(readings: Reading[]): number[] {
    return readings.map((reading) => reading.reading);
  }
  getAllSuspiciousReadings(readings: Reading[], median: number) {
    return readings.filter((reading) =>
      this.isSuspicious(reading.reading, median),
    );
  }

  buildSuspiciousReadingsTable(readings: Reading[], median: number) {
    return readings.map((reading) => ({
      Client: reading.clientID,
      Month: reading.period,
      Suspicious: reading.reading,
      Median: median,
    }));
  }
  calculateMedian(numbers: number[]): number {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);
    return sortedNumbers[middleIndex];
  }
  isSuspicious(reading: number, median: number): boolean {
    return reading > median * 1.5 || reading < median * 0.5;
  }
}
