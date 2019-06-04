# mini-mocha
> An absolutely minimal emulation of Mocha for demos.

## Why
This was hacked together very quickly for demo purposes, making it possible to verify bugs on the Sinon issue tracker 
without having access to a development environment. Having an API emulation of Mocha makes it easier to [demo bugs on RunKit](https://runkit.com/fatso83/sinon-test-issue-101) when I see a verification test using Mocha or Jasmine, as I can just copy-paste the test into RunKit, add `require('@fatso83/mini-mocha').install()` at the top and it will run!

## Typical usage

```javascript
require('@fatso83/mini-mocha').install();

describe("issue #101 ES5 version", function() {
    it("normal sync test", function() {
        // passes
    });

    it("failing test", function() {
        throw new Error("My error");
    });
});
```

Results in this being printed
```
issue #101 ES5 version: normal sync test: ✔️
issue #101 ES5 version: failing test: ❌. My error
```

## Known limitations
There are bits and pieces missing from the Mocha API, but it fulfills all the basic requirements.

- No support for Mocha internals like `this.title`, `this.fullTitle()`, etc.

## Pull requests welcome :)
