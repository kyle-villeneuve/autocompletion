export class Trie {
  end: boolean = false;
  edges: Record<string, Trie> = {};
  value: string | void;

  constructor(value: string | void) {
    this.value = value;
  }
}
