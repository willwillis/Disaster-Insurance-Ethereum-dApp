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
  false: "Below Threshold",
  true: "Above Threshold"
};

const thresholdIndicatorMap = {
  false: 0.25,
  true: 0.75
};

const contractStateIndicatorMap = {
  1: 0.1,
  2: 0.5,
  3: 0.8,
  4: 1
};

const networkMap = {
  0: "Olympic, Ethereum public pre-release PoW testnet",
  1: "Mainnet",
  // 1: "Frontier, Homestead, Metropolis, the Ethereum public PoW main network",
  // 1: "Classic, the (un)forked public Ethereum Classic PoW main network, chain ID 61",
  // 1: "Expanse, an alternative Ethereum implementation, chain ID 2",
  2: "Morden Classic, the public Ethereum Classic PoW testnet",
  3: "Ropsten, the public cross-client Ethereum PoW testnet",
  4: "Rinkeby, the public Geth-only PoA testnet",
  5: "Goerli, the public cross-client PoA testnet",
  6: "Kotti Classic, the public cross-client PoA testnet for Classic",
  8: "Ubiq, the public Gubiq main network with flux difficulty chain ID 8",
  10: "Quorum, the JP Morgan network",
  42: "Kovan, the public Parity-only PoA testnet",
  60: "GoChain, the GoChain networks mainnet",
  77: "Sokol, the public POA Network testnet",
  99: "Core, the public POA Network main network",
  100: "xDai, the public MakerDAO/POA Network main network",
  31337: "GoChain testnet, the GoChain networks public testnet",
  401697: "Tobalaba, the public Energy Web Foundation testnet",
  7762959: "Musicoin, the music blockchain",
  61717561: "Aquachain, ASIC resistant chain"
};

export const networkIDToString = theInput => {
  return networkMap[theInput];
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

export const thresholdToValue = theInput => {
  return thresholdIndicatorMap[theInput];
};

export const contractToValue = theInput => {
  return contractStateIndicatorMap[theInput];
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};
