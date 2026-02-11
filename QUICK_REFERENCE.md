# 🚀 QUICK SETUP REFERENCE CARD

## 📋 API KEYS NEEDED (All FREE)

| Service | Signup Link | What to Copy |
|---------|-------------|--------------|
| **MongoDB Atlas** | https://www.mongodb.com/cloud/atlas/register | Connection String |
| **Google Gemini AI** | https://aistudio.google.com/app/apikey | API Key |
| **Cloudinary** | https://cloudinary.com/users/register_free | Cloud Name, API Key, API Secret |
| **Resend** | https://resend.com/signup | API Key |

---

## 🔑 WHERE TO PUT API KEYS

All keys go in: `backend\.env`

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/financial_platform?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSy...
CLOUDINARY_CLOUD_NAME=dxxxxx
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc123xyz
RESEND_API_KEY=re_xxxxx
```

---

## 💻 COMMANDS TO RUN

### Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (open new terminal)
cd client
npm install
```

### Run Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

---

## 🎯 SETUP ORDER

1. ✅ Install Node.js (if needed)
2. ✅ Create MongoDB Atlas account → Get connection string
3. ✅ Get Gemini API key
4. ✅ Get Cloudinary credentials
5. ✅ Get Resend API key
6. ✅ Update `backend\.env` with all keys
7. ✅ Run `npm install` in backend folder
8. ✅ Run `npm install` in client folder
9. ✅ Start backend (`npm run dev`)
10. ✅ Start frontend (`npm run dev`)
11. ✅ Open http://localhost:5173

---

## 🆘 COMMON ISSUES

**MongoDB Connection Failed**
→ Check connection string format
→ Replace `<password>` with actual password
→ Add `/financial_platform` before `?`

**Port 8000 in use**
→ Change `PORT=8000` to `PORT=8001` in backend\.env

**Module not found**
→ Delete `node_modules` and run `npm install` again

**API key invalid**
→ Copy key again (no spaces, no quotes)

---

## 📁 FILES CREATED FOR YOU

✅ `backend\.env` - Backend environment variables
✅ `client\.env` - Frontend environment variables
✅ `SETUP_GUIDE.md` - Detailed setup instructions
✅ `QUICK_REFERENCE.md` - This file

**NEXT STEP:** Follow SETUP_GUIDE.md step by step!
