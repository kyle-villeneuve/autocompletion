import { Trie, trie } from './Trie';
import { sanitize } from './utils';

export class AutoComplete<T = never> {
  root = trie<T>();

  seed = (word: string, meta: T) => {
    let currentNode = this.root;
    const sanitized = sanitize(word);

    let i = 0;

    while (i < sanitized.length) {
      const char = sanitized[i];
      let edge = currentNode[char];

      if (!edge) {
        edge = trie();
        currentNode[char] = edge;
      }

      currentNode = edge;
      i++;
    }

    if (meta) currentNode._m = meta;
    currentNode._e = true;
  };

  seedMany(...words: [string, T][]) {
    words.forEach(([word, meta]) => this.seed(word, meta));
  }

  seedProse(str: string, meta: T) {
    str.split(/\.|\?|!/g).forEach((sentence) => {
      sentence.replace(/\s+/g, (_space, index) => {
        const partial = sentence.slice(index).trim();
        partial && this.seed(partial, meta);
        return '';
      });
    });
  }

  print(node = this.root, prefix = '') {
    const words: [string, T?][] = [];

    function traverse({ _e, _m, ...leafs }: Trie<T>, accumulation = '') {
      if (_e) words.push([accumulation, _m]);

      for (const [key, edge] of Object.entries(leafs)) {
        traverse(edge, accumulation + key);
      }
    }

    traverse(node, prefix);

    return words;
  }

  complete(query: string) {
    let i = 0;
    let currentNode = this.root;

    while (i < query.length) {
      const char = query[i];
      currentNode = currentNode[char];
      if (!currentNode) return [];
      i++;
    }

    return this.print(currentNode, query);
  }
}
