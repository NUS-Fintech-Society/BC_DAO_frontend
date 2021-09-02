const { address, abi } = require("./contract.json");

export function getContract(web3) {
  return new web3.eth.Contract(abi, address);
}

export async function getProposalHashes(contract) {
  console.log(contract);
  return await contract.methods.getProposalHashes().call();
}
