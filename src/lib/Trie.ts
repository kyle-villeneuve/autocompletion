export type Trie<T> = {
  _m?: T; // leaf metadata
  _e?: true; // whether leaf marks the end of a word
} & {
  [key in string]: Trie<T>;
};

export function trie<T>(_m: void | T): Trie<T> {
  const t: Trie<T> = {};
  if (_m) t._m = _m;
  return t;
}
