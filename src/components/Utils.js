// uint8 public contractState;  // 1 = OK    2 = WARNING   3 = CRITICAL
// uint8 public responderState; // 1 = OK    2 = PREPPED    3 = RESPOND

const contractStateMap = {
  0: "Escrow Funded",
  1: "Escrow Funded",
  2: "WARNING",
  3: "CRITICAL, DEPLOY!"
};

const responderStateMap = {
  0: "On Retainer",
  1: "On Retainer",
  2: "PREPARED",
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
