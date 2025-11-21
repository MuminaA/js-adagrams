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
  const handSize = 10;

  while (letterBank.length < handSize) {
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
    A: 1, B: 3, C: 3, D: 2,
    E: 1, F: 4, G: 2, H: 4,
    I: 1, J: 8, K: 5, L: 1,
    M: 3, N: 1, O: 1, P: 3,
    Q: 10, R: 1, S: 1, T: 1,
    U: 1, V: 4, W: 4, X: 8,
    Y: 4, Z: 10,
  };

  let numOfPoints = 0;
  const upperWord = word.toUpperCase();
  const minLengthForBonus = 7;
  const maxLengthForBonus = 10;
  const bonusPoints = 8;

  if (!word || word.length === 0) return 0;

  for (const char of upperWord) {
    if (pointValue[char]) {
      numOfPoints += pointValue[char];
    }
  }

  if (upperWord.length >= minLengthForBonus && upperWord.length <= maxLengthForBonus) {
    numOfPoints += bonusPoints;
  }

  return numOfPoints;
};

export const highestScoreFrom = (words) => {
  let bestWord = words[0];
  let bestScore = scoreWord(bestWord);

  for (const word of words) {
    const score = scoreWord(word);
    const wordLength = word.length;
    const bestWordLength = bestWord.length;
    const maxWordLength = 10;
    const tieScore = bestScore;

    if (score > bestScore) {
      bestWord = word;
      bestScore = score;

    } else if (score === tieScore) {
      if (bestWordLength !== maxWordLength && wordLength === maxWordLength) {
        bestWord = word;
        bestScore = score;
      } else if (bestWordLength !== maxWordLength && wordLength < bestWordLength) {
        bestWord = word;
        bestScore = score;
      }
    }
  }

  return { word: bestWord, score: bestScore };
};
