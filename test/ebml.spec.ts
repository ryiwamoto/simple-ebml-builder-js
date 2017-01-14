import * as assert from "power-assert";
import * as EBML from "../src/index";

describe("EBML", () => {
    function bytesToArray(byte: Uint8Array): string[] {
        return Array.from(byte).map(_ => `0x${_.toString(16)}`);
    }

    function assertBytes(a: Uint8Array, b: Uint8Array) {
        const result = bytesToArray(a);
        const expected = bytesToArray(b);
        assert.deepEqual(result, expected);
    }

    it("Single byte child", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const result = EBML.build(EBML.element(id, EBML.bytes(Uint8Array.of(0x11, 0x22))));
        const expected = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3, 0x82, 0x11, 0x22);
        assertBytes(result, expected);
    });

    it("Single number number", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const result = EBML.build(EBML.element(id, EBML.number(10)));
        const expected = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3, 0x81, 0xa);
        assertBytes(result, expected);
    });

    it("Single vint encoded number", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const result = EBML.build(EBML.element(id, EBML.vintEncodedNumber(10)));
        const expected = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3, 0x81, 0x8a);
        assertBytes(result, expected);
    });

    it("Single string", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const result = EBML.build(EBML.element(id, EBML.string("test")));
        const expected = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3, 0x84, 0x74, 0x65, 0x73, 0x74);
        assertBytes(result, expected);
    });

    it("Multiple value children", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const result = EBML.build(EBML.element(id, [EBML.number(0x01), EBML.number(0x02)]));
        const expected = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3, 0x82, 0x01, 0x02);
        assertBytes(result, expected);
    });

    it("Multiple element children", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const id2 = Uint8Array.of(0xBB, 0xAA);
        const result = EBML.build(
            EBML.element(id, [
                EBML.number(0x01),
                EBML.element(id2, [
                    EBML.number(0x02),
                    EBML.number(0x03),
                ]),
            ]),
        );
        const expected = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3, 0x86, 0x01, 0xBB, 0xAA, 0x82, 0x02, 0x03);
        assertBytes(result, expected);
    });

    it("Size of the Element is unknown", () => {
        const id = Uint8Array.of(0x1A, 0x45, 0xDF, 0xA3);
        const result = EBML.build(EBML.unknownSizeElement(id, [EBML.number(0x01)]));
        const expected = Uint8Array.of(
            0x1A, 0x45, 0xDF, 0xA3, 0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x01,
        );
        assertBytes(result, expected);
    });
});
