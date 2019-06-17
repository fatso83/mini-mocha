require("../..").install(true);

const assert = require("assert");

describe("main describe 1", () => {
    before(() => {});
    beforeEach(() => {});

    afterEach(() => {});
    after(() => {});

    describe("inner describe 1", () => {
        before(() => {});
        beforeEach(() => {});

        after(() => {});
        afterEach(() => {});

        it("it 1 from inner describe 1", () => {
            assert.strictEqual("1", "1");
        });

        it("it 2 from inner describe 1", () => {
            try {
                assert.strictEqual("1", "2");
            } catch (err) {
                throw new Error("not match");
            }
        });
    });

    describe("inner describe 2", () => {
        before(() => {});
        beforeEach(() => {});

        after(() => {});
        afterEach(() => {});

        it("it 1 from inner describe 2", () => {});

        it("it 2 from inner describe 2", () => {});

        describe("inner describe 2 deep describe 1", () => {
            before(() => {});
            beforeEach(() => {});

            after(() => {});
            afterEach(() => {});

            it("it 1 from inner describe 2 deep describe 1", () => {
                assert.strictEqual("1", "1");
            });

            it("it 2 from inner describe 2 deep describe 1", () => {
                try {
                    assert.strictEqual("1", "2");
                } catch (err) {
                    throw new Error("not match");
                }
            });
        });

        describe("inner describe 2 deep describe 2", () => {
            before(() => {});
            beforeEach(() => {});

            after(() => {});
            afterEach(() => {});

            it("it 1 from inner describe 2 deep describe 2", () => {
                assert.strictEqual("1", "1");
            });

            it("it 2 from inner describe 2 deep describe 2", () => {
                try {
                    assert.strictEqual("1", "2");
                } catch (err) {
                    throw new Error("not match");
                }
            });
        });
    });

    it("main describe 1 block standalone it", () => {
        assert.strictEqual("1", "1");
    });
});

describe("main describe 2", () => {
    before(() => {});
    beforeEach(() => {});

    afterEach(() => {});
    after(() => {});

    it("main describe 2 block standalone it", () => {
        assert.strictEqual("1", "1");
    });
});
