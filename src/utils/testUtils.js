export const mockFirebaseCollection = ({ docs = [] } = {}) => {
  const onSnapshot = (lambda) => {
    const snapshot = docs.map(({ itemName, id, timeFrame, lastPurchased }) => ({
      data: () => ({ itemName, timeFrame, lastPurchased }),
      id,
    }));
    lambda(snapshot);
    return jest.fn();
  };
  return jest.fn(() => ({
    onSnapshot,
  }));
};
