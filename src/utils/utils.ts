export function truncateTextByWords(text: string, wordsAmount: number): string {
  return text.split(' ').slice(0, wordsAmount).join(' ');
}
