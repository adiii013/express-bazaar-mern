const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("./build/ProductFactory.json");

// Use the mnemonic and the Ganache URL
const mnemonic = "trial wait dilemma brief coral struggle vanish laundry aware ride doctor lens";
const ganacheUrl = "http://localhost:7545";

const provider = new HDWalletProvider(mnemonic, ganacheUrl);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: "0x" + bytecode, // Add "0x" to the bytecode
      })
      .send({
        gas: "6721975", // Adjust gas value based on your contract deployment
        from: accounts[0],
      });

    console.log("Contract deployed to", result.options.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
};

deploy();
