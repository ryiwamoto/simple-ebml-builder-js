import * as EBML from "../src/index";

suite("Ebml", () => {
    test("webm header", () => {
        EBML.build(EBML.element(EBML.ID.EBML, [
            EBML.element(EBML.ID.EBMLVersion, EBML.number(1)),
            EBML.element(EBML.ID.EBMLReadVersion, EBML.number(1)),
            EBML.element(EBML.ID.EBMLMaxIDLength, EBML.number(4)),
            EBML.element(EBML.ID.EBMLMaxSizeLength, EBML.number(8)),
            EBML.element(EBML.ID.DocType, EBML.string("webm")),
            EBML.element(EBML.ID.DocTypeVersion, EBML.number(4)),
            EBML.element(EBML.ID.DocTypeReadVersion, EBML.number(2)),
            EBML.element(EBML.ID.Segment, [
                EBML.element(EBML.ID.Info, [
                    EBML.element(EBML.ID.TimecodeScale, EBML.number(1000000)),
                    EBML.element(EBML.ID.MuxingApp, EBML.string("ttLibC")),
                    EBML.element(EBML.ID.WritingApp, EBML.string("ttLibC")),
                ]),
            ], true),
            EBML.element(EBML.ID.Tracks,
                EBML.element(EBML.ID.TrackEntry, [
                    EBML.element(EBML.ID.TrackNumber, EBML.number(2)),
                    EBML.element(EBML.ID.TrackUID, EBML.number(2)),
                    EBML.element(EBML.ID.CodecID, EBML.string("A_OPUS")),
                    EBML.element(EBML.ID.TrackType, EBML.number(2)),
                    EBML.element(EBML.ID.Audio, [
                        EBML.element(EBML.ID.Channels, EBML.number(2)),
                    ]),
                ]),
            ),
        ]));
    });
});
