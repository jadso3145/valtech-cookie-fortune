export const luckyNum = () => {
  return [
    String(Math.floor(Math.random() * 100)).padStart(2, "0"),
    String(Math.floor(Math.random() * 100)).padStart(2, "0"),
    String(Math.floor(Math.random() * 10000)).padStart(4, "0"),
  ].join("-");
};
