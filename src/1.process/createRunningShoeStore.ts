export function createRunningShoeStore(rawData: any) {
    return {
        name: name(rawData),
        streetAddress: streetAddress(rawData),
        lng: lng(rawData),
        lat: lat(rawData)
    }
}

function name(rawData: any) {
    return rawData.displayName.text;
}

function streetAddress(rawData: any) {
    return rawData.formattedAddress;
}

function lng(rawData: any) {
    return rawData.location.longitude;
}

function lat(rawData: any) {
    return rawData.location.latitude;
}
