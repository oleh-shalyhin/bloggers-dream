export function truncateTextByWords(text: string, wordsAmount: number): string {
  return text.split(' ').slice(0, wordsAmount).join(' ');
}

export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
