import {useEffect, useState} from "react";
import {ethers} from "ethers";

// Components
import Rating from "./Rating";

import close from "../assets/close.svg";

const Product = ({item, provider, account, dappazon, togglePop}) => {
  const [order, setOrder] = useState(null);
  const [hasBought, setHasBought] = useState(false);

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter("Buy");
    const orders = events.filter(
      (event) =>
        event.args.buyer === account &&
        event.args.itemId.toString() === item.id.toString()
    );

    // checkIfOrderIsPresentOrThatItemByThis[account]?
    if (orders.length === 0) {
      return;
    } else {
      const order = await dappazon.orders(
        account,
        orders[orders.length - 1].args.orderId
      );
      setOrder(order);

      // console.log(order);
    }
  };

  const buyHandler = async () => {
    console.log("Noted ! You want to buy this item. ");

    // getTheAccountConnectedToMetamaskCurrently
    const signer = await provider.getSigner();

    const transaction = await dappazon
      .connect(signer)
      .buy(item.id, {value: item.cost});

    await transaction.wait();

    const contractBalance = ethers.utils.formatEther(
      await provider.getBalance("0x5fbdb2315678afecb367f032d93f642f64180aa3")
    );

    console.log(
      `${ethers.utils.formatEther(
        item.cost.toString(),
        "ether"
      )} ETH recieved in Dappazon wallet !`
    );

    console.log(`Updated Dappazon balance = ${contractBalance}`);
  };

  useEffect(() => {
    fetchDetails();
  }, [hasBought]);

  return (
    <>
      <div className="product">
        <div className="product__details">
          <div className="product__image">
            <img src={item.image} alt="Product" />
          </div>

          <div className="product__overview">
            <h1>{item.name}</h1>
            <Rating value={item.rating} />
            <hr />
            <p>{item.address}</p>
            <h2>
              {ethers.utils.formatEther(item.cost.toString(), "ether")} ETH
            </h2>
            <hr />
            <p>{item.description}</p>
          </div>

          <div className="product__order">
            <h2>
              {ethers.utils.formatEther(item.cost.toString(), "ether")} ETH
            </h2>

            <p>
              FREE delivery <br />
              <strong>
                {new Date(Date.now() + 345600000).toLocaleDateString(
                  undefined,
                  {weekday: "long", month: "long", day: "numeric"}
                )}
              </strong>
            </p>

            {/* checkForStock? */}
            {item.stock > 0 ? (
              <p>Item in stock :))</p>
            ) : (
              <p>Item out of stock :((</p>
            )}

            <button type="button" onClick={buyHandler} className="product__buy">
              Buy Now
            </button>

            <p>
              <small>Ships from</small> Dappazon
            </p>
            <p>
              <small>Sold by</small> Dappazon
            </p>

            {order && (
              <div className="product__bought">
                Item last purchased on <br />
                <strong>
                  {new Date(
                    Number(order.time.toString() + "000")
                  ).toLocaleDateString(undefined, {
                    weekday: "long",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </strong>
              </div>
            )}
          </div>

          <button onClick={togglePop} className="product__close">
            <img src={close} alt="Close" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
