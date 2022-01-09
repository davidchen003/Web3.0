require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/3dl-IANOvZE-6zHqH3nt2nuHoSK-HqQV",
      accounts: [
        "b9e0e66a482eb6fdfc0435a7717c92b628c8caa902779732a1f826f1d1996e01",
      ],
    },
  },
};
