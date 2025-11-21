const letterPool = {
  A: 9, B: 2, C: 2, D: 4,
  E: 12, F: 2, G: 3, H: 2,
  I: 9, J: 1, K: 1, L: 4,
  M: 2, N: 6, O: 8, P: 2,
  Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1,
  Y: 2, Z: 1,
};

export const drawLetters = () => {
  let letterBank = [];
  let poolDictCopy = {...letterPool};

  while (letterBank.length < 10) {
    const usesAvailableLetters = [];

    for (const [letter, count] of Object.entries(poolDictCopy)) {
      if (count > 0) {
        usesAvailableLetters.push(letter);
      }
    }

    const randomIndex = Math.floor(Math.random() * usesAvailableLetters.length);
    const randomLetter = usesAvailableLetters[randomIndex];

    letterBank.push(randomLetter);

    poolDictCopy[randomLetter] -= 1;
  }

  return letterBank;

};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterBankCopy = [...lettersInHand];
  const upperInput = input.toUpperCase();

  for (const letter of upperInput) {
    const letterIndex = letterBankCopy.indexOf(letter);
    if (letterIndex === -1) {
      return false;
    } else {
      letterBankCopy.splice(letterIndex, 1);
    }
  }

  return true;
};

export const scoreWord = (word) => {
  const pointValue = {
    A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
    D: 2, G: 2,
    B: 3, C: 3, M: 3, P: 3,
    F: 4, H: 4, V: 4, W: 4, Y: 4,
    K: 5,
    J: 8, X: 8,
    Q: 10, Z: 10
  };

  if (!word || word.length === 0) return 0;

  let numOfPoints = 0;
  const upperWord = word.toUpperCase();

  for (const char of upperWord) {
    if (pointValue[char]) {
      numOfPoints += pointValue[char];
    }
  }

  if (upperWord.length >= 7 && upperWord.length <= 10) {
    numOfPoints += 8;
  }

  return numOfPoints;

};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
