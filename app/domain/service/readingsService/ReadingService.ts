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

  sortArray(numbers: number[]): number[] {
    return [...numbers].sort((a, b) => a - b);
  }

  calculateMedian(numbers: number[]): number {
    const sortedNumbers = this.sortArray(numbers);
    const middleIndex = Math.floor(sortedNumbers.length / 2);
    return sortedNumbers[middleIndex];
  }

  isSuspicious(reading: number, median: number): boolean {
    return reading > median * 1.5 || reading < median * 0.5;
  }
}
