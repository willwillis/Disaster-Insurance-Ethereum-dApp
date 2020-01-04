// uint8 public contractState;  // 1 = OK    2 = WARNING   3 = CRITICAL
// uint8 public responderState; // 1 = OK    2 = PREPPED    3 = RESPOND

const contractStateMap = {
  0: "Retainer Funded",
  1: "Retainer Funded",
  2: "Escrow Funded",
  3: "CRITICAL, DEPLOY!"
};

const responderStateMap = {
  0: "On Retainer",
  1: "On Retainer",
  2: "Preparing to Respond",
  3: "RESPONDING",
  4: "COMPLETE"
};

const thresholdMap = {
  0: "Below Threshold",
  1: "Above Threshold"
};

export const contractStateToString = theInput => {
  return contractStateMap[theInput];
};

export const responderStateToString = theInput => {
  return responderStateMap[theInput];
};

export const thresholdToString = theInput => {
  return thresholdMap[theInput];
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};
