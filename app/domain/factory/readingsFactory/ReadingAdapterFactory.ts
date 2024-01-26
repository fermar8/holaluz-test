import ReadingAdapter from '../../../infrastructure/adapters/readings/ReadingAdapter';
import XmlReadingAdapter from '../../../infrastructure/adapters/readings/XmlReadingAdapter';
import CsvReadingAdapter from '../../../infrastructure/adapters/readings/CsvReadingAdapter';

export default class ReadingAdapterFactory {
  static run(extension: string): ReadingAdapter {
    switch (extension) {
      case '.xml':
        return new XmlReadingAdapter();
      case '.csv':
        return new CsvReadingAdapter();
      default:
        throw new Error(`Unsupported file extension: ${extension}`);
    }
  }
}
