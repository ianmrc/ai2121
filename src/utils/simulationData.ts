export const generateRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateTableData = () => {
  return Array.from({ length: 5 }, (_, index) => ({
    id: `T${String(index + 1).padStart(3, '0')}`,
    trueCount: (Math.random() * 10 - 5).toFixed(1),
    decksRemaining: (Math.random() * 6 + 1).toFixed(1),
    edge: (Math.random() * 4 - 2).toFixed(2),
    status: Math.random() > 0.5 ? "ACTIVE" : "WAITING",
  }));
};

export const generateBankrollData = () => {
  const baseValue = 4000;
  return Array.from({ length: 11 }, (_, index) => ({
    month: String(index + 1).padStart(2, '0'),
    value: baseValue + generateRandomValue(-500, 1000) + (index * 500),
  }));
};