import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const priceRanges = [
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

// Shop by Style mapping per category — matches header subcategories
const styleMap = {
  Ring: [
    { label: "Engagement Rings", tag: "ENGAGEMENT" },
    { label: "Couple Rings", tag: "COUPLE" },
    { label: "Dailywear Rings", tag: "DAILY WEAR" },
    { label: "Office Wear Rings", tag: "OFFICE WEAR" },
    { label: "Platinum Rings", tag: "PLATINUM" },
    { label: "Bands", tag: "BAND" },
    { label: "Infinity Rings", tag: "INFINITY" },
    { label: "Promise Rings", tag: "PROMISE" },
    { label: "Solitaire Rings", tag: "SOLITAIRE" },
    { label: "Party Wear", tag: "PARTY WEAR" },
  ],
  Earring: [
    { label: "Studs", tag: "STUD" },
    { label: "Jhumkas", tag: "JHUMKA" },
    { label: "Drops", tag: "DROP" },
    { label: "Hoops", tag: "HOOP" },
    { label: "Sui Dhaga", tag: "SUI DHAGA" },
    { label: "Men's Studs", tag: "MEN STUD" },
    { label: "Office Wear", tag: "OFFICE WEAR" },
  ],
  Bracelet: [
    { label: "Chain Bracelet", tag: "CHAIN" },
    { label: "Tennis Bracelet", tag: "TENNIS" },
    { label: "Light Weight Bangle", tag: "LIGHT WEIGHT BANGLE" },
  ],
  Pendant: [
    { label: "Pendent Set", tag: "PENDENT SET" },
    { label: "Heart Pendent", tag: "HEART" },
    { label: "Alphabet Pendent", tag: "ALPHABET" },
  ],
  Necklace: [
    { label: "Lightweight", tag: "LIGHTWEIGHT" },
    { label: "Evil Eye", tag: "EVIL EYE" },
  ],
  Mangalsutra: [
    { label: "Mangalsutra Bracelets", tag: "BRACELET" },
    { label: "Hand Mangalsutra", tag: "HAND" },
    { label: "Fancy", tag: "FANCY" },
    { label: "Traditional", tag: "TRADITIONAL" },
    { label: "Modern", tag: "MODERN" },
  ],
};

const Filter = ({ onFilterApply, initialFilters }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect current category from URL path
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
  const currentStyles = currentCategory ? styleMap[currentCategory] || [] : [];

  // Filter state — only contains filter-specific fields
  // Does NOT include title/subCategory (those come from URL route)
  const [filters, setFilters] = useState({
    occasionBy: initialFilters?.occasionBy || [],
    priceLimit: initialFilters?.priceLimit || [],
    typeBy: initialFilters?.typeBy || [],
    sortBy: initialFilters?.sortBy || "",
    priceOrder: initialFilters?.priceOrder || "",
  });

  // Sync local state when parent's initialFilters change (e.g., URL navigation)
  useEffect(() => {
    setFilters({
      occasionBy: initialFilters?.occasionBy || [],
      priceLimit: initialFilters?.priceLimit || [],
      typeBy: initialFilters?.typeBy || [],
      sortBy: initialFilters?.sortBy || "",
      priceOrder: initialFilters?.priceOrder || "",
    });
  }, [
    JSON.stringify(initialFilters?.occasionBy),
    JSON.stringify(initialFilters?.priceLimit),
    JSON.stringify(initialFilters?.typeBy),
    initialFilters?.sortBy,
    initialFilters?.priceOrder,
  ]);

  const [showMorePrices, setShowMorePrices] = useState(false);
  const [showMoreStyles, setShowMoreStyles] = useState(false);

  // Toggle array filter values
  const handleArrayToggle = (field, value) => {
    setFilters(prev => {
      const current = prev[field] || [];
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
      occasionBy: [],
      priceLimit: [],
      typeBy: [],
      sortBy: "",
      priceOrder: "",
    };
    setFilters(empty);
    onFilterApply(empty);
  };

  return (
    <div className="sticky-header px-5">
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2 d-flex justify-content-between align-items-center">
        <h6 className="filter_main_title">FILTERS</h6>
        <button className="btn btn-link p-0 clear_btn_Filter" onClick={clearFilters}>
          CLEAR ALL
        </button>
      </div>

      {/* Category List */}
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
        <h2 className="mt-3 filter_title">Category</h2>
        <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
          {allCategories.map((cat, index) => (
            <div className="form-check my-2" key={`cat-${index}`}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`cat-${cat.id}`}
                checked={currentCategory === cat.id}
                onChange={() => {
                  if (currentCategory !== cat.id) {
                    navigate(`/products/${cat.id}`);
                  }
                }}
              />
              <label className="form-check-label filter_sub_title" htmlFor={`cat-${cat.id}`}>
                {cat.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Shop by Style — shown when on a category page */}
      {currentStyles.length > 0 && (
        <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
          <h2 className="mt-3 filter_title">Shop by Style</h2>
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {currentStyles.slice(0, showMoreStyles ? currentStyles.length : 6).map((style, index) => (
              <div className="form-check my-2" key={`style-${index}`}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`style-${index}`}
                  checked={filters.occasionBy?.includes(style.tag) || false}
                  onChange={() => handleArrayToggle("occasionBy", style.tag)}
                />
                <label className="form-check-label filter_sub_title" htmlFor={`style-${index}`}>
                  {style.label}
                </label>
              </div>
            ))}
          </div>
          {currentStyles.length > 6 && (
            <button className="btn p-0 show_more_btn" onClick={() => setShowMoreStyles(!showMoreStyles)}>
              {showMoreStyles ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
              {showMoreStyles ? "Show Less" : "More"}
            </button>
          )}
        </div>
      )}

      {/* Price Filter */}
      <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
        <h2 className="mt-3 filter_title">Price</h2>
        {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
          <div className="form-check my-2" key={`price-${index}`}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`price-${price.id}`}
              checked={filters.priceLimit?.includes(price.id) || false}
              onChange={() => handleArrayToggle("priceLimit", price.id)}
            />
            <label className="form-check-label" htmlFor={`price-${price.id}`}>
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
            id="shopForWomen"
            checked={filters.typeBy?.includes("female") || false}
            onChange={() => handleArrayToggle("typeBy", "female")}
          />
          <label className="form-check-label" htmlFor="shopForWomen">Women</label>
        </div>
        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="shopForMen"
            checked={filters.typeBy?.includes("male") || false}
            onChange={() => handleArrayToggle("typeBy", "male")}
          />
          <label className="form-check-label" htmlFor="shopForMen">Men</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
