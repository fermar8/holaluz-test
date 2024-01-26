"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ReadingAdapterFactory_1 = __importDefault(require("./domain/factory/readingsFactory/ReadingAdapterFactory"));
const ReadingService_1 = __importDefault(require("./domain/service/readingsService/ReadingService"));
const ProcessReadingsUseCase_1 = __importDefault(require("./useCases/readings/ProcessReadingsUseCase"));
async function main() {
    try {
        const filePath = process.argv[2];
        const extension = path_1.default.extname(filePath);
        const readingAdapter = ReadingAdapterFactory_1.default.run(extension);
        const readingService = new ReadingService_1.default();
        const processReadingUseCase = new ProcessReadingsUseCase_1.default(readingAdapter, readingService);
        await processReadingUseCase.run(filePath);
    }
    catch (error) {
        console.log('error', error);
    }
}
main();
