export function truncateTextByWords(text: string, wordsAmount: number): string {
  return text.split(' ').slice(0, wordsAmount).join(' ');
}

export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getPagesAmount(itemsAmount: number, pageSize: number) {
  return Math.ceil(itemsAmount / pageSize);
}

export function getSkipItemsAmount(currentPage: number, pageSize: number) {
  return (currentPage - 1) * pageSize;
}
