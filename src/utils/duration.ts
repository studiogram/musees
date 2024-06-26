export const formatTime = (secondsTotal: number) => {
  const hours = Math.floor(secondsTotal / 3600);
  const minutes = Math.floor((secondsTotal - hours * 3600) / 60);
  const seconds = secondsTotal - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
};
