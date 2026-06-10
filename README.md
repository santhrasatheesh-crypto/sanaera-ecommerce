# SANAÉRA - Luxury Fashion E-Commerce Platform

**FOR EVERY VERSION OF YOU**

A production-ready, full-stack luxury fashion e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## 🌟 Features

### Frontend
- **Luxury Design System** - Custom Tailwind CSS configuration with sophisticated color palette (Ice Melt, Merlot, Deep Espresso, Cream)
- **Responsive UI** - Mobile-first design with seamless desktop experience
- **Framer Motion Animations** - Smooth, elegant animations throughout
- **Product Showcase** - High-quality image galleries with zoom functionality
- **Advanced Filtering** - Filter by category, price, size, color, fabric
- **Shopping Cart** - Persistent cart with real-time updates
- **Wishlist** - Save favorite products
- **User Accounts** - Registration, login, profile management
- **Order Tracking** - View order history and status

### Backend
- **Secure Authentication** - JWT-based auth with refresh tokens
- **Password Hashing** - bcryptjs for secure password storage
- **API Routes** - RESTful API with comprehensive endpoints
- **Database** - PostgreSQL with Prisma ORM
- **Data Validation** - Input validation on all endpoints
- **Error Handling** - Consistent error response format

### Admin Dashboard
- **Dashboard Overview** - Sales analytics and key metrics
- **Product Management** - Add, edit, delete products
- **Order Management** - View and manage orders
- **Customer Management** - View customer details
- **Analytics** - Revenue and performance tracking
- **Secure Access** - Admin-only routes with authentication

### Payment Integration
- **Razorpay** - Indian payment gateway support
- **Stripe** - International payment support
- **Multiple Payment Methods** - Credit/Debit cards, UPI, Net Banking
- **PCI Compliance** - Secure payment processing

### Additional Features
- **Newsletter Subscription** - Email marketing integration
- **Product Reviews** - Customer ratings and comments
- **Coupon Management** - Discount and promo code support
- **Email Notifications** - Order confirmations and updates
- **SEO Optimization** - Meta tags, structured data, sitemaps
- **Image Optimization** - Cloudinary integration for responsive images

## 📁 Project Structure

```
sanaera-ecommerce/
├── src/
│   ├── app/
│   │   ├── (pages)
│   │   │   ├── page.tsx                    # Home page
│   │   │   ├── shop/page.tsx              # Shop/Products page
│   │   │   ├── about/page.tsx             # About page
│   │   │   ├── contact/page.tsx           # Contact page
│   │   │   ├── account/page.tsx           # User account
│   │   │   └── auth/login/page.tsx        # Authentication
│   │   ├── admin/
│   │   │   └── dashboard/page.tsx         # Admin dashboard
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── products/route.ts
│   │   │   ├── categories/route.ts
│   │   │   ├── cart/route.ts
│   │   │   ├── wishlist/route.ts
│   │   │   ├── orders/route.ts
│   │   │   ├── addresses/route.ts
│   │   │   ├── reviews/route.ts
│   │   │   ├── coupons/route.ts
│   │   │   ├── newsletter/route.ts
│   │   │   └── admin/
│   │   │       ├── auth/route.ts
│   │   │       ├── stats/route.ts
│   │   │       ├── orders/route.ts
│   │   │       └── products/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navigation/
│   │   │   └── Navbar.tsx
│   │   ├── Layout/
│   │   │   └── Footer.tsx
│   │   ├── Products/
│   │   │   └── ProductCard.tsx
│   │   └── Auth/
│   │       └── LoginForm.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useCart.ts
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   └── email.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   └── api-response.ts
│   └── store/
│       └── (Zustand stores)
│
├── prisma/
│   └── schema.prisma              # Database schema
│
├── public/
│   └── (static assets)
│
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Swiper** - Carousel/slider component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework (optional, if adding separate backend)
- **Prisma** - ORM for PostgreSQL
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending

### Database
- **PostgreSQL** - Production database
- **Prisma Client** - Database client and ORM

### External Services
- **Cloudinary** - Image management and optimization
- **Razorpay** - Payment gateway
- **Stripe** - International payments
- **SendGrid/SMTP** - Email service

## 📋 Prerequisites

Before getting started, ensure you have:

- Node.js 18.17+ (LTS recommended)
- npm or yarn package manager
- PostgreSQL 12+ database
- Git
- Environment variables configured

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/santhrasatheesh-crypto/sanaera-ecommerce.git
cd sanaera-ecommerce
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sanaera_db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_very_secure_random_secret_key_here_min_32_chars

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=your_jwt_secret_key_min_32_chars_very_secure

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Admin
ADMIN_EMAIL=admin@sanaera.com
ADMIN_PASSWORD=Admin@123456
```

### 4. Database Setup

```bash
# Create the database
creatdb sanaera_db

# Run Prisma migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate

# Seed the database (optional)
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer jwt_token_here
```

### Product Endpoints

#### Get Products
```
GET /api/products?category=cat_id&minPrice=0&maxPrice=100000&sort=newest&limit=10
```

#### Get Product Detail
```
GET /api/products/[slug]
```

#### Get Categories
```
GET /api/categories
```

### Cart Endpoints

#### Get Cart
```
GET /api/cart
Authorization: Bearer jwt_token_here
```

#### Add to Cart
```
POST /api/cart
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 1,
  "size": "M",
  "color": "black"
}
```

#### Update Cart Item
```
PATCH /api/cart/[id]
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "quantity": 2
}
```

#### Remove from Cart
```
DELETE /api/cart/[id]
Authorization: Bearer jwt_token_here
```

### Order Endpoints

#### Get Orders
```
GET /api/orders
Authorization: Bearer jwt_token_here
```

#### Get Order Detail
```
GET /api/orders/[id]
Authorization: Bearer jwt_token_here
```

### Wishlist Endpoints

#### Get Wishlist
```
GET /api/wishlist
Authorization: Bearer jwt_token_here
```

#### Add to Wishlist
```
POST /api/wishlist
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "productId": "product_id"
}
```

### Admin Endpoints

#### Admin Login
```
POST /api/admin/auth/login
Content-Type: application/json

{
  "email": "admin@sanaera.com",
  "password": "Admin@123456"
}
```

#### Get Dashboard Stats
```
GET /api/admin/stats
Authorization: Bearer admin_jwt_token
```

#### Get All Products (Admin)
```
GET /api/admin/products
Authorization: Bearer admin_jwt_token
```

#### Create Product (Admin)
```
POST /api/admin/products
Authorization: Bearer admin_jwt_token
Content-Type: application/json

{
  "name": "Product Name",
  "slug": "product-name",
  "description": "...",
  "price": 5000,
  "categoryId": "cat_id",
  "sku": "SKU-001",
  "stock": 100
}
```

## 🎨 Design System

### Color Palette

```
Ice Melt:       #C7D8E8  (Light blue-gray)
Merlot:         #5E1020  (Deep red-burgundy)
Deep Espresso:  #1A0905  (Nearly black)
Cream:          #F7F3EE  (Off-white)
```

### Typography

```
Headings:  Cormorant Garamond, Playfair Display (serif)
Body:      Inter, Manrope, DM Sans (sans-serif)
Letter Spacing: 0.08em - 0.15em (luxury feel)
```

### Spacing
Follows Tailwind's default scale (4px base unit)

## 🔐 Security Features

- **JWT Authentication** with refresh tokens
- **Password Hashing** using bcryptjs
- **HTTPS Headers** for security
- **CORS Protection**
- **Rate Limiting** on API endpoints
- **Input Validation** on all endpoints
- **SQL Injection Prevention** via Prisma
- **XSS Protection** with secure headers
- **Admin Route Protection** with role-based access

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Railway/AWS

1. Push code to GitHub
2. Connect repository to Railway/AWS
3. Set environment variables
4. Deploy automatically

### Database Migration

```bash
npm run prisma:migrate:prod
```

## 📊 Database Schema

Key Models:

- **User** - Customer and admin accounts
- **Product** - Product catalog with images and variants
- **Category** - Product categorization (hierarchical)
- **Collection** - Product collections/campaigns
- **Cart** - Shopping cart items
- **Wishlist** - Saved products
- **Order** - Customer orders and transactions
- **OrderItem** - Individual items in orders
- **Review** - Product reviews and ratings
- **Address** - Customer addresses
- **Coupon** - Discount codes
- **Newsletter** - Email subscribers

## 🧪 Testing

To test the API endpoints:

```bash
# Using curl
curl -X GET http://localhost:3000/api/products

# Using Postman
# Import API requests from `/api-docs` folder
```

## 📝 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
npm run db:seed          # Seed database
npm run db:reset         # Reset database
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For support:
- Email: support@sanaera.com
- GitHub Issues: [Create an issue](https://github.com/santhrasatheesh-crypto/sanaera-ecommerce/issues)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations
- [ ] Live chat support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Virtual try-on feature
- [ ] Loyalty program
- [ ] Social commerce integration

## 👏 Acknowledgments

- Designed with inspiration from luxury fashion brands
- Built with modern web technologies
- Community-driven improvements welcome

---

**Made with ❤️ for SANAÉRA**

*For every version of you.*
