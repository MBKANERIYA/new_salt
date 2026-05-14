import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const mdPriceRanges = [
    { id: "below10k", label: "Below ₹10,000" },
    { id: "10kTo20k", label: "₹10,000 - ₹20,000" },
    { id: "below20k", label: "Below ₹20,000" },
    { id: "20kTo30k", label: "₹20,000 - ₹30,000" },
    { id: "30kTo50k", label: "₹30,000 - ₹50,000" },
    { id: "50kTo75k", label: "₹50,000 - ₹75,000" },
    { id: "50kTo100k", label: "₹50,000 - ₹1,00,000" },
    { id: "above75k", label: "Above ₹75,000" },
    { id: "100kTo200k", label: "₹1,00,000 - ₹2,00,000" },
    { id: "200kTo300k", label: "₹2,00,000 - ₹3,00,000" },
    { id: "300kTo500k", label: "₹3,00,000 - ₹5,00,000" },
    { id: "above500k", label: "Above ₹5,00,000" }
];

const allCategories = [
    { id: "Ring", label: "Rings" },
    { id: "Earring", label: "Earrings" },
    { id: "Bracelet", label: "Bracelets & Bangles" },
    { id: "Mangalsutra", label: "Mangalsutras" },
    { id: "Necklace", label: "Necklaces" },
    { id: "Pendant", label: "Pendants" },
];

const Mdfilter = ({ onFilterApply, initialFilters }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const detectCategory = () => {
        const path = location.pathname.toLowerCase();
        if (path.includes('/products/ring')) return 'Ring';
        if (path.includes('/products/earring')) return 'Earring';
        if (path.includes('/products/bracelet')) return 'Bracelet';
        if (path.includes('/products/pendant')) return 'Pendant';
        if (path.includes('/products/necklace')) return 'Necklace';
        if (path.includes('/products/mangalsutra')) return 'Mangalsutra';
        return null;
    };
    const currentCategory = detectCategory();

    // Filter state — only filter-specific fields, no title/subCategory
    const [filters, setFilters] = useState({
        categoryBy: initialFilters?.categoryBy || [],
        occasionBy: initialFilters?.occasionBy || [],
        priceLimit: initialFilters?.priceLimit || [],
        typeBy: initialFilters?.typeBy || [],
        sortBy: initialFilters?.sortBy || "",
        priceOrder: initialFilters?.priceOrder || "",
        featured: initialFilters?.featured || "",
    });

    // Sync when parent filters change
    useEffect(() => {
        setFilters({
            categoryBy: initialFilters?.categoryBy || [],
            occasionBy: initialFilters?.occasionBy || [],
            priceLimit: initialFilters?.priceLimit || [],
            typeBy: initialFilters?.typeBy || [],
            sortBy: initialFilters?.sortBy || "",
            priceOrder: initialFilters?.priceOrder || "",
            featured: initialFilters?.featured || "",
        });
    }, [
        JSON.stringify(initialFilters?.categoryBy),
        JSON.stringify(initialFilters?.occasionBy),
        JSON.stringify(initialFilters?.priceLimit),
        JSON.stringify(initialFilters?.typeBy),
        initialFilters?.sortBy,
        initialFilters?.priceOrder,
        initialFilters?.featured,
    ]);

    const [showMorePrices, setShowMorePrices] = useState(false);

    const handleSelectFilterChange = (combinedValue) => {
        let updatedFilters = { ...filters };

        if (combinedValue === "featured") {
            updatedFilters = { ...filters, featured: "featured", sortBy: "", priceOrder: "" };
        } else {
            const [sortBy, priceOrder] = combinedValue.split("_");
            updatedFilters = { ...filters, featured: "", sortBy: sortBy || "", priceOrder: priceOrder || "" };
        }

        setFilters(updatedFilters);
        onFilterApply(updatedFilters);
    };

    // Toggle array filter values
    const handleArrayToggle = (field, value) => {
        setFilters(prev => {
            const current = Array.isArray(prev[field]) ? prev[field] : [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            const newFilters = { ...prev, [field]: updated };
            onFilterApply(newFilters);
            return newFilters;
        });
    };

    const clearFilters = () => {
        const empty = {
            categoryBy: [],
            occasionBy: [],
            priceLimit: [],
            typeBy: [],
            sortBy: "",
            priceOrder: "",
            featured: "",
        };
        setFilters(empty);
        onFilterApply(empty);
    };

    const priceRanges = mdPriceRanges;

    return (
        <>
            <div className="container-fluid filter_midium_divice d-lg-none d-xl-none d-block">
                <div className="row text-center pt-3">
                    <div className="col-md-6 col-sm-6 col-6">
                        <p
                            className="text-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasBottomSort"
                            aria-controls="offcanvasBottom"
                        >
                            SORT
                        </p>
                        <div
                            className="offcanvas offcanvas-bottom offcanvas_sort"
                            tabIndex="-1"
                            id="offcanvasBottomSort"
                            aria-labelledby="offcanvasBottomLabel"
                        >
                            <div className="offcanvas-header">
                                <h5
                                    className="offcanvas-title fw-bold"
                                    id="offcanvasBottomLabel"
                                >
                                    Sort Design By
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body small m-0 p-0" style={{
                                maxHeight: "calc(100vh - 150px)",
                                overflowY: "auto",
                                paddingBottom: "80px"
                            }}>
                                <div className="mb-2 text-left">
                                    <p onClick={() => handleSelectFilterChange("featured")} className="filter-option">Featured</p>
                                    <p onClick={() => handleSelectFilterChange("newestFirst")} className="filter-option">Latest</p>
                                    <p onClick={() => handleSelectFilterChange("newestFirst_highToLow")} className="filter-option">High to Low</p>
                                    <p onClick={() => handleSelectFilterChange("newestFirst_lowToHigh")} className="filter-option">Low to High</p>
                                </div>
                                <div className="container-fluid filter_offcanvas py-3">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <button className="btn w-100 filter_md_btn" onClick={clearFilters}>
                                                Clear All
                                            </button>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <button className="btn w-100 text-light filter_md_btn1"
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Close">
                                                APPLY FILTERS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-6">
                        <p
                            className="text-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasBottom"
                            aria-controls="offcanvasBottom"
                        >
                            FILTER
                        </p>
                        <div
                            className="offcanvas offcanvas-bottom"
                            tabIndex="-1"
                            id="offcanvasBottom"
                            aria-labelledby="offcanvasBottomLabel"
                        >
                            <div className="offcanvas-header">
                                <h5
                                    className="offcanvas-title fw-bold "
                                    id="offcanvasBottomLabel"
                                >
                                    Filters
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body small m-0 p-0" style={{
                                maxHeight: "calc(100vh - 150px)",
                                overflowY: "auto",
                                paddingBottom: "80px"
                            }}>
                                <div className="sticky-header px-5">
                                    {/* Category */}
                                    <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                        <h2 className="mt-3 filter_title">Category</h2>
                                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {allCategories.map((cat, index) => (
                                                <div className="form-check my-2" key={`md-cat-${index}`}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`md-cat-${cat.id}`}
                                                        checked={filters.categoryBy?.length > 0 ? filters.categoryBy.includes(cat.id) : currentCategory === cat.id}
                                                        onChange={() => {
                                                            let current = filters.categoryBy || [];
                                                            if (current.length === 0 && currentCategory) {
                                                                current = [currentCategory];
                                                            }
                                                            
                                                            const updated = current.includes(cat.id)
                                                              ? current.filter(v => v !== cat.id)
                                                              : [...current, cat.id];
                                                            
                                                            // Close offcanvas when navigating
                                                            const offcanvas = document.getElementById('offcanvasBottom');
                                                            if (offcanvas) {
                                                                const btn = offcanvas.querySelector('[data-bs-dismiss="offcanvas"]');
                                                                if (btn) btn.click();
                                                            }
                                                            
                                                            const params = new URLSearchParams(location.search);
                                                            if (updated.length > 0) {
                                                                params.set('categoryBy', updated.join(','));
                                                            } else {
                                                                params.delete('categoryBy');
                                                            }
                                                            navigate(`/products?${params.toString()}`);
                                                        }}
                                                    />
                                                    <label className="form-check-label filter_sub_title" htmlFor={`md-cat-${cat.id}`}>
                                                        {cat.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                        <h2 className="mt-3 filter_title">Price</h2>
                                        {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
                                            <div className="form-check my-2" key={index}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`md-price-${price.id}`}
                                                    checked={filters.priceLimit?.includes(price.id) || false}
                                                    onChange={() => handleArrayToggle("priceLimit", price.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`md-price-${price.id}`}>
                                                    {price.label}
                                                </label>
                                            </div>
                                        ))}
                                        {priceRanges.length > 4 && (
                                            <button className="btn p-0 show_more_btn" onClick={() => setShowMorePrices(!showMorePrices)}>
                                                {showMorePrices ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
                                                {showMorePrices ? "Show Less" : "More"}
                                            </button>
                                        )}
                                    </div>

                                    {/* Shop For (Gender) */}
                                    <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
                                        <h2 className="filter_title mt-3">Shop For</h2>
                                        <div className="form-check my-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="md-shopForWomen"
                                                checked={filters.typeBy?.includes("female") || false}
                                                onChange={() => handleArrayToggle("typeBy", "female")}
                                            />
                                            <label className="form-check-label" htmlFor="md-shopForWomen">Women</label>
                                        </div>
                                        <div className="form-check my-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="md-shopForMen"
                                                checked={filters.typeBy?.includes("male") || false}
                                                onChange={() => handleArrayToggle("typeBy", "male")}
                                            />
                                            <label className="form-check-label" htmlFor="md-shopForMen">Men</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-fluid filter_offcanvas py-3">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <button className="btn w-100 filter_md_btn" onClick={clearFilters}>
                                                Clear All
                                            </button>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <button
                                                className="btn w-100 text-light filter_md_btn1"
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Close"
                                            >
                                                APPLY FILTERS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mdfilter