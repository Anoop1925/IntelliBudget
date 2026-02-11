<div align="center">

# 💰 Sampatti - AI Financial Wellness Platform

### Intelligent Budget Forecasting & Financial Health Assessment System

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google AI](https://img.shields.io/badge/Google_Gemini-AI_Powered-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**Transform your financial future with AI-powered insights, intelligent forecasting, and personalized recommendations**

[Features](#-key-features) • [Quick Start](#-quick-start) • [Tech Stack](#-technology-stack) • [API Docs](#-api-documentation) • [Deployment](#-deployment)

---

</div>

## 🎯 Overview

**Sampatti** is a cutting-edge MERN stack financial management platform that leverages Google Gemini AI to revolutionize personal finance management. Get comprehensive insights into your financial health, receive intelligent budget forecasts, and make data-driven financial decisions.

<div align="center">

### 🌟 Why Sampatti?

| Feature | Benefit |
|---------|---------|
| 🤖 **AI-Powered Analysis** | Google Gemini AI provides intelligent financial insights and personalized recommendations |
| 📊 **Financial Health Scoring** | Comprehensive 0-100 wellness assessment across 5 key metrics |
| 🔮 **Smart Forecasting** | AI-driven budget predictions with confidence scoring and risk assessment |
| 📈 **Advanced Analytics** | Real-time dashboards with detailed spending patterns and trends |
| ⏱️ **Automated Operations** | Scheduled reports and recurring transaction management |
| 🔒 **Enterprise Security** | JWT authentication, input validation, and secure APIs |

</div>

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🧠 AI-Powered Financial Health

- **Comprehensive Scoring System**
  - 0-100 overall financial wellness rating
  - Multi-dimensional analysis across 5 metrics
  - Historical tracking with trend analysis

- **Weighted Assessment Metrics**
  - Income-Expense Ratio (25%)
  - Savings Rate (25%)
  - Emergency Fund Adequacy (20%)
  - Debt-to-Income Ratio (20%)
  - Spending Efficiency (10%)

- **AI-Generated Insights**
  - Personalized recommendations
  - Actionable financial advice
  - Risk identification & mitigation

</td>
<td width="50%">

### 🔮 Intelligent Budget Forecasting

- **Flexible Time Horizons**
  - Configurable periods (1-6 months)
  - Weekly or monthly granularity
  - Custom date range support

- **AI-Driven Predictions**
  - Category-specific recommendations
  - Confidence scoring system
  - Risk assessment alerts

- **Customizable Parameters**
  - Income overrides
  - Savings targets
  - Spending limits

</td>
</tr>
<tr>
<td width="50%">

### 💰 Transaction Management

- **Complete CRUD Operations**
  - Create, read, update, delete
  - Bulk import via CSV
  - Receipt upload support

- **Smart Features**
  - Recurring transactions
  - Category management
  - Multiple payment methods
  - Status tracking

- **Cloud Integration**
  - Cloudinary receipt storage
  - Secure file handling

</td>
<td width="50%">

### 📈 Advanced Analytics

- **Real-Time Dashboards**
  - Live financial data
  - Interactive charts (Recharts)
  - Spending patterns analysis

- **Comprehensive Reports**
  - Financial summaries
  - Export to CSV/PDF
  - Scheduled generation

- **Data Visualization**
  - Expense breakdowns
  - Income trends
  - Category comparisons

</td>
</tr>
</table>

---

## 🏗️ Technology Stack

<div align="center">

### Frontend Technologies

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=flat-square&logo=redux&logoColor=white)

### Backend Technologies

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8+-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

### AI & Cloud Services

![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email-000000?style=flat-square&logo=mail.ru&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas))
- **API Keys** (Google Gemini, Cloudinary, Resend)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Sampatti-main

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Setup

#### Backend `.env` (in `backend/` folder)

```env
# Server Configuration
NODE_ENV=development
PORT=8000
BASE_PATH=/api
FRONTEND_ORIGIN=http://localhost:5173

# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/financial_platform?retryWrites=true&w=majority

# JWT Secrets (generate random 32+ character strings)
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_strong_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=7d

# Google Gemini AI (https://ai.google.dev/)
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary (https://cloudinary.com/)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend Email (https://resend.com/)
RESEND_API_KEY=your_resend_api_key
RESEND_MAILER_SENDER=onboarding@resend.dev
```

#### Frontend `.env` (in `client/` folder)

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Go to **Network Access** → Add IP Address → **Allow Access from Anywhere**
4. Go to **Database Access** → Create database user
5. Get connection string and update `MONGO_URI` in backend `.env`

### Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Server runs on `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

### First Time Setup

1. Open `http://localhost:5173`
2. Click **Sign Up** to create your account
3. Login with your credentials
4. Start managing your finances!

---

## 🏛️ System Architecture

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│                     │         │                     │         │                     │
│   React Frontend    │◄───────►│  Express Backend    │◄───────►│  MongoDB Database   │
│   (Port 5173)       │         │   (Port 8000)       │         │   (Atlas Cloud)     │
│                     │         │                     │         │                     │
└─────────────────────┘         └──────────┬──────────┘         └─────────────────────┘
                                           │
                                           ▼
                                ┌─────────────────────┐
                                │                     │
                                │  Google Gemini AI   │
                                │  Cloudinary         │
                                │  Resend Email       │
                                │                     │
                                └─────────────────────┘
```

### Project Structure

```
Sampatti-main/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middlewares/     # Request processing
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Input validation
│   │   ├── cron/            # Scheduled jobs
│   │   └── mailers/         # Email services
│   ├── package.json
│   └── tsconfig.json
│
└── client/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── features/        # Feature modules
    │   ├── pages/           # Route pages
    │   ├── layouts/         # Layout components
    │   ├── hooks/           # Custom React hooks
    │   ├── app/             # Redux store
    │   └── lib/             # Utilities
    ├── package.json
    └── vite.config.ts
```

---

## 📚 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh-token` | Refresh access token |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transaction` | Get all transactions |
| POST | `/api/transaction` | Create transaction |
| PUT | `/api/transaction/:id` | Update transaction |
| DELETE | `/api/transaction/:id` | Delete transaction |

### Financial Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/financial-health/generate` | Generate health assessment |
| GET | `/api/financial-health/latest` | Get latest assessment |
| GET | `/api/financial-health/history` | Get assessment history |

### Budget Forecast

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/budget-forecast` | Generate AI forecast |
| GET | `/api/ai/budget-forecast/history` | Get forecast history |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/summary` | Get summary analytics |
| GET | `/api/analytics/chart` | Get chart data |
| GET | `/api/analytics/expense-breakdown` | Get expense breakdown |

---

## 🤖 AI Integration

### Google Gemini AI Features

**Financial Health Assessment**
- Analyzes transaction history and patterns
- Generates comprehensive 0-100 scoring
- Provides personalized insights and recommendations
- Identifies financial risks and opportunities

**Budget Forecasting**
- Predicts future spending patterns
- Recommends optimal budget allocations
- Assesses financial risks
- Provides confidence scoring for predictions

**Spending Pattern Analysis**
- Identifies behavioral trends
- Categorizes spending habits
- Suggests optimization strategies
- Tracks improvement over time

---

## 🗄️ Database Schema

### User Model
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  profilePicture?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: "INCOME" | "EXPENSE",
  title: string,
  amount: number,
  category: string,
  date: Date,
  isRecurring: boolean,
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY",
  paymentMethod: string,
  status: "PENDING" | "COMPLETED" | "FAILED"
}
```

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth with refresh tokens
- ✅ **Password Hashing** - BCrypt with salt rounds
- ✅ **Input Validation** - Zod schema validation
- ✅ **CORS Protection** - Controlled cross-origin access
- ✅ **XSS Protection** - Helmet security headers
- ✅ **Rate Limiting** - Request throttling (planned)

---

## 🚀 Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/) → Import Project
3. Select `client` folder as root directory
4. Add environment variable:
   - `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com/api`
5. Deploy

### Deploy Backend to Render

1. Go to [Render](https://render.com/) → New Web Service
2. Connect GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add all environment variables from `.env`
5. Update `FRONTEND_ORIGIN` to your Vercel URL
6. Deploy

### Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] All API keys configured
- [ ] Environment variables set
- [ ] CORS origins updated
- [ ] SSL certificates active
- [ ] Database backups enabled

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Support

For support, email support@sampatti.com or open an issue on GitHub.

---

<div align="center">

**Made with ❤️ by the Sampatti Team**

⭐ Star this repo if you find it helpful!

</div>
