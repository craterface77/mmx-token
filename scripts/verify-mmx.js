const hre = require("hardhat");

const tokenName = process.env.TOKEN_NAME;
const tokenSymbol = process.env.TOKEN_SYMBOL;
const to = process.env.TO_ADDRESS;
const blockCooldownAmount = process.env.BLOCK_AMOUNT;

async function main() {
  await hre.run("verify:verify", {
    address: process.env.MMX_ADDRESS,
    constructorArguments: [tokenName, tokenSymbol, to, blockCooldownAmount],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
