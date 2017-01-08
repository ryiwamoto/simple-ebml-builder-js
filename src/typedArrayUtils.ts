import * as memoize from "lodash.memoize";

export const numberToByteArray = (num: number, byteLength: number = getNumberByteLength(num)): Uint8Array => {
    if (byteLength > 4) {
        throw new Error("Bitwise operators support only signed-32bit.");
    }
    const byteArray = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
        byteArray[byteLength - (i + 1)] = (num >> 8 * i) & 0xFF;
    }
    return byteArray;
};

export const stringToByteArray = memoize((str: string): Uint8Array => {
    return Uint8Array.from(Array.from(str).map(_ => _.codePointAt(0) !));
});

export function getNumberByteLength(num: number): number {
    if (num <= 0xFF) {
        return 1;
    } else if (num <= 0xFFFF) {
        return 2;
    } else if (num <= 0xFFFFFF) {
        return 3;
    } else if (num <= 0xFFFFFFFF) {
        return 4;
    } else {
        throw new Error("number must be 32bit");
    }
}

export const int16Bit = memoize((num: number): Uint8Array => {
    const ab = new ArrayBuffer(2);
    new DataView(ab).setInt16(0, num);
    return new Uint8Array(ab);
});

export const float32bit = memoize((num: number): Uint8Array => {
    const ab = new ArrayBuffer(4);
    new DataView(ab).setFloat32(0, num);
    return new Uint8Array(ab);
});

export const dumpBytes = (b: ArrayBuffer): string => {
    return Array.from(new Uint8Array(b)).map(_ => `0x${_.toString(16)}`).join(", ");
};
