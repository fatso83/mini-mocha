# mini-mocha
> A absolutely minimal emulation of Mocha for demos

## Why
Makes it easier to [demo bugs on RunKit](https://runkit.com/fatso83/sinon-test-issue-101) when I don't need to make it from scratch all the time.

## Typical usage

```javascript
require('@fatso83/mini-mocha');

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
before
before each
issue #101 ES5 version: normal sync test: ✔️
after each
before each
issue #101 ES5 version: failing test: ❌. My error
after each
This operation is unsupported: async/callback testing
after
```

## Known limitations
- No async support
- No Promsie support
- No support for Mocha internals

## Pull requests welcome :)
