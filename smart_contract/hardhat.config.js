require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = import.meta.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/3dl-IANOvZE-6zHqH3nt2nuHoSK-HqQV",
      accounts: [PRIVATE_KEY],
    },
  },
};
