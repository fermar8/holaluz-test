import Reading from '../../../domain/model/reading/Reading';

export default interface ReadingAdapter {
  run(filePath: string): Promise<Reading[]>;
}
