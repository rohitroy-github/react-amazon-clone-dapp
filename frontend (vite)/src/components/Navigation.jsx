import React, {useState} from "react";
import {ethers} from "ethers";

const Navigation = ({
  account,
  setAccount,
  listOfItems,
  updatedSearchResults,
}) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // function -> searchFunctionality
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // searchingBasedOn[item.name]OR[item.catgeory]
    const filteredResults = query
      ? listOfItems.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
      : [];

    setSearchResults(filteredResults);
    updatedSearchResults(filteredResults);
    // console.log(filteredResults);
  };

  return (
    <>
      <nav>
        <div className="nav__brand">
          <h2>Dappazon</h2>
        </div>

        {/* nonFunctionalSearchBar */}
        {/* <input type="text" className="nav__search" /> */}

        <input
          type="text"
          className="nav__search"
          placeholder="Search for products ..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />

        <div className="nav__india_en">
          <h3>India En</h3>
        </div>

        <button className="nav__orders">
          <h3>Returns & Orders</h3>
        </button>

        {account ? (
          <button type="button" className="nav__connect">
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </button>
        ) : (
          <button
            type="button"
            className="nav__connect"
            onClick={connectHandler}
          >
            Connect
          </button>
        )}

        <ul className="nav__links">
          <li>
            <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
          </li>
          <li>
            <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
          </li>
          <li>
            <a href="#Toys & Gaming">Toys & Gaming</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
