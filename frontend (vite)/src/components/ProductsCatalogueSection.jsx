import Section from "./Section";
import {useEffect, useState} from "react";

const ProductsCatalogueSection = ({
  electronicItems,
  clothingItems,
  toyItems,
  togglePop,
  searchResults,
}) => {
  const [extractedSearchedProducts, setExtractedSearchedProducts] = useState(
    []
  );
  // function -> extractProductsFromProps
  const extractSearchResults = (searchResults) => {
    setExtractedSearchedProducts(searchResults);
    // console.log(extractedSearchedProducts);
  };

  useEffect(() => {
    extractSearchResults(searchResults);
  }, [searchResults]);

  return (
    <>
      {/* ifSearchedProduyctsArePresentThenDisplayThoseSearchedProducts?*/}
      {extractedSearchedProducts.length > 0 ? (
        <>
          <Section
            title={"Searched Results ..."}
            items={extractedSearchedProducts}
            togglePop={togglePop}
          />
        </>
      ) : (
        <>
          <Section
            title={"Electronics & Gadgets"}
            items={electronicItems}
            togglePop={togglePop}
          />

          <Section
            title={"Clothing"}
            items={clothingItems}
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
