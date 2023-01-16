export const readableDuration = (duration: number) => {
  if (duration === undefined) {
    return "Unkown Duration";
  }
  const actualSeconds = duration / 1000;
  let minutes = Math.floor(actualSeconds / 60);
  if (minutes < 1) {
    const readableSeconds = Math.floor(actualSeconds * 10) / 10;
    return `${readableSeconds}s`;
  }
  let seconds = Math.floor((actualSeconds % 60) * 10) / 10;
  let secondString = `${seconds}`;
  console.log({ seconds, actualSeconds });
  while (secondString.length < 2) {
    secondString = `0${secondString}`;
  }
  return `${minutes}:${secondString}`;
};
