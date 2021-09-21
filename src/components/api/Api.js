// const { ipfsProjectId } = require("../../../src/secrets.json");
// const { ipfsProjectSecret } = require("../../../src/secrets.json");

const { address, abi } = require("./contract.json");
const ipfsClient = require("ipfs-http-client");

// const auth =
//   "Basic " +
//   Buffer.from(ipfsProjectId + ":" + ipfsProjectSecret).toString("base64");

const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export async function uploadProposal(text) {
  const added = await ipfs.add(text, (err, ipfsHash) => {
    console.log(err, ipfsHash);
  });
  return added.path;
}

export async function retrieveProposal(proposalHash) {
  return await fetch("http://ipfs.infura.io/ipfs/" + proposalHash).then((x) =>
    x.json()
  );
}

export function getContract(web3) {
  return new web3.eth.Contract(abi, address);
}

export async function getProposalHashes(web3) {
  const contract = await getContract(web3);
  return await contract.methods.getProposalHashes().call();
}

export async function getProposalInfo(web3, ipfsHash) {
  const contract = await getContract(web3);
  return await contract.methods.getProposalInfo(ipfsHash).call();
}
export async function getAllProposals(web3) {
  const contract = await getContract(web3);
  return await contract.methods.getAllProposals().call();
}

export async function getVotesForOption(web3, ipfsHash, optionIndex) {
  const contract = await getContract(web3);
  return await contract.methods.getVotesForOption(ipfsHash, optionIndex).call();
}

export async function initialiseUser(web3, account, userAccount) {
  const contract = await getContract(web3);
  try {
    return await contract.methods
      .initialiseUser(userAccount)
      .send({ from: account });
  } catch (err) {
    console.log(`Unsuccessful init of ${userAccount}`);
  }
}

//can change anything except .create proposal
export async function createProposal(web3, account, values) {
  const ipfsHash = uploadProposal(JSON.stringify(values));
  const contract = await getContract(web3);
  try {
    return await contract.methods
      .createProposal(
        ipfsHash,
        values["numOfOptions"],
        values["min_stake"],
        values["isLossVoting"],
        values["isAllocationProposal"]
      )
      .send({ from: account });
  } catch (err) {
    console.log(err);
    console.log("Unsuccessful setting of Proposal Status");
  }
}

export async function setProposalStatus(web3, account, ipfsHash, isActive) {
  const contract = await getContract(web3);
  try {
    return await contract.methods
      .setProposalStatus(ipfsHash, isActive)
      .send({ from: account });
  } catch (err) {
    console.log("Unsuccessful setting of Proposal Status");
  }
}

export async function vote(web3, account, ipfsHash, optionIndex, stakeValue) {
  const contract = await getContract(web3);
  try {
    return await contract.methods
      .vote(ipfsHash, optionIndex, stakeValue)
      .send({ from: account });
  } catch (err) {
    console.log("Unsuccessful voting on proposal");
  }
}
