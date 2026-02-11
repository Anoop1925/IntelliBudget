# COMPLETE SETUP GUIDE - Financial Wellness Platform

## 📦 STEP 1: INSTALL NODE.JS (If not installed)

1. Go to: https://nodejs.org/
2. Download LTS version (18 or higher)
3. Install it (keep clicking Next)
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

## 🗄️ STEP 2: SETUP MONGODB (Cloud - Easiest Option)

### Option A: MongoDB Atlas (FREE & RECOMMENDED)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/Email
   - Choose FREE tier (M0 Sandbox)

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin` (or any name you want)
   - Password: Click "Autogenerate Secure Password" and COPY IT
   - User Privileges: "Atlas admin"
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" (left sidebar)
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you copied earlier
   - Add database name: `financial_platform` before the `?`
   - Final format:
     ```
     mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/financial_platform?retryWrites=true&w=majority
     ```

6. **Update Backend .env**
   - Open: `backend\.env`
   - Replace the `MONGO_URI` line with your connection string

---

## 🤖 STEP 3: GET GOOGLE GEMINI API KEY (FREE)

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Click "Create API key in new project"
5. Copy the API key
6. Open `backend\.env`
7. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key

---

## ☁️ STEP 4: GET CLOUDINARY CREDENTIALS (FREE)

1. Go to: https://cloudinary.com/users/register_free
2. Sign up (free account)
3. After login, you'll see Dashboard
4. Copy these 3 values:
   - Cloud Name
   - API Key
   - API Secret
5. Open `backend\.env`
6. Replace:
   - `YOUR_CLOUDINARY_CLOUD_NAME` with Cloud Name
   - `YOUR_CLOUDINARY_API_KEY` with API Key
   - `YOUR_CLOUDINARY_API_SECRET` with API Secret

---

## 📧 STEP 5: GET RESEND API KEY (FREE)

1. Go to: https://resend.com/signup
2. Sign up (free account - 100 emails/day)
3. After login, go to: https://resend.com/api-keys
4. Click "Create API Key"
5. Name it: "Financial Platform"
6. Copy the API key
7. Open `backend\.env`
8. Replace `YOUR_RESEND_API_KEY` with your actual key
9. Keep `RESEND_MAILER_SENDER=onboarding@resend.dev` (this is Resend's test email)

---

## 📦 STEP 6: INSTALL DEPENDENCIES

Open Command Prompt or PowerShell in your project folder:

### Install Backend Dependencies
```bash
cd backend
npm install
```
Wait for it to complete (may take 2-5 minutes)

### Install Frontend Dependencies
```bash
cd ../client
npm install
```
Wait for it to complete (may take 2-5 minutes)

---

## 🚀 STEP 7: RUN THE APPLICATION

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```
You should see:
- "Connected to MongoDB database"
- "Server is running on port 8000 in development mode"

### Terminal 2 - Start Frontend (Open NEW terminal)
```bash
cd client
npm run dev
```
You should see:
- "Local: http://localhost:5173/"

---

## ✅ STEP 8: TEST THE APPLICATION

1. Open browser: http://localhost:5173
2. You should see the login/signup page
3. Create an account
4. Start using the app!

---

## 🔧 TROUBLESHOOTING

### MongoDB Connection Error
- Check if connection string is correct
- Make sure you replaced `<password>` with actual password
- Verify IP whitelist includes "0.0.0.0/0" (Allow from anywhere)

### Port Already in Use
- Backend: Change `PORT=8000` to `PORT=8001` in `backend\.env`
- Frontend: It will auto-suggest another port

### Module Not Found
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### API Key Errors
- Double-check all API keys are copied correctly
- No extra spaces before/after keys
- Keys should not have quotes

---

## 📝 ENVIRONMENT FILES LOCATION

✅ `backend\.env` - Already created with placeholders
✅ `client\.env` - Already created

**YOU NEED TO UPDATE:**
1. MongoDB connection string in `backend\.env`
2. Gemini API key in `backend\.env`
3. Cloudinary credentials in `backend\.env`
4. Resend API key in `backend\.env`

---

## 🌐 DEPLOYMENT (After Local Setup Works)

### Deploy Backend to Render
1. Push code to GitHub
2. Go to: https://render.com (sign up free)
3. New → Web Service
4. Connect GitHub repo
5. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Add all environment variables from `backend\.env`
7. Deploy
8. Copy the URL (e.g., https://your-app.onrender.com)

### Deploy Frontend to Vercel
1. Go to: https://vercel.com (sign up free)
2. Import project from GitHub
3. Settings:
   - Root Directory: `client`
   - Framework Preset: Vite
4. Environment Variables:
   - `VITE_API_BASE_URL` = `https://your-app.onrender.com/api`
5. Deploy

---

## 📞 NEED HELP?

If you get stuck:
1. Check the error message carefully
2. Make sure all API keys are correct
3. Verify MongoDB connection string
4. Ensure both backend and frontend are running
5. Check browser console for errors (F12)

---

## 🎉 SUCCESS CHECKLIST

- [ ] Node.js installed
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string added to backend\.env
- [ ] Gemini API key obtained and added
- [ ] Cloudinary credentials obtained and added
- [ ] Resend API key obtained and added
- [ ] Backend dependencies installed (npm install)
- [ ] Frontend dependencies installed (npm install)
- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:5173
- [ ] Can access the app in browser
- [ ] Can create account and login

**Once all checkboxes are done, you're ready to use the app!**
