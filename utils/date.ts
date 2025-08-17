export const parseDate = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(6, 7);
  const day = date.slice(8, 10);

  return `${day}.${month}.${year}`;
};
