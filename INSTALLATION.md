# SANAÉRA Installation Guide

## Prerequisites

- Node.js 18+ (https://nodejs.org/)
- npm or yarn
- Git

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/santhrasatheesh-crypto/sanaera-ecommerce.git
cd sanaera-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
- `DATABASE_URL`: sqlite:./prisma/dev.db (local dev)
- `NEXTAUTH_SECRET`: Generate secure random string
- `NEXTAUTH_URL`: http://localhost:3000

### 4. Setup Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin/login
  - Email: admin@sanaera.com
  - Password: Admin@123456

## Features

✅ User Authentication (NextAuth.js)
✅ Product Management with Filters
✅ Shopping Cart & Wishlist
✅ Admin Dashboard with Analytics
✅ Order Tracking & Status Updates
✅ Low Stock Alerts
✅ Payment Ready (Razorpay)
✅ SQLite Local Dev / PostgreSQL Production

## Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
npm run lint             # Run ESLint
```

## Deployment

Vercel (Recommended):
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

Railway/AWS:
1. `npm run build`
2. `npm start`
3. Set environment variables
4. Deploy container

## Troubleshooting

### Port Already in Use
```bash
lsof -ti:3000 | xargs kill -9
```

### Database Error
```bash
rm prisma/dev.db
npm run prisma:migrate
```

### NextAuth Error
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Next Steps

1. Customize brand colors in `tailwind.config.ts`
2. Add product images
3. Configure Razorpay payment gateway
4. Setup email notifications
5. Deploy to production

Happy coding! 🚀
