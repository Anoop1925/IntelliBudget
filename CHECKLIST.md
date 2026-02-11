# ✅ MASTER SETUP CHECKLIST

## 🎯 YOUR MISSION
Get this Financial Wellness Platform running locally, then deploy it online.

---

## 📋 PHASE 1: LOCAL SETUP

### Prerequisites
- [ ] Node.js 18+ installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Code editor installed (VS Code recommended)
- [ ] 2 terminals/command prompts ready

### API Keys Collection (30 minutes)
- [ ] **MongoDB Atlas** - Database
  - [ ] Account created at https://www.mongodb.com/cloud/atlas/register
  - [ ] Free M0 cluster created
  - [ ] Database user created (username + password saved)
  - [ ] Network access set to 0.0.0.0/0 (anywhere)
  - [ ] Connection string copied and modified
  - [ ] Added to `backend\.env` as `MONGO_URI`
  - 📖 See: `MONGODB_SETUP.md` for detailed steps

- [ ] **Google Gemini AI** - AI Features
  - [ ] Account created at https://aistudio.google.com/
  - [ ] API key generated
  - [ ] Added to `backend\.env` as `GEMINI_API_KEY`

- [ ] **Cloudinary** - File Storage
  - [ ] Account created at https://cloudinary.com/users/register_free
  - [ ] Cloud Name copied
  - [ ] API Key copied
  - [ ] API Secret copied
  - [ ] All three added to `backend\.env`

- [ ] **Resend** - Email Service
  - [ ] Account created at https://resend.com/signup
  - [ ] API key generated
  - [ ] Added to `backend\.env` as `RESEND_API_KEY`

### Environment Files
- [ ] `backend\.env` exists (✅ already created)
- [ ] `client\.env` exists (✅ already created)
- [ ] All API keys added to `backend\.env`
- [ ] No `<placeholders>` remaining in .env files
- [ ] No extra spaces or quotes around values

### Dependencies Installation
- [ ] Backend dependencies installed
  ```bash
  cd backend
  npm install
  ```
- [ ] Frontend dependencies installed
  ```bash
  cd client
  npm install
  ```
- [ ] No error messages during installation

### Running Locally
- [ ] Backend started successfully
  ```bash
  cd backend
  npm run dev
  ```
  - [ ] See: "Connected to MongoDB database"
  - [ ] See: "Server is running on port 8000"
  - [ ] No error messages

- [ ] Frontend started successfully (new terminal)
  ```bash
  cd client
  npm run dev
  ```
  - [ ] See: "Local: http://localhost:5173/"
  - [ ] No error messages

### Testing Locally
- [ ] Opened http://localhost:5173 in browser
- [ ] See login/signup page
- [ ] Created test account
- [ ] Logged in successfully
- [ ] Can create transactions
- [ ] Can view dashboard
- [ ] All features working

---

## 🚀 PHASE 2: DEPLOYMENT (Optional - Do after local works)

### GitHub Setup
- [ ] GitHub account created
- [ ] New repository created
- [ ] Code pushed to GitHub
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin YOUR_REPO_URL
  git push -u origin main
  ```

### Backend Deployment (Render)
- [ ] Render account created at https://render.com/
- [ ] New Web Service created
- [ ] GitHub repo connected
- [ ] Root Directory set to `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] Backend URL copied (e.g., https://xxx.onrender.com)
- [ ] Tested backend URL in browser

### Frontend Deployment (Vercel)
- [ ] Vercel account created at https://vercel.com/
- [ ] Project imported from GitHub
- [ ] Root Directory set to `client`
- [ ] Environment variable added:
  - `VITE_API_BASE_URL` = your Render backend URL + `/api`
- [ ] Project deployed successfully
- [ ] Frontend URL copied (e.g., https://xxx.vercel.app)

### Final Configuration
- [ ] Updated `FRONTEND_ORIGIN` in Render to Vercel URL
- [ ] Waited for Render to redeploy (2-3 minutes)
- [ ] Tested production app
- [ ] Can signup/login on production
- [ ] All features working online

---

## 📁 FILES CREATED FOR YOU

| File | Purpose | Status |
|------|---------|--------|
| `backend\.env` | Backend environment variables | ✅ Created |
| `client\.env` | Frontend environment variables | ✅ Created |
| `SETUP_GUIDE.md` | Detailed setup instructions | ✅ Created |
| `MONGODB_SETUP.md` | MongoDB Atlas guide | ✅ Created |
| `DEPLOYMENT_GUIDE.md` | Deployment instructions | ✅ Created |
| `QUICK_REFERENCE.md` | Quick reference card | ✅ Created |
| `CHECKLIST.md` | This file | ✅ Created |

---

## 🆘 HELP RESOURCES

**If you get stuck, check these files:**

1. **General Setup** → `SETUP_GUIDE.md`
2. **MongoDB Issues** → `MONGODB_SETUP.md`
3. **Quick Reference** → `QUICK_REFERENCE.md`
4. **Deployment** → `DEPLOYMENT_GUIDE.md`

**Common Issues:**
- MongoDB connection error → Check `MONGODB_SETUP.md`
- Port already in use → Change PORT in backend\.env
- Module not found → Delete node_modules, run npm install again
- CORS error → Check FRONTEND_ORIGIN matches your frontend URL

---

## 📞 NEXT STEPS

### Right Now:
1. Open `SETUP_GUIDE.md`
2. Follow steps 1-8
3. Get app running locally

### After Local Works:
1. Test all features thoroughly
2. Open `DEPLOYMENT_GUIDE.md`
3. Deploy to Render + Vercel
4. Share your live app with the world! 🌍

---

## 🎉 SUCCESS CRITERIA

**Local Setup Complete When:**
- ✅ Both terminals running without errors
- ✅ Can access http://localhost:5173
- ✅ Can create account and login
- ✅ Can add transactions
- ✅ Dashboard shows data

**Deployment Complete When:**
- ✅ App accessible via public URL
- ✅ Can signup/login on production
- ✅ All features work online
- ✅ No console errors in browser

---

## 💾 SAVE THESE DETAILS

After setup, save this info somewhere safe:

```
=== LOCAL ===
Frontend: http://localhost:5173
Backend: http://localhost:8000

=== PRODUCTION (after deployment) ===
Frontend: https://your-app.vercel.app
Backend: https://your-backend.onrender.com

=== CREDENTIALS ===
MongoDB Username: [your username]
MongoDB Password: [your password]
MongoDB Connection String: [your connection string]

=== API KEYS ===
Gemini API Key: [your key]
Cloudinary Cloud Name: [your cloud name]
Cloudinary API Key: [your key]
Cloudinary API Secret: [your secret]
Resend API Key: [your key]
```

---

## 🏁 START HERE

**Your first step:** Open `SETUP_GUIDE.md` and start with Step 1!

**Estimated Time:**
- Local Setup: 30-45 minutes
- Deployment: 20-30 minutes
- **Total: ~1 hour**

**You got this! 💪**
