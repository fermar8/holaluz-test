import ReadingAdapter from '../../infrastructure/adapters/readings/ReadingAdapter';
import ReadingService from '../../domain/service/readingsService/ReadingService';

export default class ProcessReadingUseCase {
  constructor(
    private readonly readingAdapter: ReadingAdapter,
    private readonly readingService: ReadingService,
  ) {
    this.readingAdapter = readingAdapter;
    this.readingService = readingService;
  }

  async run(filePath: string): Promise<void> {
    const readings = await this.readingAdapter.run(filePath);
    const readingValues = this.readingService.getAllReadingValues(readings);
    const median = this.readingService.calculateMedian(readingValues);
    const suspiciousReadings = this.readingService.getAllSuspiciousReadings(
      readings,
      median,
    );
    const suspiciousReadingsTable =
      this.readingService.buildSuspiciousReadingsTable(
        suspiciousReadings,
        median,
      );
    console.table(suspiciousReadingsTable);
  }
}
