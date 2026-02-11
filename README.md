# AI-Powered Financial Wellness Platform: Intelligent Budget Forecasting & Health Assessment System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8+-green.svg)](https://www.mongodb.com/)
[![AI-Powered](https://img.shields.io/badge/AI-Powered-Gemini-orange.svg)](https://ai.google.dev/)

> A comprehensive AI-powered financial management platform that combines intelligent budget forecasting, financial health assessment, and spending pattern analysis using Google Gemini AI.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [AI Integration](#-ai-integration)
- [Database Schema](#-database-schema)
- [Security Features](#-security-features)
- [Performance & Scalability](#-performance--scalability)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🎯 Overview

This Advanced MERN AI Financial SaaS Platform is a cutting-edge financial management solution that leverages artificial intelligence to provide users with comprehensive insights into their financial health, intelligent budget forecasting, and personalized financial recommendations.

### Key Highlights

- **🤖 AI-Powered Analysis**: Google Gemini AI integration for intelligent financial insights
- **📊 Financial Health Scoring**: Comprehensive 0-100 financial wellness assessment
- **🔮 Budget Forecasting**: AI-driven budget predictions and recommendations
- **📈 Advanced Analytics**: Detailed spending patterns and financial trends
- **🔄 Automated Operations**: Scheduled reports and recurring transaction management
- **🔒 Enterprise Security**: JWT authentication, input validation, and secure APIs

### Project Status

- **Technology Readiness Level**: TRL 7-8 (System Prototype & System Complete)
- **Development Phase**: Production-ready with continuous enhancement
- **AI Integration**: Fully functional Google Gemini AI services
- **Security**: Enterprise-grade authentication and data protection

## ✨ Features

### 🧠 AI-Powered Financial Health Assessment

- **Comprehensive Scoring**: 0-100 overall financial health rating
- **Multi-Dimensional Analysis**: 5 key financial metrics assessment
  - Income-Expense Ratio (25% weight)
  - Savings Rate (25% weight)
  - Emergency Fund Adequacy (20% weight)
  - Debt-to-Income Ratio (20% weight)
  - Spending Efficiency (10% weight)
- **AI-Generated Insights**: Personalized recommendations and actionable advice
- **Historical Tracking**: Assessment history with trend analysis

### 🔮 Intelligent Budget Forecasting

- **Time Horizons**: Configurable forecasting periods (1-6 months)
- **Granularity Options**: Weekly or monthly budget breakdowns
- **AI Recommendations**: Category-specific budget suggestions
- **Confidence Scoring**: Reliability indicators for predictions
- **Risk Assessment**: Identifies potential financial risks
- **Customizable Parameters**: Income overrides and savings targets

### 💰 Transaction Management

- **Full CRUD Operations**: Create, read, update, delete transactions
- **Recurring Transactions**: Automated recurring transaction handling
- **Category Management**: Flexible spending categorization
- **Payment Methods**: Multiple payment method support
- **Receipt Upload**: Cloudinary integration for receipt storage
- **AI Receipt Scanning**: Automated transaction extraction (planned)

### 📊 Advanced Analytics & Reporting

- **Spending Patterns**: AI-powered spending behavior analysis
- **Financial Reports**: Comprehensive financial summaries
- **Data Visualization**: Charts and graphs using Recharts
- **Export Functionality**: CSV/PDF report generation
- **Scheduled Reports**: Automated report generation via cron jobs
- **Real-time Dashboards**: Live financial data visualization

### 🔐 User Management & Security

- **Authentication System**: JWT-based secure authentication
- **Profile Management**: User profile and settings
- **Role-based Access**: User permission management
- **Data Privacy**: User-isolated data access
- **Secure APIs**: CORS protection and input validation

## 🏗️ Technology Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development environment
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Redux Toolkit**: State management with RTK Query
- **React Router**: Client-side routing
- **Recharts**: Data visualization library

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Type-safe backend development
- **MongoDB**: NoSQL database with Mongoose ODM
- **Passport.js**: Authentication middleware
- **JWT**: JSON Web Token authentication
- **Node-cron**: Scheduled task management

### AI & External Services
- **Google Gemini AI**: Advanced AI model for financial analysis
- **Cloudinary**: Cloud-based image and file management
- **Resend**: Email service for notifications and reports

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript**: Static type checking
- **Git**: Version control system
- **npm**: Package management

## 🏛️ Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React)       │◄──►│   (Express)     │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   AI Services   │
                       │  (Google Gemini)│
                       └─────────────────┘
```

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
├── features/           # Feature-based organization
│   ├── auth/          # Authentication logic
│   ├── transaction/   # Transaction management
│   ├── financial-health/ # Financial analysis
│   ├── budget-forecast/ # Budget planning
│   ├── analytics/     # Data visualization
│   ├── report/        # Report generation
│   └── user/          # User management
├── pages/             # Route components
├── layouts/           # Layout components
├── hooks/             # Custom React hooks
├── context/           # React context providers
└── lib/               # Utility libraries
```

### Backend Architecture
```
src/
├── config/            # Configuration files
├── controllers/       # Request handlers
├── services/          # Business logic
├── models/            # Database schemas
├── routes/            # API endpoints
├── middlewares/       # Request processing
├── utils/             # Utility functions
├── validators/        # Input validation
├── cron/              # Scheduled jobs
└── mailers/           # Email services
```

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **MongoDB**: Version 5 or higher
- **Git**: For version control

### Required API Keys
- **Google Gemini AI**: For AI-powered financial analysis
- **Cloudinary**: For file upload and storage
- **Resend**: For email services

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Advanced-MERN-AI-Financial-SaaS-Platform-main
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Environment Configuration
Create environment files for both backend and frontend:

#### Backend (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=8000
BASE_PATH=/api
FRONTEND_ORIGIN=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/financial_platform

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=7d

# AI Services
GEMINI_API_KEY=your_gemini_api_key_here

# File Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Services
RESEND_API_KEY=your_resend_api_key
RESEND_MAILER_SENDER=your_email@domain.com
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Financial Wellness Platform
```

## ⚙️ Configuration

### Database Setup
1. Start MongoDB service
2. Create database: `financial_platform`
3. Ensure proper indexing for performance

### AI Service Configuration
1. Obtain Google Gemini API key from [Google AI Studio](https://ai.google.dev/)
2. Configure API key in backend environment
3. Test AI service connectivity

### File Storage Setup
1. Create Cloudinary account
2. Configure cloud name, API key, and secret
3. Set up upload presets for optimal performance

## 🎮 Usage

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:8000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will start on `http://localhost:5173`

### Production Mode

#### Build Backend
```bash
cd backend
npm run build
npm start
```

#### Build Frontend
```bash
cd client
npm run build
npm run preview
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Token refresh

### Transaction Endpoints
- `GET /api/transaction` - Get transactions
- `POST /api/transaction` - Create transaction
- `PUT /api/transaction/:id` - Update transaction
- `DELETE /api/transaction/:id` - Delete transaction

### Financial Health Endpoints
- `POST /api/financial-health/generate` - Generate assessment
- `GET /api/financial-health/latest` - Get latest assessment
- `GET /api/financial-health/history` - Get assessment history

### Budget Forecast Endpoints
- `POST /api/ai/budget-forecast` - Generate budget forecast
- `GET /api/ai/budget-forecast/history` - Get forecast history

### Analytics Endpoints
- `GET /api/analytics/summary` - Summary analytics
- `GET /api/analytics/chart` - Chart data
- `GET /api/analytics/expense-breakdown` - Expense breakdown

### Report Endpoints
- `GET /api/report` - Get reports
- `POST /api/report/generate` - Generate report
- `GET /api/report/export/:id` - Export report

## 🤖 AI Integration

### Google Gemini AI Services

#### Financial Health Assessment
- Analyzes transaction history
- Generates comprehensive scoring
- Provides personalized insights
- Offers actionable recommendations

#### Budget Forecasting
- Predicts future spending patterns
- Recommends budget allocations
- Assesses financial risks
- Provides confidence scoring

#### Spending Pattern Analysis
- Identifies behavioral trends
- Categorizes spending habits
- Suggests optimization strategies
- Tracks improvement over time

### AI Service Architecture
```typescript
// Example AI service integration
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = `Analyze the following financial data...`;
const result = await model.generateContent(prompt);
```

## 🗄️ Database Schema

### User Model
```typescript
interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Model
```typescript
interface Transaction {
  _id: ObjectId;
  userId: ObjectId;
  type: "INCOME" | "EXPENSE";
  title: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  paymentMethod: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}
```

### Financial Health Model
```typescript
interface FinancialHealth {
  _id: ObjectId;
  userId: ObjectId;
  assessmentDate: Date;
  overallScore: number;
  categoryScores: {
    incomeExpenseRatio: number;
    savingsRate: number;
    emergencyFundAdequacy: number;
    debtToIncomeRatio: number;
    spendingEfficiency: number;
  };
  aiInsights: {
    summary: string;
    keyStrengths: string[];
    areasOfConcern: string[];
    priorityActions: string[];
    longTermRecommendations: string[];
  };
}
```

### Budget Forecast Model
```typescript
interface BudgetForecast {
  _id: ObjectId;
  userId: ObjectId;
  horizonMonths: number;
  granularity: "monthly" | "weekly";
  totalBudgetPerPeriod: number;
  categories: BudgetCategoryRecommendation[];
  confidence: {
    overall: number;
    factors?: string[];
  };
  assumptions?: string[];
  risks?: string[];
}
```

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: BCrypt with salt rounds
- **Route Protection**: Middleware-based access control
- **Token Refresh**: Automatic token renewal

### Data Protection
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Mongoose ODM
- **XSS Protection**: Helmet security headers
- **CORS Configuration**: Controlled cross-origin access

### API Security
- **Rate Limiting**: Request throttling
- **Request Validation**: Comprehensive input checking
- **Error Handling**: Secure error responses
- **Logging**: Security event tracking

## ⚡ Performance & Scalability

### Database Optimization
- **Compound Indexes**: Efficient query performance
- **Connection Pooling**: Optimized database connections
- **Query Optimization**: Efficient data retrieval
- **Caching Strategy**: Redis integration (planned)

### Frontend Performance
- **Code Splitting**: Lazy loading of components
- **Bundle Optimization**: Vite build optimization
- **State Management**: Efficient Redux implementation
- **Image Optimization**: Cloudinary integration

### Backend Performance
- **Async Operations**: Non-blocking request handling
- **Middleware Optimization**: Efficient request processing
- **Error Handling**: Graceful error management
- **Resource Management**: Memory and CPU optimization

## 🛠️ Development

### Code Quality Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit validation

### Development Workflow
1. Feature branch creation
2. Development and testing
3. Code review process
4. Merge to main branch
5. Automated deployment

### Testing Strategy
- **Unit Testing**: Component and service testing
- **Integration Testing**: API endpoint testing
- **E2E Testing**: Full user journey testing
- **Performance Testing**: Load and stress testing

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd client
npm test
```

### Test Coverage
- **Backend**: API endpoints, services, models
- **Frontend**: Components, hooks, utilities
- **Integration**: API communication, data flow
- **Performance**: Response times, resource usage

## 🚀 Deployment

### Production Environment
- **Backend**: Node.js hosting (Heroku, DigitalOcean, AWS)
- **Frontend**: Static hosting (Vercel, Netlify, AWS S3)
- **Database**: MongoDB Atlas or self-hosted
- **File Storage**: Cloudinary production account

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database connection established
- [ ] AI services accessible
- [ ] SSL certificates installed
- [ ] Monitoring tools configured
- [ ] Backup systems in place

### Monitoring & Maintenance
- **Health Checks**: API endpoint monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: Response time tracking
- **Security Monitoring**: Threat detection and prevention

## 🤝 Contributing

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Development Setup
1. Follow the installation instructions
2. Set up development environment
3. Follow coding standards
4. Test your changes thoroughly

### Code Review Process
- Automated testing and validation
- Manual code review
- Security and performance assessment
- Documentation updates



