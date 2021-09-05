const { address, abi } = require("./contract.json");

export function getContract(web3) {
  return new web3.eth.Contract(abi, address);
}

export async function getProposalHashes(contract) {
  console.log(contract);
  return await contract.methods.getProposalHashes().call();
}

export async function getProposalInfo(contract, ipfsHash) {
  return await contract.methods.getProposalInfo(ipfsHash).call();
}

export async function getAllProposals(contract) {
  return await contract.methods.getAllProposals().call();
}

export async function getVotesForOption(contract, ipfsHash, optionIndex) {
  return await contract.methods.getVotesForOption(ipfsHash, optionIndex).call();
}

export async function initialiseUser(contract, account, userAccount) {
  try {
    return await contract.methods
      .initialiseUser(userAccount)
      .send({ from: account });
  } catch (err) {
    console.log(`Unsuccessful init of ${userAccount}`);
  }
}

export async function createProposal(
  contract,
  account,
  ipfsHash,
  numOfOptions,
  minStakeValue,
  isLossVoting,
  isAllocationProposal
) {
  console.log(contract);
  //push proposal to ipfs
  try {
    return await contract.methods
      .createProposal(
        ipfsHash,
        numOfOptions,
        minStakeValue,
        isLossVoting,
        isAllocationProposal
      )
      .send({ from: account });
  } catch (err) {
    console.log("Unsuccessful setting of Proposal Status");
  }
}

export async function setProposalStatus(contract, account, ipfsHash, isActive) {
  try {
    return await contract.methods
      .setProposalStatus(ipfsHash, isActive)
      .send({ from: account });
  } catch (err) {
    console.log("Unsuccessful setting of Proposal Status");
  }
}

export async function vote(
  contract,
  account,
  ipfsHash,
  optionIndex,
  stakeValue
) {
  try {
    return await contract.methods
      .vote(ipfsHash, optionIndex, stakeValue)
      .send({ from: account });
  } catch (err) {
    console.log("Unsuccessful voting on proposal");
  }
}
