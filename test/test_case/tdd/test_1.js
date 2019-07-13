require("../../../").install();

test("standalone", () => {
    console.log("standalone");
});

test("standalone async", async () => {
    const y = await Promise.resolve("standalone");
    console.log("async standalone");
});
