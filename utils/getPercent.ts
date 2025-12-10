export const getPercent = (count: number, all: number) => {
  const percent: number = (count / all) * 100;
  console.log('count: ', count);
  console.log('all: ', all);
  console.log('count / all: ', count / all);
  console.log('count / all * 100: ', (count / all) * 100);
  return `${percent.toFixed(0)}%`;
};
