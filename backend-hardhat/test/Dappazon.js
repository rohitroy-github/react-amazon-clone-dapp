const {expect} = require("chai");
const {ethers} = require("hardhat");

// function -> convertBigNumberToSmallerNumbers
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappazon deploymwnt !", () => {
  let dappazon;
  // deployContract -> firstStep
  beforeEach(async () => {
    // settingUpAccounts
    [deployer, buyer] = await ethers.getSigners();

    // contractDeployment
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy();
  });

  describe("Contructor check !", () => {
    // setsOwner
    it("has a owner >", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address);
    });

    // setsName
    it("has a name >", async () => {
      expect(await dappazon.name()).to.equal("Dappazon");
    });
  });

  // newProductListing
  describe("Listing !", () => {
    let transaction;

    const ID = 1;
    const NAME = "Product1";
    const CATEGORY = "Category1";
    const IMAGE = "IMAGE1";
    const COST = tokens(1);
    const RATING = 5;
    const STOCK = 500;

    beforeEach(async () => {
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);

      await transaction.wait();
    });

    // checkNewAddedProduct
    it("Returns item attributes >", async () => {
      // fetchProductWith(_id=ID)FromProductArray
      const item = await dappazon.items(ID);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });

    it("Emits [List] event >", async () => {
      expect(transaction).to.emit(dappazon, "List");
    });
  });

  describe("Buying !", () => {
    let transaction;

    const ID = 1;
    const NAME = "Product1";
    const CATEGORY = "Category1";
    const IMAGE = "IMAGE1";
    const COST = tokens(1);
    const RATING = 5;
    const STOCK = 500;

    // uploadingAProductFirstTpBuyThatProduct
    beforeEach(async () => {
      transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);

      await transaction.wait();

      // buyingTheProduct
      transaction = await dappazon.connect(buyer).buy(ID, {value: COST});
    });

    it("Update buyer's order count >", async () => {
      // checkSMBalance
      const result = await dappazon.orderCount(buyer.address);
      expect(result).to.equal(1);
    });

    // addANewOrder
    it("Add a new order >>>", async () => {
      const order = await dappazon.orders(buyer.address, 1);

      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    });

    // checking -> [Buy]Event
    it("Emits Buy event >>>", async () => {
      expect(transaction).to.emit(dappazon, "Buy");
    });

    it("Update the contract balance >", async () => {
      // checkSMBalance
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(COST);
    });
  });

  describe("Withdrawing Funds >>>", () => {
    let balanceBefore;
    let balanceAfter;

    const ID = 1;
    const NAME = "Product1";
    const CATEGORY = "Category1";
    const IMAGE = "IMAGE1";
    const COST = tokens(1);
    const RATING = 5;
    const STOCK = 500;

    beforeEach(async () => {
      let transaction = await dappazon
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);

      await transaction.wait();

      // console.log(
      //   `Contract's balance before buying = ${ethers.utils.formatEther(
      //     await ethers.provider.getBalance(dappazon.address)
      //   )} ETH`
      // );

      // buyingTheProduct
      transaction = await dappazon.connect(buyer).buy(ID, {value: COST});

      // console.log(
      //   `Contract's balance after buying = ${ethers.utils.formatEther(
      //     await ethers.provider.getBalance(dappazon.address)
      //   )} ETH`
      // );

      balanceBefore = await ethers.provider.getBalance(deployer.address);

      // console.log(
      //   `Owner's balance before -> ${ethers.utils.formatEther(
      //     balanceBefore
      //   )} ETH`
      // );

      let transaction2 = await dappazon.connect(deployer).withdraw();

      await transaction2.wait();

      balanceAfter = await ethers.provider.getBalance(deployer.address);

      // console.log(
      //   `Owner's balance after withdrawing funds = ${ethers.utils.formatEther(
      //     balanceAfter
      //   )} ETH`
      // );
    });

    it("Updates owner's balance >", async () => {
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("Updates the contract balance >", async () => {
      // checkSMBalance
      const result = await ethers.provider.getBalance(dappazon.address);
      expect(result).to.equal(0);
    });
  });
});

// syntax

// describe("Listing !", () => {
//   beforeEach(async () => {});

//   it("Returns item attributes >", async () => {
//     expect(await dappazon.owner()).to.equal(deployer.address);
//   });
// });
