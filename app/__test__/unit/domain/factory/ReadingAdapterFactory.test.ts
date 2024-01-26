import ReadingAdapterFactory from '../../../../domain/factory/readingsFactory/ReadingAdapterFactory';
import CsvReadingAdapter from '../../../../infrastructure/adapters/readings/CsvReadingAdapter';
import XmlReadingAdapter from '../../../../infrastructure/adapters/readings/XmlReadingAdapter';

describe('ReadingAdapterFactory', () => {
  it('should return XmlReadingAdapter for .xml extension', () => {
    const adapter = ReadingAdapterFactory.run('.xml');
    expect(adapter).toBeInstanceOf(XmlReadingAdapter);
  });

  it('should return CsvReadingAdapter for .csv extension', () => {
    const adapter = ReadingAdapterFactory.run('.csv');
    expect(adapter).toBeInstanceOf(CsvReadingAdapter);
  });

  it('should throw error for unsupported extension', () => {
    expect(() => ReadingAdapterFactory.run('.unsupported')).toThrow(
      `Unsupported file extension: .unsupported`,
    );
  });
});
