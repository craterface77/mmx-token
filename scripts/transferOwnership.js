require("@nomicfoundation/hardhat-toolbox");

/*
  Command line example:
    npx hardhat transferOwnership --newOwner 0x... --network localhost
*/

/*
  newOwner - new owner address
*/
task("transferOwnership")
  .addParam("to")
  .addParam("amount")
  .setAction(async ({ newOwner }) => {
    const nft = await ethers.getContractAt("MMX", process.env.MMX_ADDRESS);
    const tx = await nft.transferOwnership(newOwner);
    await tx.wait();
  });
