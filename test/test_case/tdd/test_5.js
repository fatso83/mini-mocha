require("../../..").install();

suite("main suite", () => {
    console.log("main suite");
    setup(() => {
        console.log("main suite setup");
    });

    suiteSetup(() => {
        console.log("main suite suiteSetup");
    });

    suiteTeardown(() => {
        console.log("main suite suiteTeardown");
    });
    teardown(() => {
        console.log("main suite teardown");
    });

    suite("inner suite 1", () => {
        setup(() => {
            console.log("inner suite 1 setup");
        });

        suiteSetup(() => {
            console.log("inner suite 1 suiteSetup");
        });

        teardown(() => {
            console.log("inner suite 1 teardown");
        });

        suiteTeardown(() => {
            console.log("inner suite 1 suiteTeardown");
        });

        test("test 1 from inner suite 1", () => {
            console.log("test 1 from inner suite 1");
        });

        test("test 2 from inner suite 1", () => {
            console.log("test 2 from inner suite");
        });
    });

    suite("inner suite 2", () => {
        setup(() => {
            console.log("inner suite 2 setup");
        });

        suiteSetup(() => {
            console.log("inner suite 2 suiteSetup");
        });

        teardown(() => {
            console.log("inner suite 2 teardown");
        });

        suiteTeardown(() => {
            console.log("inner suite 2 suiteTeardown");
        });

        test("test 1 from inner suite 2", () => {
            console.log("test 1 from inner suite 2");
        });

        test("test 2 from inner suite 2", () => {
            console.log("test 2 from inner suite 2");
        });

        suite("inner suite 2 deep suite 1", () => {
            setup(() => {
                console.log("inner suite 2 deep suite 1 setup");
            });

            suiteSetup(() => {
                console.log("inner suite 2 deep suite 1 suiteSetup");
            });

            teardown(() => {
                console.log("inner suite 2 deep suite 1 teardown");
            });

            suiteTeardown(() => {
                console.log("inner suite 2 deep suite 1 suiteTeardown");
            });

            test("test 1 from inner suite 2 deep suite 1", () => {
                console.log("test 1 from inner suite 2 deep suite 1");
            });

            test("test 2 from inner suite 2 deep suite 1", () => {
                console.log("test 2 from inner suite 2 deep suite 1");
            });
        });

        suite("inner suite 2 deep suite 2", () => {
            setup(() => {
                console.log("inner suite 2 deep suite 2 setup");
            });

            suiteSetup(() => {
                console.log("inner suite 2 deep suite 2 suiteSetup");
            });

            teardown(() => {
                console.log("inner suite 2 deep suite 2 teardown");
            });

            suiteTeardown(() => {
                console.log("inner suite 2 deep suite 2 suiteTeardown");
            });

            test("test 1 from inner suite 2 deep suite 2", () => {
                console.log("test 1 from inner suite 2 deep suite 2");
            });

            test("test 2 from inner suite 2 deep suite 2", () => {
                console.log("test 2 from inner suite 2 deep suite 2");
            });
        });
    });

    test("main suite block standalone test", () => {
        console.log("main suite block standalone test");
    });
});
