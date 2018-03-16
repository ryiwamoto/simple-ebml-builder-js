simple-ebml-builder
====

Simple DSL for building EBML byte array (mkv/webm).

## install
```
npm install simple-ebml-builder
```

## Sample code
```TypeScript
import * as EBML from "simple-ebml-builder";

// EBML element object. The name is EBMLVersion and body is 1. The Size is generated automatically.
EBML.element(EBML.ID.EBMLVersion, EBML.number(1));

// 0x01FFFFFFFFFFFFFF is assigned as the element size for unknownSizeElement.
EBML.unknownSizeElement(EBML.ID.EBMLVersion, EBML.number(1));

// Element can have multiple elements.
EBML.element(EBML.ID.Info, [
    EBML.element(EBML.ID.TimecodeScale, EBML.number(1000000)),
    EBML.element(EBML.ID.MuxingApp, EBML.string("MuxingApp")),
    EBML.element(EBML.ID.WritingApp, EBML.string("WritingApp")),
]);

// Build single Uint8Array from element.
EBML.build(EBML.element(EBML.ID.EBMLVersion, EBML.number(1))); // => Uint8Array.of(0x42, 0x86, 0x81, 0x01)

// dumpBytes is useful for debugging.
console.log(EBML.dumpBytes(EBML.build(EBML.element(EBML.ID.EBMLVersion, EBML.number(1))))); // "0x42, 0x86, 0x81, 0x1"
```

## npm scripts
- __build__ Compile TypeScript to JavaScript file
- __test__ Run test
- __test:watch__ Watch files and run test.
- __benchmark:test__ Run benchmark
- __benchmark:update__ Run benchmark and update baseline.

## Licence
[MIT](./LICENSE)
