# INSTALLATION GUIDE - SANAÉRA E-Commerce Platform

## Prerequisites

- **Node.js**: Version 18.17+ (LTS)
- **npm** or **yarn**: Package manager
- **PostgreSQL**: Version 12+
- **Git**: Version control
- **Code Editor**: VS Code recommended
- **Accounts**: Cloudinary, Razorpay/Stripe (optional for development)

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/santhrasatheesh-crypto/sanaera-ecommerce.git
cd sanaera-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 15 and React
- Prisma ORM
- Tailwind CSS
- All other required packages

**Expected installation time**: 2-5 minutes

### 3. PostgreSQL Database Setup

#### On macOS (using Homebrew):

```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb sanaera_db

# Create database user (optional)
creatuser sanaera_user
```

#### On Windows:

1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer and follow prompts
3. Remember the password you set
4. Open pgAdmin and create database `sanaera_db`

#### On Linux (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

sudo -u postgres createdb sanaera_db
sudo -u postgres createuser sanaera_user
sudo -u postgres psql -c "ALTER USER sanaera_user WITH PASSWORD 'your_password';"
```

### 4. Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update:

```env
# DATABASE - REQUIRED
DATABASE_URL="postgresql://username:password@localhost:5432/sanaera_db"

# NextAuth - REQUIRED
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_command_below

# JWT Secret - REQUIRED
JWT_SECRET=your_jwt_secret_min_32_chars

# Cloudinary - OPTIONAL (for development, use placeholder)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay - OPTIONAL (test mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# Stripe - OPTIONAL (test mode)
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Email - OPTIONAL
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Admin
ADMIN_EMAIL=admin@sanaera.com
ADMIN_PASSWORD=Admin@123456
```

**Generate secure secrets:**

```bash
# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Database Initialization

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data (optional)
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

**Output:**
```
▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verification Checklist

- [ ] Node.js installed: `node --version` (v18.17+)
- [ ] npm installed: `npm --version`
- [ ] PostgreSQL running: `psql --version`
- [ ] Repository cloned
- [ ] Dependencies installed: `node_modules` folder exists
- [ ] `.env.local` created with all variables
- [ ] Database migrations completed
- [ ] Dev server running on port 3000
- [ ] Home page loads at `http://localhost:3000`

## Testing the Installation

### Test API Endpoints

```bash
# In a new terminal:

# Get products
curl http://localhost:3000/api/products

# Get categories
curl http://localhost:3000/api/categories
```

### Test with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import collection from `/api-docs/postman.json` (if available)
3. Test endpoints

## Troubleshooting

### Issue: "Cannot find module 'next'"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Database connection failed"

Verify PostgreSQL:
```bash
psql -U postgres -h localhost
\l  # List databases
```

Check `DATABASE_URL` format in `.env.local`

### Issue: "Port 3000 already in use"

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Issue: "Prisma error"

```bash
# Reset Prisma
rm -rf prisma/dev.db
npm run prisma:generate
npm run prisma:migrate
```

## Optional: External Service Setup

### Cloudinary (Image Management)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get Cloud Name, API Key, API Secret from dashboard
3. Update `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

### Razorpay (Payment Gateway)

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get test API keys from dashboard
3. Update `.env.local`:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### Gmail SMTP (Email)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password
3. Update `.env.local`:
```env
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## Project Structure After Installation

```
sanaera-ecommerce/
├── src/                    # Source code
├── prisma/                 # Database schema
├── public/                 # Static files
├── node_modules/          # Dependencies
├── .env.local             # Environment variables (YOU CREATE)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Development Workflow

### Daily Development

```bash
# Start dev server
npm run dev

# In another terminal, watch database
npm run prisma:studio

# In another terminal, run linting
npm run lint
```

### Database Changes

```bash
# Modify prisma/schema.prisma
# Then run:
npm run prisma:migrate
npm run prisma:generate
```

### Building for Production

```bash
npm run build
npm run start
```

## Next Steps

1. **Customize branding** in `src/components/Navigation/Navbar.tsx`
2. **Add products** via admin dashboard at `/admin/dashboard`
3. **Configure payment gateways** for real transactions
4. **Setup email service** for order notifications
5. **Deploy to Vercel** when ready

## Support

If you encounter issues:

1. Check [troubleshooting section](#troubleshooting) above
2. Review error messages carefully
3. Check `.env.local` configuration
4. Review PostgreSQL connection
5. Consult [Next.js docs](https://nextjs.org/docs)
6. Open GitHub issue

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Installation complete! Happy coding! 🚀**
