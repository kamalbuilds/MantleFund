export const daysLeft = (deadline: Date) => {
  const difference = deadline.getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = async (
  url: string,
  callback: (isImage: boolean) => Promise<void>
) => {
  const img = new Image();
  img.src = url;

  if (img.complete) await callback(true);

  img.onload = async () => await callback(true);
  img.onerror = async () => await callback(false);
};


