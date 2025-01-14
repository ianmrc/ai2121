interface BlackjackState {
  bankroll: number;
  totalBets: number;
  handsWon: number;
  totalHands: number;
  tokensBurned: number;
  profitLoss: number;
}

let globalState: BlackjackState = {
  bankroll: 141839,
  totalBets: 2345,
  handsWon: 1512,
  totalHands: 2345,
  tokensBurned: 2100,
  profitLoss: 1234
};

const calculateEdge = (trueCount: number): number => {
  // Base edge is -0.5% for perfect basic strategy
  const baseEdge = -0.5;
  // Each true count point adds approximately 0.5% advantage
  return baseEdge + (trueCount * 0.5);
};

const calculateWinProbability = (playerTotal: number, dealerCard: string, trueCount: number): number => {
  // Base probabilities adjusted by true count and player total
  const baseProbability = 42; // Base 42% win probability
  const trueCountEffect = trueCount * 0.5;
  const playerTotalEffect = (playerTotal >= 17) ? 5 : 0;
  return Math.min(Math.max(baseProbability + trueCountEffect + playerTotalEffect, 35), 65);
};

const calculateBetSize = (trueCount: number, baseUnit: number = 100): number => {
  if (trueCount <= 1) return baseUnit;
  return baseUnit * Math.pow(1.5, trueCount - 1);
};

const generatePlayerHand = (): string => {
  const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const card1 = cards[Math.floor(Math.random() * cards.length)];
  const card2 = cards[Math.floor(Math.random() * cards.length)];
  return `${card1},${card2}`;
};

export const generateHandStats = () => {
  const trueCount = Number((Math.random() * 6 - 3).toFixed(1));
  const edge = calculateEdge(trueCount);
  const handPlayed = generatePlayerHand();
  const dealerCard = ['A', '10', '7', '4'][Math.floor(Math.random() * 4)];
  const betSize = calculateBetSize(trueCount);
  const winProbability = calculateWinProbability(
    Math.min(21, Number(handPlayed.split(',')[0]) + Number(handPlayed.split(',')[1])),
    dealerCard,
    trueCount
  );
  const expectedProfit = (betSize * (winProbability / 100 - (1 - winProbability / 100)));
  const variance = Math.sqrt(betSize * winProbability * (1 - winProbability / 100));

  return Array.from({ length: 5 }, (_, i) => ({
    handNumber: globalState.totalHands + i + 1,
    timestamp: new Date().toLocaleTimeString(),
    tableId: `T${Math.floor(Math.random() * 100)}`,
    action: ["Hit", "Stand", "Double", "Split"][Math.floor(Math.random() * 4)],
    handPlayed,
    dealersCard: dealerCard,
    trueCount: trueCount.toFixed(1),
    edge: edge.toFixed(2) + "%",
    betSize: `$${betSize.toFixed(0)}`,
    winProbability: winProbability.toFixed(1) + "%",
    expectedProfit: `$${expectedProfit.toFixed(2)}`,
    variance: variance.toFixed(3)
  }));
};

export const updateGlobalState = () => {
  // Simulate changes in global state
  const profitChange = (Math.random() * 200 - 100);
  globalState = {
    ...globalState,
    bankroll: Math.max(100000, globalState.bankroll + profitChange),
    totalBets: globalState.totalBets + 5,
    handsWon: globalState.handsWon + (profitChange > 0 ? 3 : 2),
    totalHands: globalState.totalHands + 5,
    tokensBurned: Math.floor(globalState.tokensBurned + Math.abs(profitChange * 0.1)),
    profitLoss: globalState.profitLoss + profitChange
  };
  return globalState;
};

export const generateBankrollData = () => {
  const state = updateGlobalState();
  const baseValue = state.bankroll;
  return Array.from({ length: 11 }, (_, index) => ({
    month: String(index + 1).padStart(2, '0'),
    value: Math.floor(baseValue + (index * 500) + (Math.random() * 1000 - 500))
  }));
};

export const generateTableData = () => {
  return Array.from({ length: 5 }, () => {
    const trueCount = Number((Math.random() * 6 - 3).toFixed(1));
    return {
      id: `T${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
      trueCount: trueCount.toFixed(1),
      decksRemaining: (Math.random() * 6 + 1).toFixed(1),
      edge: calculateEdge(trueCount).toFixed(2),
      status: Math.random() > 0.5 ? "ACTIVE" : "WAITING"
    };
  });
};

export const generateRandomValue = (min: number, max: number): number => {
  const state = updateGlobalState();
  // Use global state to influence the random values
  const variance = (max - min) * 0.1;
  const baseValue = (state.profitLoss > 0) ? 
    (max - min) * 0.7 + min : 
    (max - min) * 0.3 + min;
  return Math.floor(baseValue + (Math.random() * variance * 2 - variance));
};