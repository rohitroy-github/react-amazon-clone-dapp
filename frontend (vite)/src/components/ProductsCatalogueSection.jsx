import Section from "./Section";
import {useEffect, useState} from "react";

const ProductsCatalogueSection = ({
  categoryCamera,
  categoryMobile,
  categoryHeadphone,
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
            title={"DSLR & Cameras"}
            items={categoryCamera}
            togglePop={togglePop}
          />

          <Section
            title={"Mobile & Tablets"}
            items={categoryMobile}
            togglePop={togglePop}
          />

          <Section
            title={"Headphones & Accessories"}
            items={categoryHeadphone}
            togglePop={togglePop}
          />
        </>
      )}
    </>
  );
};

export default ProductsCatalogueSection;
