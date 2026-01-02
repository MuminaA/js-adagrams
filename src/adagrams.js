const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const randint = (max) => Math.floor(Math.random() * max);

export const drawLetters = () => {
  const letterBank = [];
  const availableLetters = [];
  const handSize = 10;

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      availableLetters.push(letter);
    }
  }

  for (let i = 0; i < handSize; i++) {
    const randomIndex = randint(availableLetters.length);
    const randomLetter = availableLetters[randomIndex];
    letterBank.push(randomLetter);
    availableLetters.splice(randomIndex, 1);
  }

  return letterBank;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterFrequency = {};
  const upperInput = input.toUpperCase();

  for (const letter of lettersInHand) {
    letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
  }

  for (const letter of upperInput) {
    if (!letterFrequency[letter] || letterFrequency[letter] === 0) {
      return false;
    }
    letterFrequency[letter] -= 1;
  }

  return true;
};

export const scoreWord = (word) => {
  const POINT_VALUE = {
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
  const MIN_LENGTH_FOR_BONUS = 7;
  const MAX_LENGTH_FOR_BONUS = 10;
  const BONUS_POINTS = 8;

  for (const char of upperWord) {
    if (POINT_VALUE[char]) {
      numOfPoints += POINT_VALUE[char];
    }
  }

  if (upperWord.length >= MIN_LENGTH_FOR_BONUS) {
    numOfPoints += BONUS_POINTS;
  }

  return numOfPoints;
};

export const highestScoreFrom = (words) => {
  const MAX_HAND_SIZE = 10;

  const highestScore = Math.max(...words.map(word => scoreWord(word)));

  const bestScoreWords = words.filter(word => scoreWord(word) === highestScore);

  const tenLetterWords = bestScoreWords.filter(word => word.length === MAX_HAND_SIZE);

  if (tenLetterWords.length > 0) {
    return { word: tenLetterWords[0], score: highestScore };
  }

  const shortestWord = bestScoreWords.reduce((shortest, word) =>
    word.length < shortest.length ? word : shortest
  );

  return { word: shortestWord, score: highestScore };
};
