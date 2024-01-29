"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class XmlParseError extends Error {
    constructor(message) {
        super(message || 'Failed to parse XML file');
        this.name = 'XmlParseError';
    }
}
exports.default = XmlParseError;
