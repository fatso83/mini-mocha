require("../../..").install(true);

const assert = require("assert");

suite("main suite 1", () => {
    setup(() => {});
    suiteSetup(() => {});

    suiteTeardown(() => {});
    teardown(() => {});

    suite("inner suite 1", () => {
        setup(() => {});
        suiteSetup(() => {});

        teardown(() => {});
        suiteTeardown(() => {});

        test("test 1 from inner suite 1", () => {
            assert.strictEqual("1", "1");
        });

        test("test 2 from inner suite 1", () => {
            try {
                assert.strictEqual("1", "2");
            } catch (err) {
                throw new Error("not match");
            }
        });
    });

    suite("inner suite 2", () => {
        setup(() => {});
        suiteSetup(() => {});

        teardown(() => {});
        suiteTeardown(() => {});

        test("test 1 from inner suite 2", () => {});

        test("test 2 from inner suite 2", () => {});

        suite("inner suite 2 deep suite 1", () => {
            setup(() => {});
            suiteSetup(() => {});

            teardown(() => {});
            suiteTeardown(() => {});

            test("test 1 from inner suite 2 deep suite 1", () => {
                assert.strictEqual("1", "1");
            });

            test("test 2 from inner suite 2 deep suite 1", () => {
                try {
                    assert.strictEqual("1", "2");
                } catch (err) {
                    throw new Error("not match");
                }
            });
        });

        suite("inner suite 2 deep suite 2", () => {
            setup(() => {});
            suiteSetup(() => {});

            teardown(() => {});
            suiteTeardown(() => {});

            test("test 1 from inner suite 2 deep suite 2", () => {
                assert.strictEqual("1", "1");
            });

            test("test 2 from inner suite 2 deep suite 2", () => {
                try {
                    assert.strictEqual("1", "2");
                } catch (err) {
                    throw new Error("not match");
                }
            });
        });
    });

    test("main suite 1 block standalone test", () => {
        assert.strictEqual("1", "1");
    });
});

suite("main suite 2", () => {
    setup(() => {});
    suiteSetup(() => {});

    suiteTeardown(() => {});
    teardown(() => {});

    test("main suite 2 block standalone test", () => {
        assert.strictEqual("1", "1");
    });
});
