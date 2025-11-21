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
  // Implement this method for wave 2
}

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
