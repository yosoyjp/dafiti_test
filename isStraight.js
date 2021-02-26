const replaceInArray = (array, forReplace, toValue) =>
  array.map((item) => (item === forReplace ? toValue : item));

const deleteDuplicates = (array) => [...new Set(array)];

const consecutive = (array, consecutiveCount, index) => {
  return consecutiveCount !== 5 && array[index]
    ? consecutive(
        array,
        array[index] + 1 === array[index + 1] ? consecutiveCount + 1 : 1,
        index + 1
      )
    : consecutiveCount;
};

const isStraight = (cards) => {
  const realCards = deleteDuplicates(replaceInArray(cards, 14, 1));
  const orderedCards = realCards.sort((a, b) => a - b);
  return consecutive(orderedCards, 1, 0) === 5;
};

const result = isStraight([14, 5, 4, 2, 3]);
