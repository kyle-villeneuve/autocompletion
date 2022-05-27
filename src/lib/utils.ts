export function sanitize(chars: string) {
  return chars
    .replace(/[^ a-zA-Z0-9\.]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}
