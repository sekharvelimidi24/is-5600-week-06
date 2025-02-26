import React, { useState, useEffect } from "react";
import Search from "./Search";
import Card from "./Card";
import Button from "./Button";

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));
  const [filteredData, setFilteredData] = useState(data);

  // Filter products by tags
  const filterTags = (searchTerm) => {
    const filtered = data.filter((product) =>
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setOffset(0); // Reset pagination
    setProducts(filtered.slice(0, limit));
  };

  // Pagination handler
  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    if (newOffset >= 0 && newOffset < filteredData.length) {
      setOffset(newOffset);
    }
  };

  // Update products when offset or filtered data changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-1)} disabled={offset === 0} />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  );
};

export default CardList;
