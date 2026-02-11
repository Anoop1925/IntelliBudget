# 🚀 DEPLOYMENT GUIDE - Vercel + Render

## Prerequisites
✅ Local setup working perfectly
✅ GitHub account
✅ Code pushed to GitHub repository

---

## 📦 STEP 1: PUSH CODE TO GITHUB

### If you haven't created a repo yet:

1. Go to: https://github.com/new
2. Repository name: `financial-wellness-platform`
3. Keep it **Private** (recommended) or Public
4. **DO NOT** initialize with README (you already have code)
5. Click "Create repository"

### Push your code:

```bash
# In your project root folder (Sampatti-main)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/financial-wellness-platform.git
git push -u origin main
```

---

## 🖥️ STEP 2: DEPLOY BACKEND TO RENDER

### 2.1 Create Render Account
1. Go to: https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest)

### 2.2 Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository
4. Select your `financial-wellness-platform` repo

### 2.3 Configure Service
Fill in these settings:

**Basic Settings:**
- **Name:** `financial-wellness-backend` (or any name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (0$/month)

### 2.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add ALL these variables (copy from your `backend\.env`):

```
NODE_ENV=production
PORT=8000
BASE_PATH=/api
FRONTEND_ORIGIN=https://your-app-name.vercel.app

MONGO_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/financial_platform?retryWrites=true&w=majority

JWT_SECRET=super_secret_jwt_key_min_32_characters_long_12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super_secret_refresh_jwt_key_min_32_characters_long_67890
JWT_REFRESH_EXPIRES_IN=7d

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
RESEND_API_KEY=YOUR_RESEND_API_KEY
RESEND_MAILER_SENDER=onboarding@resend.dev
```

**⚠️ IMPORTANT:**
- Keep `FRONTEND_ORIGIN` as placeholder for now (we'll update it after deploying frontend)
- Use your ACTUAL values for all other variables

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. You'll see logs in real-time
4. Once done, you'll see "Live" status
5. **COPY YOUR BACKEND URL** (e.g., `https://financial-wellness-backend.onrender.com`)

### 2.6 Test Backend
Open: `https://your-backend-url.onrender.com/api`
You should see an error message (this is normal - means backend is running)

---

## 🌐 STEP 3: DEPLOY FRONTEND TO VERCEL

### 3.1 Create Vercel Account
1. Go to: https://vercel.com/signup
2. Sign up with GitHub (easiest)
3. Authorize Vercel to access your repos

### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Import your `financial-wellness-platform` repository
3. Click "Import"

### 3.3 Configure Project
**Framework Preset:** Vite (should auto-detect)

**Root Directory:** 
- Click "Edit"
- Select `client` folder
- Click "Continue"

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

### 3.4 Add Environment Variable
Click "Environment Variables"

Add this variable:
```
Name: VITE_API_BASE_URL
Value: https://your-backend-url.onrender.com/api
```

**Replace** `your-backend-url.onrender.com` with your ACTUAL Render backend URL from Step 2.5

### 3.5 Deploy
1. Click "Deploy"
2. Wait 2-5 minutes
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your live app
5. **COPY YOUR FRONTEND URL** (e.g., `https://financial-wellness-platform.vercel.app`)

---

## 🔄 STEP 4: UPDATE BACKEND CORS

Now that you have frontend URL, update backend:

### 4.1 Update Render Environment Variable
1. Go to Render Dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Find `FRONTEND_ORIGIN`
5. Update value to: `https://your-app-name.vercel.app` (your actual Vercel URL)
6. Click "Save Changes"
7. Service will auto-redeploy (wait 2-3 minutes)

---

## ✅ STEP 5: TEST PRODUCTION APP

1. Open your Vercel URL: `https://your-app-name.vercel.app`
2. Try to sign up / login
3. Create transactions
4. Test all features

**If everything works, CONGRATULATIONS! 🎉**

---

## 🆘 TROUBLESHOOTING

### Backend Build Failed on Render
**Error:** "Cannot find module"
→ Check `Root Directory` is set to `backend`
→ Verify `Build Command` is: `npm install && npm run build`

**Error:** "MongoDB connection failed"
→ Check `MONGO_URI` environment variable
→ Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Frontend Build Failed on Vercel
**Error:** "Command failed"
→ Check `Root Directory` is set to `client`
→ Try clearing cache: Settings → Clear Cache and Redeploy

### CORS Error in Browser
**Error:** "Access to fetch blocked by CORS"
→ Update `FRONTEND_ORIGIN` in Render to match your Vercel URL
→ Make sure there's no trailing slash in URL
→ Wait for Render to redeploy after changing env variable

### API Calls Failing
**Error:** "Failed to fetch"
→ Check `VITE_API_BASE_URL` in Vercel matches your Render backend URL
→ Make sure backend URL ends with `/api`
→ Test backend URL directly in browser

### Render Free Tier Sleeping
**Issue:** First request takes 30-60 seconds
→ This is normal for Render free tier
→ Service "sleeps" after 15 minutes of inactivity
→ First request "wakes it up"
→ Consider upgrading to paid tier ($7/month) for always-on

---

## 💰 COST BREAKDOWN

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **MongoDB Atlas** | FREE forever | 512MB storage |
| **Render** | FREE | Sleeps after 15min inactivity, 750 hours/month |
| **Vercel** | FREE | 100GB bandwidth, unlimited projects |
| **Gemini AI** | FREE | 60 requests/minute |
| **Cloudinary** | FREE | 25GB storage, 25GB bandwidth |
| **Resend** | FREE | 100 emails/day |

**Total Cost: $0/month** ✅

---

## 🔄 UPDATING YOUR APP

### When you make code changes:

**For Backend:**
1. Push changes to GitHub: `git push`
2. Render auto-deploys (if enabled)
3. Or manually: Render Dashboard → Manual Deploy

**For Frontend:**
1. Push changes to GitHub: `git push`
2. Vercel auto-deploys automatically
3. Takes 2-3 minutes

---

## 📊 MONITORING

### Render Dashboard
- View logs: Click service → "Logs" tab
- Check status: Green = running, Red = error
- View metrics: CPU, Memory usage

### Vercel Dashboard
- View deployments: All deployments listed
- Check analytics: Visitor stats
- View logs: Click deployment → "Logs"

---

## 🎯 DEPLOYMENT CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL copied
- [ ] Backend FRONTEND_ORIGIN updated with Vercel URL
- [ ] Frontend VITE_API_BASE_URL points to Render backend
- [ ] Tested signup/login on production
- [ ] All features working

**Once all checked, your app is LIVE! 🚀**

---

## 🔗 USEFUL LINKS

- Render Dashboard: https://dashboard.render.com/
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repo: https://github.com/YOUR_USERNAME/financial-wellness-platform

---

## 📝 SAVE THESE URLS

After deployment, save these:

```
Frontend URL: https://your-app-name.vercel.app
Backend URL: https://your-backend.onrender.com
GitHub Repo: https://github.com/YOUR_USERNAME/financial-wellness-platform
MongoDB Atlas: https://cloud.mongodb.com/
```

**DONE! Your app is now accessible worldwide! 🌍**
