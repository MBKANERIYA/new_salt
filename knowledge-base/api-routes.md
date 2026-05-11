# Backend API Routes

## V1 Routes (prefix: `/v1`)

### Upload (`/v1/upload`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/post_upload` | Bulk upload/update products |
| GET    | `/get_upload` | Get all products |
| GET    | `/get_id/:id` | Get product by ID |
| GET    | `/get_similar/:id` | Get similar products |
| POST   | `/filterProduct` | Filter products by criteria |

### Cart (`/v1/cart`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/addCart` | Add item to cart |
| GET    | `/getCart/:user` | Get user's cart (supports UUID) |
| DELETE | `/removeCart/:user/:product` | Remove item from cart |

### Wishlist (`/v1/wishlist`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/create_wishlist` | Add to wishlist |
| GET    | `/get_wishlist/:userId` | Get user's wishlist |
| DELETE | `/remove_wishlist/:userId/:productId` | Remove from wishlist |

### Banner (`/v1/banner`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/bannerAdd` | Add banner (multipart) |
| GET    | `/bannerGet` | Get all banners |
| DELETE | `/bannerRemove/:id` | Delete banner |

### Category (`/v1/category`)
| Method | Path | Description |
|--------|------|-------------|
| GET    | `/categoryData/:gender?` | Get category data by gender |
| GET    | `/getCategoryAndSubCategoryDetails` | Get all categories with subcategories |

### OTP (`/v1/otp`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/send-otp` | Send OTP to email |
| POST   | `/get-otp` | Verify OTP |

### Rating (`/v1/rating`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/addRating` | Add product rating |
| GET    | `/getRating/:productId` | Get ratings for product |
| PUT    | `/updateRating` | Update existing rating |
| DELETE | `/deleteRating/:productId/:userId` | Delete rating |

### Home Page (`/v1/homePage`)
| Method | Path | Description |
|--------|------|-------------|
| GET    | `/home` | Get all homepage data (banners, products, categories) |

### Merge (`/v1/merge`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/mergeCartAndWishlist` | Merge guest cart/wishlist into user account |

### Admin (`/v1/admin`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/create-admin` | Create admin user |

## User Routes (prefix: `/api/users`)
| Method | Path | Description |
|--------|------|-------------|
| POST   | `/register` | Register new user |
| POST   | `/login` | Login user |
| POST   | `/google-login` | Google OAuth login |
| POST   | `/logout` | Logout user |
| GET    | `/profile` | Get user profile (auth required) |
| GET    | `/:id` | Get user by ID |
| POST   | `/forgotPassword/:userId` | Initiate password reset |
| POST   | `/verifyOtpAndResetPassword/:userId` | Reset password with OTP |
