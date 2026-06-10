# API Documentation - SANAÉRA E-Commerce

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { /* response data */ },
  "error": null
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "errors": { "field": ["error1", "error2"] }
}
```

## Authentication Endpoints

### Register User

**POST** `/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER"
  }
}
```

**Validation:**
- Email must be valid
- Password must be 8+ chars with uppercase, lowercase, numbers
- Name is optional

---

### Login

**POST** `/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### Get Current User

**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+91XXXXXXXXXX",
    "image": "https://...",
    "role": "CUSTOMER",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Product Endpoints

### Get Products

**GET** `/products`

**Query Parameters:**
```
?featured=true              # Get featured products
&limit=10                   # Results per page (default: 10)
&category=category_id       # Filter by category
&minPrice=0                 # Minimum price
&maxPrice=100000            # Maximum price
&sort=newest                # Sort: newest, popular, price-low, price-high
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "name": "Silk Saree",
      "slug": "silk-saree",
      "description": "...",
      "price": 8500,
      "compareAtPrice": 10000,
      "image": "https://...",
      "images": ["https://..."],
      "category": "category_id",
      "stock": 45,
      "ratings": 4.5,
      "reviews": 12
    }
  ]
}
```

---

### Get Product Detail

**GET** `/products/[slug]`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Silk Saree",
    "slug": "silk-saree",
    "description": "Premium silk saree...",
    "price": 8500,
    "compareAtPrice": 10000,
    "images": [
      {
        "url": "https://...",
        "alt": "Front view"
      }
    ],
    "variants": [
      {
        "id": "variant_id",
        "name": "Size S",
        "sku": "SAR-001-S",
        "price": 8500,
        "stock": 10,
        "size": "S",
        "color": "Red",
        "fabric": "Silk"
      }
    ],
    "reviews": [
      {
        "id": "review_id",
        "rating": 5,
        "title": "Beautiful saree!",
        "comment": "Excellent quality...",
        "userName": "Sarah",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "stock": 45,
    "sku": "SAR-001"
  }
}
```

---

### Get Categories

**GET** `/categories`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Sarees",
      "slug": "sarees",
      "description": "Traditional sarees",
      "image": "https://...",
      "children": [
        {
          "id": "sub_cat_id",
          "name": "Silk Sarees",
          "slug": "silk-sarees"
        }
      ]
    }
  ]
}
```

---

## Cart Endpoints

### Get Cart

**GET** `/cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "cart_item_id",
      "productId": "product_id",
      "product": {
        "id": "product_id",
        "name": "Silk Saree",
        "slug": "silk-saree",
        "price": 8500,
        "image": "https://..."
      },
      "quantity": 1,
      "size": "M",
      "color": "Red"
    }
  ]
}
```

---

### Add to Cart

**POST** `/cart`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "productId": "product_id",
  "quantity": 1,
  "size": "M",
  "color": "Red"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Added to cart",
  "data": { /* cart item */ }
}
```

---

### Update Cart Item

**PATCH** `/cart/[id]`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "quantity": 2
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Cart updated",
  "data": { /* updated cart item */ }
}
```

---

### Remove from Cart

**DELETE** `/cart/[id]`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Removed from cart",
  "data": null
}
```

---

## Order Endpoints

### Get Orders

**GET** `/orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id",
      "orderNumber": "ORD-001",
      "status": "DELIVERED",
      "paymentStatus": "COMPLETED",
      "total": 9500,
      "items": [
        {
          "id": "order_item_id",
          "productName": "Silk Saree",
          "productImage": "https://...",
          "quantity": 1,
          "price": 8500,
          "size": "M",
          "color": "Red"
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Order Detail

**GET** `/orders/[id]`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "order_id",
    "orderNumber": "ORD-001",
    "status": "DELIVERED",
    "paymentStatus": "COMPLETED",
    "items": [ /* order items */ ],
    "shippingAddress": {
      "addressLine1": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India"
    },
    "subtotal": 8500,
    "tax": 765,
    "shippingCost": 235,
    "discountAmount": 0,
    "total": 9500
  }
}
```

---

## Wishlist Endpoints

### Get Wishlist

**GET** `/wishlist`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "wishlist_item_id",
      "product": {
        "id": "product_id",
        "name": "Silk Saree",
        "slug": "silk-saree",
        "price": 8500,
        "image": "https://..."
      }
    }
  ]
}
```

---

### Add to Wishlist

**POST** `/wishlist`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "productId": "product_id"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Added to wishlist",
  "data": { /* wishlist item */ }
}
```

---

## Address Endpoints

### Get Addresses

**GET** `/addresses`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "address_id",
      "addressLine1": "123 Main St",
      "addressLine2": "Apt 5",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India",
      "phoneNumber": "+91XXXXXXXXXX",
      "isDefault": true
    }
  ]
}
```

---

### Add Address

**POST** `/addresses`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 5",
  "city": "Mumbai",
  "state": "Maharashtra",
  "zipCode": "400001",
  "country": "India",
  "phoneNumber": "+91XXXXXXXXXX",
  "isDefault": true
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Address added",
  "data": { /* address */ }
}
```

---

## Coupon Endpoints

### Validate Coupon

**GET** `/coupons/validate?code=SUMMER20`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "coupon_id",
    "code": "SUMMER20",
    "discountType": "PERCENTAGE",
    "discountValue": 20,
    "maxDiscount": 2000,
    "minOrderValue": 5000
  }
}
```

---

## Review Endpoints

### Create Review

**POST** `/reviews`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "productId": "product_id",
  "rating": 5,
  "title": "Amazing product!",
  "comment": "Excellent quality and fast delivery."
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Review created",
  "data": { /* review */ }
}
```

---

## Newsletter Endpoints

### Subscribe to Newsletter

**POST** `/newsletter/subscribe`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Subscribed to newsletter",
  "data": { /* subscription */ }
}
```

---

## Admin Endpoints

### Admin Login

**POST** `/admin/auth/login`

**Request:**
```json
{
  "email": "admin@sanaera.com",
  "password": "Admin@123456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "admin_id",
      "email": "admin@sanaera.com",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### Get Dashboard Stats

**GET** `/admin/stats`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "totalRevenue": { "_sum": { "total": 1234500 } },
    "totalCustomers": 92,
    "totalProducts": 156,
    "recentOrders": [ /* order list */ ]
  }
}
```

---

### Get All Orders (Admin)

**GET** `/admin/orders`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [ /* orders list */ ]
}
```

---

### Get All Products (Admin)

**GET** `/admin/products`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [ /* products list */ ]
}
```

---

### Create Product (Admin)

**POST** `/admin/products`

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Silk Saree",
  "slug": "silk-saree",
  "description": "Premium silk saree",
  "price": 8500,
  "compareAtPrice": 10000,
  "categoryId": "category_id",
  "sku": "SAR-001",
  "stock": 100
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Product created",
  "data": { /* product */ }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Invalid email format"],
    "password": ["Must be 8+ characters"]
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

- **Default**: 100 requests per 15 minutes per IP
- **Auth endpoints**: 5 requests per 15 minutes per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Pagination

For endpoints that return lists, use:

```
?page=1&limit=20
```

Response includes:
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

**Last Updated**: January 2024
