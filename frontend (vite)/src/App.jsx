import {useEffect, useState} from "react";
import {ethers} from "ethers";

// Components
import Navigation from "./components/Navigation";
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
  const [categoryCamera, setCategoryCamera] = useState(null);
  const [categoryMobile, setCategoryMobile] = useState(null);
  const [categoryHeadphone, setCategoryHeadphone] = useState(null);

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

    // const contractAddress = "";

    const connectedNetwork = await provider.getNetwork();

    const dappazon = new ethers.Contract(
      config[connectedNetwork.chainId].contract.address,
      Dappazon,
      provider.getSigner()
    );

    setDappazon(dappazon);

    const items = [];

    // const numberOfProducts = dappazon.items;
    // console.log(`numberOfProducts : ${numberOfProducts}`);

    for (var i = 0; i < 18; i++) {
      const item = await dappazon.items(i + 1);
      items.push(item);
    }

    setListOfItems(items);

    const categoryCamera = items.filter(
      (item) => item.category === "DSLR & Cameras"
    );
    const categoryMobile = items.filter(
      (item) => item.category === "Mobile & Tablets"
    );
    const categoryHeadphone = items.filter(
      (item) => item.category === "Headphones & Accessories"
    );

    setCategoryCamera(categoryCamera);
    setCategoryMobile(categoryMobile);
    setCategoryHeadphone(categoryHeadphone);
  };

  // toStoreSearchedProducts
  const [searchResults, setSearchResults] = useState([]);
  const updatedSearchResults = (results) => {
    setSearchResults(results);
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
        // sendingTheFunction[updateFilteredResults]ThroughProps
        updatedSearchResults={updatedSearchResults}
      />

      <div className="text_center">
        {/* <h2>Project Dappazon</h2> */}

        {/* ifDataIsAvailable? */}
        {categoryCamera && categoryMobile && categoryHeadphone && (
          <ProductsCatalogueSection
            categoryCamera={categoryCamera}
            categoryMobile={categoryMobile}
            categoryHeadphone={categoryHeadphone}
            togglePop={togglePop}
            searchResults={searchResults}
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
