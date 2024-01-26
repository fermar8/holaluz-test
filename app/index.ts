import path from 'path';
import ReadingAdapterFactory from './domain/factory/readingsFactory/ReadingAdapterFactory';
import ReadingService from './domain/service/readingsService/ReadingService';
import ProcessReadingUseCase from './useCases/readings/ProcessReadingsUseCase';

async function main() {
  try {
    const filePath = process.argv[2];
    const extension = path.extname(filePath);
    const readingAdapter = ReadingAdapterFactory.run(extension);
    const readingService = new ReadingService();

    const processReadingUseCase = new ProcessReadingUseCase(
      readingAdapter,
      readingService,
    );
    await processReadingUseCase.run(filePath);
  } catch (error) {
    console.log('error', error);
  }
}

main();
