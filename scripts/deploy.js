const hre = require("hardhat");

const tokenName = process.env.TOKEN_NAME;
const tokenSymbol = process.env.TOKEN_SYMBOL;
const to = process.env.TO_ADDRESS;
const blockCooldownAmount = process.env.BLOCK_AMOUNT;

async function main() {
  const Token = await hre.ethers.getContractFactory("MMX");
  const nft = await Token.deploy(
    tokenName,
    tokenSymbol,
    to,
    blockCooldownAmount
  );
  await nft.deployed();

  console.log("ERC20: ", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
