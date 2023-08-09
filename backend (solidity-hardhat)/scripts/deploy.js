// scriptsToRunInALocalBlockchain/Mainnet/Testnet

const hre = require("hardhat");
const {items} = require("../assets/items.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  [deployer] = await ethers.getSigners();

  const Dappazon = await hre.ethers.getContractFactory("Dappazon");
  dappazon = await Dappazon.deploy();

  console.log("Deploying contract ... \u23F3");

  await dappazon.deployed();

  console.log("Contract deployed successfully \u2705");
  console.log(`Contract address : ${dappazon.address}`);

  // Task : ListItems
  // listingItemsUsingADemoArrayOfItemsInside[items.json]
  let transaction;
  let i;
  for (i = 0; i < items.length; i++) {
    transaction = await dappazon
      .connect(deployer)
      .list(
        items[i].id,
        items[i].name,
        items[i].category,
        items[i].image,
        tokens(items[i].price),
        items[i].rating,
        items[i].stock
      );

    await transaction.wait();

    console.log(`Listed item ${items[i].id} : ${items[i].name}`);
  }

  // Task : ListItems
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
