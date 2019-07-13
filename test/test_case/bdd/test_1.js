require('../../../').install();

it('standalone', () => {
  console.log('standalone');
});

it('standalone async', async () => {
  const y = await Promise.resolve('standalone');
  console.log('async standalone');
});
