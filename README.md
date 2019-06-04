# mini-mocha
> An absolutely minimal emulation of Mocha for demos.

## Why
This was hacked together very quickly for demo purposes, making it possible to verify bugs on the Sinon issue tracker
without having access to a development environment. Having an API emulation of Mocha makes it easier to [demo bugs on RunKit](https://runkit.com/fatso83/sinon-test-issue-101) when I see a verification test using Mocha or Jasmine, as I can just copy-paste the test into RunKit, add `require('@fatso83/mini-mocha').install()` at the top and it will run!

## Typical usage

```javascript
require('@fatso83/mini-mocha').install();

describe("issue #101 ES5 version", function() {
    it("shows a normal sync test", function() {
        // passes
    });

    it("will fail", function() {
        throw new Error("My error");
    });

    it("shows a normal async test using callbacks", function(done) {
        setTimeout(() => {
            done();
        });
    });

    it("will fail async", function(done) {
        setTimeout(() => {
            done(new Error("My error"));
        });
    });
});
```

Results in this being printed
```
$ node demo.js

issue #101 ES5 version
✔️  shows a normal sync test
❌ will fail (Failed with: "My error")
✔️  shows a normal async test using callbacks
❌ will fail async (Failed with: "My error")

async/await (aka Promises) feature
✔️  should pass as expected
❌ should fail (Failed with: "Some wrong type")

```

## Known limitations
There are bits and pieces missing from the Mocha API, but it fulfills all the basic requirements.

- No support for Mocha internals like `this.title`, `this.fullTitle()`, etc.

## Pull requests welcome :)
If you want to contribute, here are some tips:

- `npm run update-snapshots` will update the snapshots used for testing the output
