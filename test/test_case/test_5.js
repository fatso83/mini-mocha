require("../..").install();

describe("main describe", () => {
    console.log("main describe");
    before(() => {
        console.log("main describe before");
    });

    beforeEach(() => {
        console.log("main describe beforeEach");
    });

    afterEach(() => {
        console.log("main describe afterEach");
    });
    after(() => {
        console.log("main describe after");
    });

    describe("inner describe 1", () => {
        before(() => {
            console.log("inner describe 1 before");
        });

        beforeEach(() => {
            console.log("inner describe 1 beforeEach");
        });

        after(() => {
            console.log("inner describe 1 after");
        });

        afterEach(() => {
            console.log("inner describe 1 afterEach");
        });

        it("it 1 from inner describe 1", () => {
            console.log("it 1 from inner describe 1");
        });

        it("it 2 from inner describe 1", () => {
            console.log("it 2 from inner describe");
        });
    });

    describe("inner describe 2", () => {
        before(() => {
            console.log("inner describe 2 before");
        });

        beforeEach(() => {
            console.log("inner describe 2 beforeEach");
        });

        after(() => {
            console.log("inner describe 2 after");
        });

        afterEach(() => {
            console.log("inner describe 2 afterEach");
        });

        it("it 1 from inner describe 2", () => {
            console.log("it 1 from inner describe 2");
        });

        it("it 2 from inner describe 2", () => {
            console.log("it 2 from inner describe 2");
        });

        describe("inner describe 2 deep describe 1", () => {
            before(() => {
                console.log("inner describe 2 deep describe 1 before");
            });

            beforeEach(() => {
                console.log("inner describe 2 deep describe 1 beforeEach");
            });

            after(() => {
                console.log("inner describe 2 deep describe 1 after");
            });

            afterEach(() => {
                console.log("inner describe 2 deep describe 1 afterEach");
            });

            it("it 1 from inner describe 2 deep describe 1", () => {
                console.log("it 1 from inner describe 2 deep describe 1");
            });

            it("it 2 from inner describe 2 deep describe 1", () => {
                console.log("it 2 from inner describe 2 deep describe 1");
            });
        });

        describe("inner describe 2 deep describe 2", () => {
            before(() => {
                console.log("inner describe 2 deep describe 2 before");
            });

            beforeEach(() => {
                console.log("inner describe 2 deep describe 2 beforeEach");
            });

            after(() => {
                console.log("inner describe 2 deep describe 2 after");
            });

            afterEach(() => {
                console.log("inner describe 2 deep describe 2 afterEach");
            });

            it("it 1 from inner describe 2 deep describe 2", () => {
                console.log("it 1 from inner describe 2 deep describe 2");
            });

            it("it 2 from inner describe 2 deep describe 2", () => {
                console.log("it 2 from inner describe 2 deep describe 2");
            });
        });
    });

    it("main describe block standalone it", () => {
        console.log("main describe block standalone it");
    });
});
