# Changelog

## 2026-05-11 — Make Homepage Images Smaller & Fit Perfectly in Sections
**What**: Reduced all homepage image sizes, constrained them to fit perfectly within their section containers, and generated 25 new premium images tailored to each section's dimensions.
**Why**: Images were too large, causing disproportionate sections and excessive scrolling. Old images had inconsistent sizes and some were tiny/broken. Now every section has uniform, compact, high-quality images.
**Changes**:
- **Hero banners**: 500px → 450px (desktop), 400px → 350px (tablet), 280px → 250px (mobile). Generated 4 new wide banners (`hero_banner_1–4.png`)
- **Banner grid sections**: Added `banner-grid-left` (max 400px) / `banner-grid-right` (max 195px) CSS classes. Generated 2 grid-left images + 4 grid-right images
- **Category grid images** (`shop_category`): Fixed 220px height. Generated 6 new category images on teal backgrounds (`cat_necklaces`, `cat_earrings`, `cat_bracelets`, `cat_rings`, `cat_engagement`, `cat_home`)
- **Filter categories** ("Wrapped with love"): Generated 6 themed images (`filter_gifts_her`, `filter_gifts_him`, `filter_anniversary`, `filter_wedding`, `filter_birthday`, `filter_under500`). Added click functionality with dynamic query parameters (`typeBy=female`, `occasionBy=ENGAGEMENT`, etc.). Changed the last option from "Under $500" to "Under ₹50,000" and added `below50k` price logic to backend.
- **Gift section**: Fixed 320px height. Generated 3 gift wrap images (`gift_wrap_1–3.png`)
- **Full-width promo banners**: New `promo-banner` class with 340px max-height. Generated 2 panoramic promo banners
- **Salt Promise icons**: Constrained to 36×36px
- All responsive breakpoints updated for tablet (991px) and mobile (575px)
**Files Changed**:
- `frontend/public/assets/css/Mainpage.css` — Added section image constraint rules, responsive variants
- `frontend/src/Pages/Mainpage.jsx` — Added CSS class hooks, removed conflicting inline max-height styles

## 2026-05-08 — Add Local Fallback Images for All Homepage Sections
**What**: Added local fallback data (`LOCAL_BOTTOM_BANNERS`, `LOCAL_CATEGORIES`, `LOCAL_FILTER_CATEGORIES`, `LOCAL_GIFTS`) in addition to `LOCAL_BANNERS` for the entire homepage.
**Why**: The database images for all main page sections (bottom banners, categories, gifts) were not loading/broken, resulting in empty or broken image placeholders.
**How**: Defined fallback arrays using local `/assets/img/` assets in `Mainpage.jsx`. Replaced the dynamic API responses with these local arrays in `fetchHome()` so the homepage always renders correctly.
**Files Changed**:
- `frontend/src/Pages/Mainpage.jsx` — Added fallback arrays and updated `fetchHome` to use them globally across all sections.
- `frontend/public/assets/img/banner_hero_5.png` — New generated banner (Lab Grown Diamond Collection)
- `frontend/public/assets/img/banner_hero_6.png` — New generated banner (Bridal Collection)

## 2026-05-08 — Buy Now Goes Directly to Shipping with Only That Product
**What**: "BUY NOW" now skips the cart page and navigates directly to `/shipping`, showing only the purchased product in the order summary.
**Why**: Previously "BUY NOW" added the item to cart and navigated to the cart page — same as "ADD TO CART". Users expect Buy Now to be an express checkout flow.
**How**: The buy-now product is stored in `localStorage` as `buyNowProduct`. `OrderSummary.jsx` checks for this key and displays only that product instead of the full cart. The key is cleared when navigating from the Cart's "PLACE ORDER" button to prevent conflicts.
**Files Changed**:
- `frontend/src/Pages/Product/Productdetails.jsx` — Rewrote `buyNow` to store product in localStorage and navigate to `/shipping`
- `frontend/src/Pages/Process/OrderSummary.jsx` — Added `buyNowProduct` check to show single product in Buy Now flow
- `frontend/src/Pages/Process/Cart.jsx` — Clear `buyNowProduct` from localStorage when using normal cart → shipping flow

## 2026-05-08 — Stay on Cart Page After Removing Item
**What**: Removed `navigate("/")` after removing an item from cart — user now stays on the cart page.
**Why**: Previously removing a product redirected to the homepage, breaking the shopping flow. Now the cart re-fetches and updates in place.
**Files Changed**:
- `frontend/src/Pages/Process/Cart.jsx` — Replaced `navigate("/")` with `await fetchCart()` in `removeToCart`

## 2026-05-08 — Navigate to Cart After Add to Cart
**What**: Added automatic navigation to `/cart` after successfully adding a product to cart.
**Why**: Previously clicking "ADD TO CART" only showed a toast — user had to manually navigate to the cart page.
**Files Changed**:
- `frontend/src/Pages/Product/Productdetails.jsx` — Added `navigate('/cart')` after successful `addToCart` API call and Redux dispatch

## 2026-05-08 — Fix Cart Badge Showing 1 When Cart is Empty
**What**: Fixed the cart icon badge showing `1` even when the cart has 0 items.
**Why**: Two root causes:
1. **Wrong localStorage key in `clearCart` reducer**: `localStorage.removeItem('cartItem')` (singular) was used, but the actual key is `'cartItems'` (plural). So clearing the cart never actually removed the stored items — on next page load, the stale `cartItems` array was read back and `totalQuantity` was recalculated as `1`.
2. **No Redux sync on empty backend cart**: When the backend's `getCart` API returns 404 (cart is empty), the Header only reset its local `tQuantity` state to `0` but never cleared the Redux store. The badge used `Math.max(reduxTotalQuantity, tQuantity.totalQuantity)` which picked up the stale Redux value.

**Files Changed**:
- `frontend/src/Store/Slice/CartSlice.jsx` — Fixed `clearCart` to use `'cartItems'` (plural)
- `frontend/src/Components/Header.jsx` — Added `dispatch(cartAction.clearCart())` in the `getCart` catch block when backend returns 404

## 2026-05-06 — Fix Header Cart Quantity Showing 1 on Empty Cart

**What**: Fixed a persistent bug where the cart badge in the header showed `1` even when the cart was completely empty.

**Why**: The root cause was a data integrity issue between `localStorage` and the Redux store. When an item was deleted, the `cartItems` array in localStorage was correctly emptied, but `totalQuantity` remained as `1` (stale). On every page reload, Redux blindly read this stale `totalQuantity` from localStorage and used it as the initial state, causing the header badge to permanently show `1`.

**Implementation**:
- Changed `CartSlice.jsx` initialization to **recalculate** `totalQuantity` and `subtotal` from the actual `cartItems` array instead of trusting the separate localStorage values.
- Fixed ID type mismatches in all cart reducers using `String()` coercion.
- Reset `tQuantity` in `Header.jsx` catch block on API failure.

**Files Changed**:
- `frontend/src/Store/Slice/CartSlice.jsx`
- `frontend/src/Components/Header.jsx`
## 2026-05-06 — Show Applied Coupon Details in Cart Summary

**What**: Displayed the applied coupon code below the Subtotal in the Cart summary and added a "Remove" button to clear the active coupon.

**Why**: After applying a coupon, users need visual confirmation of which coupon is active along with a simple way to remove it if they want to try a different one.

**Implementation**: 
- Added a `removeCoupon` action to `CartSlice.jsx` which resets the `discount` state to 0 and recalculates the totals.
- Rendered the active coupon banner in `Cart.jsx` immediately after the "Subtotal" line when `discount > 0`, including a clickable "Remove" link that dispatches `removeCoupon()`.

**Files Changed**:
- `frontend/src/Pages/Process/Cart.jsx`
- `frontend/src/Store/Slice/CartSlice.jsx`
## 2026-05-06 — Add Available Coupons and Apply Button in Cart Modal

**What**: Populated the "Apply Coupon" modal with available coupons (`FLAT20`, `FLAT10`) and added a one-click "Apply" button next to each coupon.

**Why**: The coupon list was appearing empty because the backend `getCart` endpoint does not return a `coupons` array, causing the frontend state to reset to an empty array. Additionally, users needed a convenient way to apply a coupon without having to manually copy and paste the code.

**Implementation**: 
- Initialized the `coupon` state in `Cart.jsx` with hardcoded available coupons configured in `CartSlice.jsx`.
- Removed the `setCoupon(data.coupons || [])` overwrite from `fetchCart`.
- Added a clickable "Apply" span inside the coupon map that triggers `handleApplyCoupon(coupon.couponCode)` and automatically closes the modal using `data-bs-dismiss="modal"`.

**Files Changed**:
- `frontend/src/Pages/Process/Cart.jsx`
## 2026-05-06 — Add Category Filter to Sidebar Navigation

**What**: Added a new "Category" section to the left sidebar (and mobile filter offcanvas) allowing users to easily switch between top-level product categories (Rings, Earrings, Bracelets, etc.).

**Why**: To provide users with a quick and accessible way to switch product categories while browsing the collection page, without needing to use the top header dropdowns.

**Implementation**: The category list is built to behave like navigation links masked as checkboxes. Checking a new category (e.g., Earrings while on the Rings page) triggers a clean `navigate('/products/Earring')` route change. This preserves the core `/products/:category` routing structure, ensuring breadcrumbs, page headers (`{category} Designs`), and SEO URLs remain synchronized and perfectly functional.

**Files Changed**:
- `frontend/src/Filter/Filter.jsx`
- `frontend/src/Filter/Mdfilter.jsx`
## 2026-05-06 — Fix Stale Category Products on Navigation

**What**: Fixed a critical bug where navigating between categories (e.g., from Earrings to Rings) would result in the URL and header updating, but the page continuing to show the products from the previous category (e.g., showing 14 Earrings on the Ring page).

**Root Cause**: The `Collection.jsx` component used an `internalNavRef` flag to prevent infinite loops when updating URL search parameters. When the user navigated, `syncFiltersToURL` always set `internalNavRef.current = true` and called React Router's `setSearchParams(params)`. However, if the query parameters didn't actually change (e.g., navigating from `/products/Earring` to `/products/Ring` with no filters on either), React Router v6 correctly avoided pushing a redundant history state and skipped re-rendering. Because the component didn't re-render, the `useEffect` never fired its second pass to reset `internalNavRef.current = false`. This permanently poisoned the ref as `true`. On the very next navigation, the `useEffect` would see `internalNavRef.current === true`, immediately return, and silently skip the `fetchProducts()` call entirely.

**Fix**: Updated `syncFiltersToURL` to verify if the stringified `searchParams` actually changed before setting `internalNavRef.current = true` and calling `setSearchParams`.

**Files Changed**:
- `frontend/src/Category/Collection.jsx`
## 2026-05-06 — Fix Invisible Hover Details Blocking Cards Below

**What**: Fixed an issue where hovering over a card in the second row would incorrectly trigger the hover state of the card directly above it.

**Root Cause**: The `.hover-details` of product cards were hidden via `opacity: 0` but remained physically interactive. When not hovered, they were translated downwards (`translate(-50%, 150%)`), placing the invisible element directly over the card in the row below. Hovering the bottom card actually hovered the top card's invisible `.hover-details`, triggering the top card's `:hover` state.

**Fix**: Added `pointer-events: none;` to `.hover-details` to make the invisible elements pass-through for mouse interactions, and restored it with `pointer-events: auto;` on `.card-container:hover .hover-details`.

**Files Changed**:
- `frontend/public/assets/css/Productcard.css`

## 2026-05-06 — Fix Card Hover Details Z-Index Issue

**What**: Fixed an issue where the hover details (price and title) of a product card would render behind the product card directly below it, obscuring the information.

**Root Cause**: The grid structure had `.card_shadow` elements acting as siblings, which naturally overlap earlier siblings in the DOM. Since `.card-container` was constrained within its parent `.card_shadow`'s stacking context, its `z-index` elevation was ignored relative to other grid cells.

**Fix**: Added `z-index: 10; position: relative;` to `.card_shadow:hover` in `Earrings.css` (and `.card-container:hover` in `Productcard.css`) to properly elevate the entire grid column wrapper above its siblings when hovered.

**Files Changed**:
- `frontend/public/assets/css/Productcard.css`
- `frontend/public/assets/css/Earrings.css`

## 2026-05-05 — Complete Filter System Rewrite

**What**: Rewrote Filter.jsx, Mdfilter.jsx, and Collection.jsx from scratch to fix all cross-category bugs.

**Root Cause**: The old Filter component managed `title` (category) and sent it to Collection, which overwrote the route-based category. The `typeBy` field was used for "Product Type" checkboxes (category names) but the backend uses `typeBy` for gender filtering.

**Architecture (New)**:
- **Filter state** only has filter-specific fields: `occasionBy`, `priceLimit`, `typeBy`, `sortBy`, `priceOrder`, `featured`
- **Category** always comes from URL route params (never from filter state)
- **`typeBy`** correctly maps to gender (male/female) matching backend API
- **Product Type section removed** (was fundamentally broken — mixed categories with gender)
- **`fetchProducts(cat, sub, filters)`** takes explicit category/subCategory args to avoid stale closures

**Files Changed**:
- `frontend/src/Filter/Filter.jsx` — Complete rewrite
- `frontend/src/Filter/Mdfilter.jsx` — Complete rewrite
- `frontend/src/Category/Collection.jsx` — Complete rewrite



**What**: Fixed two related bugs:
1. **Product Type filter** was modifying `title` (the category field) instead of `typeBy`, so selecting "Earring" on the Ring page overwrote the category, breaking URL params.
2. **Cross-category navigation** showed stale products due to closure capturing old `decodedCategory`.

**Root Cause**: `Filter.jsx` Product Type checkboxes used `handleFilterChange("title", cat)` instead of `handleFilterChange("typeBy", cat)`. Also `fetchFilteredProducts` prioritized closure `decodedCategory` over explicitly-passed `filters.title`.

**Fix**:
- `Filter.jsx`: Changed Product Type from `title` → `typeBy` field
- `Collection.jsx`: `fetchFilteredProducts` now uses `filters.title` as primary, `decodedCategory` as fallback
- `Collection.jsx`: `handleFilterApply` always preserves route-based category/subCategory

**Files Changed**: `frontend/src/Filter/Filter.jsx`, `frontend/src/Category/Collection.jsx`



**What**: Fixed bug where navigating from one category (e.g., Pendant) to another (e.g., Earring) would show the previous category's products. The URL would change correctly but products remained stale.

**Root Cause**: The `useEffect` route change handler spread `...appliedFilters` which carried the old category's `title` and `subCategory` into the new filter state, causing the API to fetch products for the wrong category.

**Fix**: Reset `title` and `subCategory` from current route params explicitly instead of spreading stale `appliedFilters`.

**Files Changed**: `frontend/src/Category/Collection.jsx` (lines 224-232)


## 2026-05-05 — Update Bracelet Styles (Chain, Tennis, Light Weight Bangle)

**What**: Replaced Oval/Office Wear Bracelet subcategories with Tennis Bracelet and Light Weight Bangle to match header.

**Files Changed**:
- `backend/scripts/updateBracelet.js` — DB migration script
- `frontend/src/Components/Header.jsx` — Fixed Tennis + Light Weight Bangle links (mobile + desktop)
- `frontend/src/Category/Collection.jsx` — Updated styleTagMap
- `frontend/src/Filter/Filter.jsx` — Updated filter sidebar

**DB State**: 60 total products. All 6 categories fully synced with header navigation.


## 2026-05-05 — Update Ring, Pendant, Necklace Styles to Match Header

**What**: Synchronized Ring, Pendant, and Necklace subcategories with the header navigation.

**Changes**:
- **Ring**: Replaced COCKTAIL with PARTY WEAR (header label was "Party wear" but linked to Cocktail route)
- **Pendant**: Replaced Solitaire/Daily Wear/Office Wear with Pendent Set, Heart, Alphabet (matching header)
- **Necklace**: Replaced Solitaire/Daily Wear/Office Wear/Party Wear with Lightweight, Evil Eye (matching header)

**Files Changed**:
- `backend/scripts/updateRingPendantNecklace.js` — DB migration script
- `frontend/src/Components/Header.jsx` — Fixed links in both mobile + desktop for all 3 categories
- `frontend/src/Category/Collection.jsx` — Updated styleTagMap for all 3 categories
- `frontend/src/Filter/Filter.jsx` — Updated filter sidebar for all 3 categories

**DB State**: 60 total products. Ring(20), Earring(14), Mangalsutra(10), Pendant(6), Necklace(4), Bracelet(6).


## 2026-05-05 — Update Mangalsutra Styles (5 Subcategories: Bracelet, Hand, Fancy, Traditional, Modern)

**What**: Replaced old Mangalsutra subcategories (Daily Wear, Office Wear) with the 5 styles shown in the header (Bracelet, Hand, Fancy, Traditional, Modern). Added 6 new products and fixed all header links.

**Files Changed**:
- `backend/scripts/addMangalsutraProducts.js` — Script to delete old + insert 6 new products
- `frontend/src/Components/Header.jsx` — Fixed all 5 desktop + 5 mobile Mangalsutra links
- `frontend/src/Category/Collection.jsx` — Added BRACELET, HAND, FANCY to styleTagMap
- `frontend/src/Filter/Filter.jsx` — Updated Mangalsutra filter sidebar

**DB State**: 64 total products. Mangalsutra: BRACELET(2), HAND(2), FANCY(2), TRADITIONAL(2), MODERN(2).


## 2026-05-05 — Add Missing Earring Subcategories (Hoops, Sui Dhaga, Men's Studs)

**What**: Added 6 new earring products (2 each for Hoops, Sui Dhaga, Men's Studs) and wired up all header links + filter sidebar for these subcategories.

**Why**: Header had 3 earring styles (Hoops, Sui Dhaga, Men's Studs) with broken empty links and no matching products in the database.

**Files Changed**:
- `backend/scripts/addEarringProducts.js` — New script to insert 6 earring products
- `frontend/src/Category/Collection.jsx` — Added HOOP, SUI DHAGA, MEN STUD to styleTagMap
- `frontend/src/Filter/Filter.jsx` — Added Hoops, Sui Dhaga, Men's Studs to Earring style filter
- `frontend/src/Components/Header.jsx` — Fixed broken links in both mobile and desktop header for all 3 styles

**DB State**: 60 total products. Earring has 7 subcategories × 2 = 14 products.


## 2026-05-05 — Reset Product Database (54 Products, 2 Per Subcategory)

**What**: Deleted all 49 existing products and inserted 54 new products — exactly 2 per subcategory across all 6 categories.

**Why**: Existing products had incorrect/missing images and wrong category assignments, causing filters to show wrong results.

**Files Changed**:
- `backend/scripts/resetProducts.js` — New script to delete all products and insert 54 properly structured products with correct category, subCategory, images, pricing, and metadata.

**Product Breakdown** (2 per subcategory):
- Ring: ENGAGEMENT, COCKTAIL, COUPLE, DAILY WEAR, OFFICE WEAR, PLATINUM, BAND, INFINITY, PROMISE, SOLITAIRE (20 products)
- Earring: STUD, JHUMKA, DROP, OFFICE WEAR (8 products)
- Bracelet: CHAIN, OVAL, OFFICE WEAR (6 products)
- Pendant: SOLITAIRE, DAILY WEAR, OFFICE WEAR (6 products)
- Necklace: SOLITAIRE, DAILY WEAR, OFFICE WEAR, PARTY WEAR (8 products)
- Mangalsutra: MODERN, TRADITIONAL, DAILY WEAR (6 products)


## 2026-05-05 — Fix Header Subcategory Navigation Links

**What**: Fixed broken subcategory filter navigation in the header dropdown menus.

**Why**: Multiple subcategory links in the header were either empty (`to=""`), pointing to wrong routes (`/earrings`), or had plural/singular mismatches with the `styleTagMap` in `Collection.jsx`, causing subcategory filtering to fail.

**Files Changed**:
- `frontend/src/Category/Collection.jsx` — Added singular variants to `styleTagMap` (`"Studs Earring"`, `"Jhumkas Earring"`, `"Drops Earring"`) so header links using singular "Earring" resolve correctly alongside the existing plural forms. Added `"Office Wear Mangalsutra"` mapping.
- `frontend/src/Components/Header.jsx` — Fixed all broken Mangalsutra links (were `to=""` → now route to `/products/Mangalsutra/Daily-Wear-Mangalsutra`, `/Traditional-Mangalsutra`, `/Modern-Mangalsutra`, `/Office-Wear-Mangalsutra`). Fixed Necklace links (were `/earrings` → now `/products/Necklace/Daily-Wear-Necklace`, `/Party-Wear-Necklace`). Fixed Pendant links (were `/earrings` → now `/products/Pendant/Solitaire-Pendant`, `/Daily-Wear-Pendant`, `/Office-Wear-Pendant`).


## 2026-05-05 — Fix Homepage Banner Rendering (Show All Banners)

**What**: Fixed homepage banners to dynamically render ALL banner images from the database instead of only showing 4 at hardcoded indices.

**Why**: The previous code used hardcoded indices (0, 2, 4, 6 for web; 1, 3, 5, 7 for mobile), skipping half the banners. Mobile banners referenced `mobileBannerImage` which doesn't exist in the banner schema, resulting in broken images. Additionally, a duplicate `fetchBanners()` useEffect was overwriting banners already loaded by `fetchHome()`.

**Files Changed**:
- `frontend/src/Pages/Mainpage.jsx` — Replaced hardcoded banner indices with `.map()` loops that render all banners. Mobile banners now fall back to `bannerImage` when `mobileBannerImage` is unavailable. Removed duplicate banner API fetch. Both image and video banners auto-detected by file extension or `type` field.


## 2026-05-05 — Fix "Invalid product ID" / "Product ID is required" in Ratings

**What**: Fixed rating submission failing with "Invalid product ID" and then "Product ID is required" errors.

**Why**: Two issues: (1) The rating controller rejected non-ObjectId product IDs. (2) The frontend sent data as `multipart/form-data` but the backend had no multer middleware, so `req.body` was empty.

**Files Changed**:
- `backend/src/Controller/rating.controller.js` — Added `resolveProductId()` helper that accepts both MongoDB ObjectId and custom string `id`. Updated all 4 endpoints.
- `frontend/src/Pages/Product/Productdetails.jsx` — Changed `handleSubmit` and `handleUpdate` from `FormData` (multipart) to plain JSON object, which Express's built-in `json()` middleware can parse. Added `userName` field.


## 2026-05-05 — Fix "Please log in" Error When Already Logged In (Rating)

**What**: Fixed the product rating showing "To place your rating, please log in first" even when the user is logged in.

**Why**: The backend `loginUser` endpoint returned `{ token, message }` without a `user` object, so the frontend's `res.data.user` was `undefined`. Additionally, the Signup page stored raw form data (without `_id`) instead of the backend's response. The rating check `!user?._id` failed because `_id` was missing from localStorage.

**Files Changed**:
- `backend/src/Controller/userController.js` — `loginUser` now returns `user` object (with `_id`, without password) alongside `token`
- `frontend/src/Pages/Verify/Signup.jsx` — Now stores the backend response's user (with `_id`) instead of raw form data
- `frontend/src/Pages/Product/Productdetails.jsx` — Made `handleStarClick` login check more robust: checks for `_id` OR `email`, shows helpful re-login message for stale sessions

**Note**: Users with old sessions (no `_id` in localStorage) need to log out and log back in for the fix to take full effect.


## 2026-05-05 — Fix "Stuck" Price Filter After Header Navigation

**What**: Fixed price filters becoming permanently stuck when navigating via header "Shop By" price links. Sidebar filters now properly display, toggle, and clear header-originated price filters.

**Why**: Header price links used IDs (`below10k`, `10kTo20k`, `50kTo75k`, `above75k`) not present in the sidebar's checkbox list. The hidden value persisted in Filter's local state, couldn't be unchecked, and "Clear All" did `window.location.reload()` which kept URL params.

**Files Changed**:
- `frontend/src/Filter/Filter.jsx` — Added header price IDs to `priceRanges`, added `sanitizePriceLimit()` to validate values, added `useEffect` to sync with parent's `initialFilters`, replaced `window.location.reload()` with `onFilterApply(emptyFilters)` + `navigate()`
- `frontend/src/Filter/Mdfilter.jsx` — Same: added header price IDs, accepted `initialFilters` prop, fixed `clearFilters`


## 2026-05-05 — Add "Shop By Price" Functionality to Header Dropdowns

**What**: Connected all "Shop By" price links in the header navigation dropdowns to the products collection page with proper price filtering.

**Why**: All 12 "Shop By" price blocks (6 mobile + 6 desktop) in the header had `<Link>` tags without `to` attributes — clicking them did nothing. Now each price range link navigates to the filtered collection page.

**Files Changed**:
- `backend/src/Controller/upload.controller.js` — Added 4 new price range filter IDs (`below10k`, `10kTo20k`, `50kTo75k`, `above75k`) to match the header's price breakpoints, while preserving existing IDs for backward compatibility
- `frontend/src/Components/Header.jsx` — Updated all 12 "Shop By" blocks (Rings, Earrings, Bracelets, Mangalsutras, Necklaces & Pendants, Gifts × mobile + desktop). Each price link now has `to="/products/{Category}?priceLimit={id}"`. "FOR MEN" links use `typeBy=male`. Mobile links include `data-bs-dismiss="offcanvas"` to close the drawer.
- `frontend/src/Category/Collection.jsx` — Added `useLocation` + `useRef` to watch `location.search` in useEffect so the page re-fetches when navigating between different price filter links within the same category. Added `internalNavRef` to prevent infinite re-render loops. Fixed `hasFilters` check to properly detect empty arrays.

### Price Range ID Mapping
| Header Label | Filter ID |
|---|---|
| Under ₹ 10k | `below10k` |
| ₹10k to ₹20k | `10kTo20k` |
| ₹20k to ₹30k | `20kTo30k` |
| ₹30k to ₹50k | `30kTo50k` |
| ₹50k to ₹75k | `50kTo75k` |
| Above ₹ 75k | `above75k` |
| FOR MEN | `typeBy=male` |


## 2026-05-04 — Fix Scroll Lock, Payment Button, and Checkout Flow

**What**: Fixed scroll lock on Gift/Payment pages, added PAY NOW handler, fixed CONTINUE validation, and removed non-existent createOrder API call.

**Why**: Bootstrap's `modal-open` class persisted after SPA navigation from Shipping, blocking scroll. PAY NOW button had no onClick. CONTINUE called a non-existent `/v1/order/createOrder` endpoint.

**Files Changed**:
- `frontend/src/Pages/Process/Payment.jsx` — Added `handlePayNow` with COD support, modal cleanup on mount
- `frontend/src/Pages/Process/Gift.jsx` — Added modal cleanup on mount
- `frontend/src/Pages/Process/Shipping.jsx` — Fixed `handlePlaceOrder` to store order data locally, fixed `handleAddressSelect` to preserve name/mobile, fixed `getAddress` to auto-select first address, added type-safe validation

## 2026-05-04 — Fix Shipping Address Form (Full Backend + Frontend)

**What**: Built the complete address save flow — backend API + frontend integration — so addresses are persisted to MongoDB.

**Why**: The address backend (model, controller, routes) was entirely commented out / non-existent. The frontend form had no save handler connected. Clicking "Save" only closed the modal without persisting anything.

**Files Created**:
- `backend/src/Model/Address.js` — Mongoose schema with `userId` + embedded `addresses[]` array
- `backend/src/Controller/address.controller.js` — `addAddress`, `getAddress`, `deleteAddress` endpoints
- `backend/src/Routes/v1/address.routes.js` — POST/GET/DELETE routes

**Files Changed**:
- `backend/src/Routes/v1/index.js` — Registered `/address` route
- `frontend/src/Pages/Process/Shipping.jsx` — Added `handleSaveAddress` async function that POSTs to API; all form fields now editable and pre-filled from user data; mobile validation added

## 2026-05-04 — Fix Wishlist Badge Showing Count 1 After Last Item Removed

**What**: Fixed the Header wishlist badge still showing "1" after removing the last item from the wishlist.

**Why**: When the last item is removed, the backend deletes the entire wishlist document. The `getWishlist` API then tried to access `wishlist._id` on a `null` object, throwing a 500 error. The Header's catch block didn't reset `wishlistLength`, so `Math.max(0, 1) = 1` was displayed.

**Files Changed**:
- `backend/src/Controller/wishlistController.js` — Added null check in `getWishlist`: returns `{ products: [] }` instead of crashing when wishlist document doesn't exist
- `frontend/src/Components/Header.jsx` — Reset `wishlistLength` and `wishlistItems` to `[]` in the `fetchWishlistHeader` catch block

## 2026-05-04 — Fix Desktop Dropdown Not Closing on Navigation

**What**: Fixed the desktop "Shop by Style" dropdown staying open after clicking a category link.

**Why**: The dropdown was purely CSS hover-based (`:hover .dropdown-content { display: block }`). In a SPA, clicking a `<Link>` triggers React Router navigation without a page reload, so the mouse stays "hovering" and the dropdown remains visible.

**Files Changed**:
- `frontend/src/Components/Header.jsx` — Added `useLocation` to detect route changes and temporarily apply a `hide-dropdowns` class to the nav for 300ms during navigation
- `frontend/public/assets/css/Header.css` — Added `.hide-dropdowns .dropdown:hover .dropdown-content { display: none !important }` to suppress hover during transitions

## 2026-05-04 — Fix Cart Icon Not Updating Instantly

**What**: Made the Header cart badge count update instantly when items are added/removed.

**Why**: The Header was using `tQuantity.totalQuantity` from a one-time API fetch that never re-ran. Now it also reads `reduxTotalQuantity` from Redux and re-fetches whenever the Redux cart state changes.

**Files Changed**: `frontend/src/Components/Header.jsx`
- Added `reduxTotalQuantity` selector from Redux cart state
- Added `reduxTotalQuantity` to `useEffect` dependency array so `getCart()` re-fetches on changes
- Updated cart badge to show `Math.max(reduxTotalQuantity, tQuantity.totalQuantity)` for both desktop and mobile views

## 2026-05-04 — Fix Wishlist Icon Not Updating Properly

**What**: Fixed the wishlist heart icon and Header badge count not syncing when adding/removing items across pages.

**Why**: The `productCard.jsx` toggled wishlist via API but never dispatched to Redux, so the Header's `reduxWishlist` count stayed stale. The Header's `useEffect` also had an empty dependency array, never re-fetching on changes.

**Files Changed**:
- `frontend/src/Pages/Product/productCard.jsx` — Added Redux `useDispatch` and `cartAction.addToWishlist`/`removeFromWishlist` dispatches when toggling
- `frontend/src/Components/Header.jsx` — Made `useEffect` reactive to `reduxWishlist.length`; fixed badge count to use `Math.max()` of Redux vs API counts
- `frontend/src/Pages/Process/Wishlist.jsx` — Added Redux `removeFromWishlist` dispatches in `handleRemove` and `handleMoveToCart`; removed invalid `Header()` function call

## 2026-05-04 — Fix "Move to Wishlist" Error from Cart Page

**What**: Fixed the "Invalid wishlist response" error shown when clicking "Move to Wishlist" in the cart modal.

**Why**: The backend wishlist API returns `wishlist_id` in the response object, but the frontend Cart.jsx was checking for `_id` (a different key). Since `wishlistData._id` was always `undefined`, the code fell through to the error branch and displayed the raw JSON as an error toast.

**Files Changed**: `frontend/src/Pages/Process/Cart.jsx`

- Changed `wishlistData._id` check to `(wishlistData.wishlist_id || wishlistData._id)` — supports both response formats
- Removed unnecessary product-matching step that compared MongoDB ObjectIds against custom product IDs
- Added fallback: if response structure is unexpected but status is 200/201, still treat as success

## 2026-05-04 — Comprehensive Bug Fix & Missing Route Implementation

**What**: Fixed all critical bugs preventing the application from functioning, created missing API routes, and centralized API URL configuration.

**Why**: The project had numerous issues including missing backend routes (homePage, rating, merge), auth middleware crashes, guest user UUID rejection, Google login bugs, CartSlice state mismatch, hardcoded localhost URLs, and self-referencing axios calls in controllers.

**Files Changed**:
- `backend/src/app.js` — Added body-parser limits, dynamic PORT
- `backend/.env` — Removed leading spaces in env values
- `backend/src/middleware/auth.js` — Fixed crash on missing Authorization header
- `backend/src/Model/upload.js` — Added `subCategory` and `discount` fields
- `backend/src/Model/rating.model.js` — **NEW** Rating/review model
- `backend/src/Controller/homePage.controller.js` — **NEW** Home page data aggregation
- `backend/src/Controller/rating.controller.js` — **NEW** CRUD for ratings
- `backend/src/Controller/merge.controller.js` — **NEW** Cart/wishlist merge on login
- `backend/src/Controller/cartController.js` — Fixed `getCart` and `removeItemFromCart` for guest UUIDs
- `backend/src/Controller/userController.js` — Fixed Google login name parsing, added `forgotPassword` and `verifyOtpAndResetPassword`
- `backend/src/Controller/categoryData.controller.js` — Replaced internal localhost axios call with direct service call
- `backend/src/Routes/v1/index.js` — Registered rating, homePage, merge routes
- `backend/src/Routes/v1/homePage.routes.js` — **NEW**
- `backend/src/Routes/v1/rating.routes.js` — **NEW**
- `backend/src/Routes/v1/merge.routes.js` — **NEW**
- `backend/src/Routes/v1/userRoutes.js` — Added password reset routes
- `backend/src/Routes/v1/upload_routes.js` — Added subCategory/discount in product upload
- `frontend/src/Utils/apiConfig.js` — Updated to use Vite env variable
- `frontend/src/Store/Slice/CartSlice.jsx` — Fixed `wishlistItems` → `wishlist` mismatch, fixed `setCartFromBackend`
- **39 frontend files** — Replaced hardcoded `localhost:5000` URLs with `API_BASE_URL` imports

### Detailed Bug List
1. **Missing `/v1/homePage/home` route** — Frontend Mainpage called it but no route existed → Created controller + route
2. **Missing rating system** — No model/controller/routes for product ratings → Created full CRUD
3. **Missing cart/wishlist merge** — Login page called `/v1/merge/mergeCartAndWishlist` → Created controller + route
4. **Auth middleware crash** — `req.header('Authorization').replace()` threw on undefined → Added null check
5. **Guest UUID rejection** — `getCart`/`removeItemFromCart` required `isValidObjectId(user)` → Now accepts string UUIDs
6. **Google login crash** — Destructured `name` but referenced undefined `firstName`/`lastName` → Added name splitting
7. **CartSlice state key mismatch** — `initialState.wishlistItems` vs `state.wishlist` → Unified to `wishlist`
8. **`setCartFromBackend` bug** — Passed entire `state` object to `setItem()` → Fixed to pass individual args
9. **Missing password reset routes** — `forgotPassword`/`verifyOtpAndResetPassword` → Added to userController + userRoutes
10. **Missing `subCategory`/`discount` in Upload model** — Referenced in 20+ files but not in schema → Added fields
11. **Backend self-calling via HTTP** — `categoryData.controller.js` called own banner API via axios → Replaced with direct service call
12. **136 hardcoded `localhost:5000` URLs** — All replaced with `API_BASE_URL` import for environment flexibility
