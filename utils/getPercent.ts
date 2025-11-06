export const getPercent = (count: number, all: number) => {
  const percent: number = (count / all) * 100;
  return `${percent.toFixed(0)}%`;
};
