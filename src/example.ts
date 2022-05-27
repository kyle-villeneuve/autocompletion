import AutoComplete from './';

const ac = new AutoComplete<void>();

ac.seedMany(
  ['cat', undefined],
  ['dog', undefined],
  ['car', undefined],
  ['card', undefined],
  ['cart', undefined],
  ['camel', undefined],
  ['catty', undefined],
  ['catharsis', undefined],
  ['cathedral', undefined],
  ['cataract', undefined],
);

console.log(ac.complete('car'));
