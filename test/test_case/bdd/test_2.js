require("../../..").install();

describe("describe 1", function() {
    before(function() {
        console.log("==> describe 1 before");
    });

    after(function() {
        console.log("==> describe 1 after");
    });

    beforeEach(function() {
        console.log("==> describe 1 beforeEach");
    });

    afterEach(() => {
        console.log("==> describe 1 afterEach");
    });

    it("main 1 it 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 1 it 1 --> ", y);
    });

    it("main 1 it 2", function() {
        console.log("==> main 1 it 2");
    });
});

describe("describe 2", function() {
    before(function() {
        console.log("==> describe 2 before");
    });

    after(function() {
        console.log("==> describe 2 after");
    });

    beforeEach(function() {
        console.log("==> describe 2 beforeEach");
    });

    afterEach(() => {
        console.log("==> describe 2 afterEach");
    });

    it("main 2 it 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 2 it 2 --> ", y);
    });

    it("main 2 it 2", function() {
        console.log("==> main 2 it 2");
    });
});

describe("describe 3", function() {
    before(function() {
        console.log("==> describe 3 before");
    });

    after(function() {
        console.log("==> describe 3 after");
    });

    beforeEach(function() {
        console.log("==> describe 3 beforeEach");
    });

    afterEach(() => {
        console.log("==> describe 3 afterEach");
    });

    it("main 3 it 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 3 it 1 --> ", y);
    });

    it("main 3 it 2", function() {
        console.log("==> main 3 it 2");
        throw new Error("failed");
    });
});

describe("describe 4", function() {
    before(function() {
        console.log("==> describe 4 before");
    });

    after(async function() {
        const s = await Promise.resolve("4");
        console.log("==> describe 4 after --> ", s);
    });

    beforeEach(function() {
        console.log("==> describe 4 beforeEach");
    });

    afterEach(() => {
        console.log("==> describe 4 afterEach");
    });

    it("main 4 it 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 4 it 1 --> ", y);
    });

    it("main 4 it 2", function() {
        console.log("==> main 4 it 2");
        throw new Error("failed");
    });
});
