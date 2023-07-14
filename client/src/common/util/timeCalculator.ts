export const calculateTimeDifference = (time: string) => {
  const currentTime: Date = new Date();
  const sentTime: Date = new Date(time);
  const difference: number = currentTime.getTime() - sentTime.getTime();

  const secondDiff: number = Math.floor(difference / 1000);
  const minuteDiff: number = Math.floor(difference / (1000 * 60));
  const hourDiff: number = Math.floor(difference / (1000 * 60 * 60));
  const dayDiff: number = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (secondDiff < 60) {
    return `${secondDiff}초 전`;
  }

  if (minuteDiff < 60) {
    return `${minuteDiff}분 전`;
  }

  if (hourDiff < 24) {
    return `${hourDiff}시간 전`;
  }

  if (dayDiff < 7) {
    return `${dayDiff}일 전`;
  }

  return `${sentTime.getFullYear()}-${
    sentTime.getMonth() + 1
  }-${sentTime.getDate()}`;
};
