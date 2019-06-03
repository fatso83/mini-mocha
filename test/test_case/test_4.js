require('../../').install();

describe('describe test with done', function() {
  before(function() {
    console.log('==> describe test with done before');
  });

  after(function() {
    console.log('==> describe test with done after');
  });

  beforeEach(function() {
    console.log('==> describe test with done beforeEach');
  });

  afterEach(() => {
    console.log('==> describe test with done afterEach');
  });

  it('main with done it 1', function() {
    console.log('==> main with done it 2');
  });

  it('main with done it 2 - async', async function() {
    const msg = await Promise.resolve('==> main with done it 2 - async');
    console.log(msg);
  });

  it('main with done it 3 - error object as an error', function(done) {
    done(new Error('done error'));
  });

  it('main with done it 4 - string as an error', function(done) {
    done('error message');
  });

  it('main with done it 4 - no error', function(done) {
    done();
  });
});
