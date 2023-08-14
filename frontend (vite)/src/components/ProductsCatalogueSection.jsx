import Section from "./Section";
import {useEffect, useState} from "react";

const ProductsCatalogueSection = ({
  electronicItems,
  clothingItems,
  toyItems,
  togglePop,
  searchResults,
}) => {
  const [searchedProducts, setSearchedProducts] = useState([]);

  // function -> extractProdcutsFromProps
  const extractSearchResults = (searchResults) => {
    setSearchedProducts(searchResults);
    // console.log(searchResults);
  };

  useEffect(() => {
    extractSearchResults(searchResults);
  }, [searchResults]);

  useEffect(() => {
    if (!searchResults || searchResults.length === 0) {
      setSearchedProducts([]);
    }
  }, [searchResults]);

  return (
    <>
      {/* ifSearchedProduyctsArePresentThenDisplayThoseSearchedProducts ?*/}
      {searchedProducts.length > 0 ? (
        <>
          <Section
            title={"Searched Results ..."}
            items={searchedProducts}
            togglePop={togglePop}
          />
        </>
      ) : (
        <>
          <Section
            title={"Clothing"}
            items={clothingItems}
            togglePop={togglePop}
          />

          <Section
            title={"Electronics & Gaming"}
            items={electronicItems}
            togglePop={togglePop}
          />

          <Section
            title={"Toys & Gaming"}
            items={toyItems}
            togglePop={togglePop}
          />
        </>
      )}
    </>
  );
};

export default ProductsCatalogueSection;
