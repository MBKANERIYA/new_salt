import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../Pages/Product/productCard';
import Filter from '../Filter/Filter';
import Mdfilter from '../Filter/Mdfilter';
import Helmet from '../Components/Helmet';
import Sort from '../Filter/Sort';
import Shimmer from '../ShimmerEffect/shimmer';

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { category = "", subCategory = "" } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const internalNavRef = useRef(false);

    // Shared tag map: URL subcategory name → DB tag
    const styleTagMap = {
        "Engagement Rings": "ENGAGEMENT",
        "Party Wear Rings": "PARTY WEAR",
        "Couple Rings": "COUPLE",
        "Dailywear Rings": "DAILY WEAR",
        "Office Wear Rings": "OFFICE WEAR",
        "Office Wear Earrings": "OFFICE WEAR",
        "Office Wear Earring": "OFFICE WEAR",
        "Office Wear Bracelet": "OFFICE WEAR",
        "Platinum Rings": "PLATINUM",
        "Bands Rings": "BAND",
        "Infinity Rings": "INFINITY",
        "Promise Rings": "PROMISE",
        "Solitaire Rings": "SOLITAIRE",
        // Earring subcategories
        "Studs Earrings": "STUD",
        "Studs Earring": "STUD",
        "Jhumkas Earrings": "JHUMKA",
        "Jhumkas Earring": "JHUMKA",
        "Drops Earrings": "DROP",
        "Drops Earring": "DROP",
        "Hoops Earrings": "HOOP",
        "Hoops Earring": "HOOP",
        "Sui Dhaga Earrings": "SUI DHAGA",
        "Sui Dhaga Earring": "SUI DHAGA",
        "Mens Studs Earrings": "MEN STUD",
        "Mens Studs Earring": "MEN STUD",
        // Bracelet
        "Chain Bracelet": "CHAIN",
        "Tennis Bracelet": "TENNIS",
        "Light Weight Bangle": "LIGHT WEIGHT BANGLE",
        // Pendant
        "Pendent Set": "PENDENT SET",
        "Heart Pendent": "HEART",
        "Alphabet Pendent": "ALPHABET",
        // Necklace
        "Lightweight Necklace": "LIGHTWEIGHT",
        "Evil Eye Necklace": "EVIL EYE",
        // Mangalsutra
        "Modern Mangalsutra": "MODERN",
        "Traditional Mangalsutra": "TRADITIONAL",
        "Daily Wear Mangalsutra": "DAILY WEAR",
        "Office Wear Mangalsutra": "OFFICE WEAR",
        "Bracelet Mangalsutra": "BRACELET",
        "Hand Mangalsutra": "HAND",
        "Fancy Mangalsutra": "FANCY",
    };

    // Decode URL params
    const decodedCategory = category ? category.replace(/-/g, " ") : "";
    const decodedSubCategory = subCategory ? subCategory.replace(/-/g, " ") : "";

    // Helper: parse comma-separated array params from URL query string
    const parseArrayParam = (key) => {
        const val = searchParams.get(key);
        return val ? val.split(',').filter(Boolean) : [];
    };

    // Get subcategory tag from URL path
    const getOccasionFromPath = () => {
        if (!subCategory) return [];
        const decoded = subCategory.replace(/-/g, " ");
        const tag = styleTagMap[decoded] || decoded.toUpperCase();
        return [tag];
    };

    // Current filter state
    const [appliedFilters, setAppliedFilters] = useState(() => ({
        occasionBy: getOccasionFromPath(),
        priceLimit: parseArrayParam('priceLimit'),
        typeBy: parseArrayParam('typeBy'),
        sortBy: searchParams.get('sortBy') || "",
        priceOrder: searchParams.get('priceOrder') || "",
        featured: searchParams.get('featured') || "",
    }));

    // Sync filter state → URL query params
    const syncFiltersToURL = (filters) => {
        const params = new URLSearchParams();
        const pathOccasion = getOccasionFromPath();

        // Array params
        ['occasionBy', 'priceLimit', 'typeBy'].forEach(key => {
            const val = filters[key];
            if (val && Array.isArray(val) && val.length > 0) {
                // Skip occasionBy if it matches what the path already provides
                if (key === 'occasionBy' && pathOccasion.length > 0) {
                    const isSame = val.length === pathOccasion.length && val.every(v => pathOccasion.includes(v));
                    if (isSame) return;
                }
                params.set(key, val.join(','));
            }
        });

        // String params
        ['sortBy', 'priceOrder', 'featured'].forEach(key => {
            if (filters[key] && typeof filters[key] === 'string' && filters[key].length > 0) {
                params.set(key, filters[key]);
            }
        });

        // Only update URL if params actually changed, otherwise React Router ignores it
        // and internalNavRef.current remains poisoned as true, breaking next navigation.
        if (searchParams.toString() !== params.toString()) {
            internalNavRef.current = true;
            setSearchParams(params, { replace: true });
        }
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch products from API
    // Uses explicit category/subCategory args to avoid stale closure issues
    const fetchProducts = async (cat, subCat, filters) => {
        setLoading(true);
        setError(null);

        try {
            let filteredProducts = [];

            if (!cat && !subCat && (!filters.occasionBy || filters.occasionBy.length === 0) &&
                (!filters.priceLimit || filters.priceLimit.length === 0) &&
                (!filters.typeBy || filters.typeBy.length === 0) &&
                !filters.sortBy && !filters.priceOrder && !filters.featured) {
                // No filters at all — fetch all products
                const response = await axios.get(`${API_BASE_URL}/v1/upload/get_upload`);
                filteredProducts = response.data || [];
            } else {
                // Build API request body matching backend expectations:
                // title → category, occasionBy → subCategory, typeBy → gender
                const postBody = {
                    title: cat,
                };

                // SubCategory filter (occasionBy → maps to subCategory in DB)
                if (filters.occasionBy && filters.occasionBy.length > 0) {
                    postBody.occasionBy = filters.occasionBy;
                } else if (subCat) {
                    const tag = styleTagMap[subCat] || subCat.toUpperCase();
                    postBody.occasionBy = [tag];
                }

                // Gender filter
                if (filters.typeBy && filters.typeBy.length > 0) {
                    postBody.typeBy = filters.typeBy;
                }

                // Price filter
                if (filters.priceLimit && filters.priceLimit.length > 0) {
                    postBody.priceLimit = filters.priceLimit;
                }

                // Sorting
                if (filters.sortBy) postBody.sortBy = filters.sortBy;
                if (filters.priceOrder) postBody.priceOrder = filters.priceOrder;
                if (filters.featured) postBody.featured = filters.featured;

                const response = await axios.post(
                    `${API_BASE_URL}/v1/upload/filterProduct`,
                    postBody
                );
                filteredProducts = response.data.updatedProducts || [];
            }

            if (filteredProducts.length === 0) {
                setError("Oops! No products found.");
                setProducts([]);
            } else {
                setError(null);
                setProducts(filteredProducts);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            setProducts([]);
        }

        setTimeout(() => setLoading(false), 2000);
    };

    // Handle sidebar filter changes
    const handleFilterApply = (newFilters) => {
        const updatedFilters = {
            ...appliedFilters,
            ...newFilters,
        };
        setAppliedFilters(updatedFilters);
        syncFiltersToURL(updatedFilters);
        fetchProducts(decodedCategory, decodedSubCategory, updatedFilters);
    };

    // On route change or URL query change — rebuild filters and fetch
    useEffect(() => {
        // Skip if URL change was triggered by syncFiltersToURL
        if (internalNavRef.current) {
            internalNavRef.current = false;
            return;
        }

        const queryOccasion = searchParams.get('occasionBy');
        const occasionBy = queryOccasion
            ? queryOccasion.split(',').filter(Boolean)
            : getOccasionFromPath();

        const newFilters = {
            occasionBy,
            priceLimit: parseArrayParam('priceLimit'),
            typeBy: parseArrayParam('typeBy'),
            sortBy: searchParams.get('sortBy') || "",
            priceOrder: searchParams.get('priceOrder') || "",
            featured: searchParams.get('featured') || "",
        };

        setAppliedFilters(newFilters);
        syncFiltersToURL(newFilters);

        // Use current route params directly (not from closure/state)
        const cat = category ? category.replace(/-/g, " ") : "";
        const sub = subCategory ? subCategory.replace(/-/g, " ") : "";
        fetchProducts(cat, sub, newFilters);
    }, [category, subCategory, location.search]);

    return (
        <Helmet title={`${category} Products`}>
            <>
                <section className="bg_product_page mb-2 mb-lg-5">
                    <div className="container">
                        <div className=" flex-column text-start min-vh-25 py-3">
                            <div>
                                <h6 className="mb-1">
                                    {category} Designs &nbsp;
                                    <span>{products.length} Designs</span>
                                </h6>
                                <p>Home &gt; Jewellery &gt; {category}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container-fluid mt-2 mb-4' >
                    <div className='row'>
                        <div className="col-xl-3 col-lg-3 d-lg-block d-none">
                            <Filter onFilterApply={handleFilterApply} initialFilters={appliedFilters} />
                        </div>
                        <Mdfilter onFilterApply={handleFilterApply} initialFilters={appliedFilters} />

                        <div className="col-lg-9">
                            <Sort onFilterApply={handleFilterApply} initialFilters={appliedFilters} />

                            <div className="row px-1">
                                {loading ? (
                                    [...Array(8)].map((_, i) => (
                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 mb-3" key={i}>
                                            <Shimmer />
                                        </div>
                                    ))
                                ) : error ? (
                                    <div className="text-center w-100 py-5">
                                        <h4>{error}</h4>
                                        <p>Oops! There are no products available under your current selection.</p>
                                    </div>
                                ) : products.length > 0 ? (
                                    products.map((item) => (
                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 card_shadow p-0 px-1" key={item.product_id || item.id}>
                                            <Link to={`/Productdetails/${item.product_id || item.id}`}>
                                                <ProductCard Productsitem={item} />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    )
}

export default CollectionPage;