"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
class CsvReadingAdapter {
    async run(filePath) {
        const formattedReadings = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                const formattedReading = {
                    clientID: row['client'],
                    period: row['period'],
                    reading: Number(row['reading'])
                };
                formattedReadings.push(formattedReading);
            })
                .on('end', () => {
                resolve(formattedReadings);
            })
                .on('error', (err) => {
                reject(err);
            });
        });
    }
}
exports.default = CsvReadingAdapter;
