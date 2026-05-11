import React, { useState } from "react";

const Sort = ({ onFilterApply }) => {
    const [selectedSort, setSelectedSort] = useState("default");

    const handleSelectFilterChange = (combinedValue) => {
        setSelectedSort(combinedValue);
        let updatedFilters = {};

        if (combinedValue === "featured") {
            updatedFilters = { featured: "featured", sortBy: "", priceOrder: "" };
        } else if (combinedValue === "newestFirst") {
            updatedFilters = { sortBy: "newestFirst", priceOrder: "", featured: "" };
        } else if (combinedValue === "newestFirst_lowToHigh") {
            updatedFilters = { sortBy: "", priceOrder: "lowToHigh", featured: "" };
        } else if (combinedValue === "newestFirst_highToLow") {
            updatedFilters = { sortBy: "", priceOrder: "highToLow", featured: "" };
        }

        onFilterApply(updatedFilters);
    };

    return (
        <div className="row">
            <div className="col d-lg-flex d-none justify-content-end" style={{ fontSize: "10px" }}>
                <select
                    className="form-select custom-select w-auto"
                    value={selectedSort}
                    onChange={(e) => handleSelectFilterChange(e.target.value)}
                >
                    <option value="default" hidden>Featured</option>
                    <option value="featured">Featured</option>
                    <option value="newestFirst">Latest</option>
                    <option value="newestFirst_lowToHigh">Low to High</option>
                    <option value="newestFirst_highToLow">High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default Sort;
