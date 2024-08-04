"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunningShoeStore = createRunningShoeStore;
function createRunningShoeStore(rawData) {
    return {
        name: name(rawData),
        streetAddress: streetAddress(rawData),
        lng: lng(rawData),
        lat: lat(rawData)
    };
}
function name(rawData) {
    return rawData.displayName.text;
}
function streetAddress(rawData) {
    return rawData.formattedAddress;
}
function lng(rawData) {
    return rawData.location.longitude;
}
function lat(rawData) {
    return rawData.location.latitude;
}
