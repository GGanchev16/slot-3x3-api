interface PlayParams {
  bet: number;
}

const symbols = [1, 2, 3, 4, 5];

function randomSpin(): number[][] {
  const matrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    const row: number[] = [];
    for (let j = 0; j < 3; j++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      row.push(randomSymbol);
    }
    matrix.push(row);
  }
  return matrix;
}

function calculateWinnings(matrix: number[][], bet: number): number {
  let winnings = 0;

  for (let i = 0; i < 3; i++) {
    if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
      winnings += bet * 5;
    }
  }

  return winnings;
}

export const play = async ({ bet }: PlayParams) => {
  const matrix = randomSpin();

  const winnings = calculateWinnings(matrix, bet);

  return {
    matrix,
    winnings,
  };
};

interface SimParams {
  count: number;
  bet: number;
}

export const sim = async ({ count, bet }: SimParams) => {
  let result = { totalWinnings: 0, netResult: 0 };

  for (let i = 0; i < count; i++) {
    const { winnings } = await play({ bet });
    result.totalWinnings += winnings;
  }

  result.netResult = result.totalWinnings - count * bet;

  return result;
};
