import web3 from "./web3";

//abi of interface of factory
import factoryContract from "./build/ProductFactory.json";

//address of deployed factory contract
const address = "0xc0609c8Ec621c87384F2Bd07a7DF9A12ecd5d788";

const factory = new web3.eth.Contract(
  JSON.parse(factoryContract.interface),
  address
);

export default factory;
