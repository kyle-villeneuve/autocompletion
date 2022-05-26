import { Trie } from './Trie';

export class AutoComplete {
  root = new Trie();

  seed = (word: string) => {
    let currentNode = this.root;

    let i = 0;

    while (i < word.length) {
      const char = word[i];
      let edge = currentNode.edges[char];

      if (!edge) {
        edge = new Trie(char);
        currentNode.edges[char] = edge;
      }

      currentNode = edge;
      i++;
    }

    currentNode.end = true;
  };

  seedMany(...words: string[]) {
    words.forEach(this.seed);
  }

  print(node = this.root, prefix = '') {
    const words: string[] = [];

    function traverse(trie: Trie, accumulation = '') {
      if (trie.end) words.push(accumulation);

      for (const edge of Object.values(trie.edges)) {
        traverse(edge, accumulation + edge.value);
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
      currentNode = currentNode.edges[char];
      if (!currentNode) return [];
      i++;
    }

    return this.print(currentNode, query);
  }
}
