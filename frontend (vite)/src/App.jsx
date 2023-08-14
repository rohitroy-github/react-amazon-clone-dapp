import {useEffect, useState} from "react";
import {ethers} from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";
import ProductsCatalogueSection from "./components/ProductsCatalogueSection";

// ABIs
import Dappazon from "./abis/Dappazon.json";

// Config
import config from "./config.json";

function App() {
  // storingEthereumNessecities
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState({});

  // storingProducts
  const [electronicItems, setElectronicItems] = useState(null);
  const [clothingItems, setClothingItems] = useState(null);
  const [toyItems, setToyItems] = useState(null);

  const [listOfItems, setListOfItems] = useState(null);

  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // console.log(account);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const connectedNetwork = await provider.getNetwork();

    const dappazon = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      Dappazon,
      provider.getSigner()
    );

    setDappazon(dappazon);

    const items = [];

    for (var i = 0; i < 9; i++) {
      const item = await dappazon.items(i + 1);
      items.push(item);
    }

    setListOfItems(items);

    const electronicItems = items.filter(
      (item) => item.category === "electronics"
    );
    const clothingItems = items.filter((item) => item.category === "clothing");
    const toyItems = items.filter((item) => item.category === "toys");

    setElectronicItems(electronicItems);
    setClothingItems(clothingItems);
    setToyItems(toyItems);

    // console.log(electronicItems);
    // console.log(clothingItems);
    // console.log(toyItems);
  };

  const [filteredResults, setFilteredResults] = useState([]);

  const updateFilteredResults = (results) => {
    setFilteredResults(results);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <Navigation
        account={account}
        setAccount={setAccount}
        listOfItems={listOfItems}
        updateFilteredResults={updateFilteredResults}
      />

      <div className="main_heading">
        <h2>Project Dappazon</h2>

        {/* ifDataIsAvailable? */}
        {electronicItems && clothingItems && toyItems && (
          <ProductsCatalogueSection
            electronicItems={electronicItems}
            clothingItems={clothingItems}
            toyItems={toyItems}
            togglePop={togglePop}
            searchResults={filteredResults}
          />
        )}

        {/* whenYouClickAProductThePopUpOpens */}
        {toggle && (
          <Product
            item={item}
            provider={provider}
            account={account}
            dappazon={dappazon}
            togglePop={togglePop}
          />
        )}
      </div>
    </>
  );
}

export default App;
