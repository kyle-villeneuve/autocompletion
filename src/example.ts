import AutoComplete from './';

const ac = new AutoComplete();

ac.seedMany(
  'cat',
  'dog',
  'car',
  'card',
  'cart',
  'camel',
  'catty',
  'catharsis',
  'cathedral',
  'cataract',
);

ac.complete('car');
