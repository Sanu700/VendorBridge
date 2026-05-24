# ⚡ VendorBridge

> Connecting street food vendors with raw material suppliers — a two-sided B2B marketplace bringing pricing transparency and supply chain structure to India's informal food economy.

![VendorBridge](https://img.shields.io/badge/VendorBridge-Hackathon_2025-f39c12?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Ready-ffca28?style=flat-square&logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

---

## 🚀 Quick Start

```bash
git clone <your-repo>
cd vendorbridge
npm install
npm run dev
```

Open `http://localhost:5173` — the app runs in **demo mode** with mock data, no Firebase needed.

---

## 🔥 Firebase Setup (Optional)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Google Authentication**
3. Enable **Firestore Database**
4. Copy `.env.example` → `.env` and fill in your credentials:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. In `src/context/AuthContext.jsx`, set `DEMO_MODE = false`

---

## 🗂️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── ProductCard.jsx
│   ├── SearchFilter.jsx
│   ├── ProtectedRoute.jsx
│   └── Loader.jsx
├── context/          # React Context (Auth, Products)
├── data/             # Mock data & constants
├── firebase/         # Firebase config
├── hooks/            # Custom hooks (useDebounce, useSearch)
├── layouts/          # DashboardLayout
├── pages/
│   ├── LandingPage.jsx
│   ├── AuthPage.jsx
│   ├── RoleSelector.jsx
│   ├── vendor/       # Vendor dashboard pages
│   └── supplier/     # Supplier dashboard pages
└── main.jsx
```

---

## ✨ Features

### Landing Page
- Animated hero with gradient & dot background
- Problem/Solution section
- Features grid (6 cards)
- How It Works (4 steps)
- Testimonials (4 reviews)
- Roadmap section
- CTA + Footer

### Authentication
- Google Sign In (Firebase / Demo mode)
- Session persistence via localStorage
- Role selection (Vendor / Supplier)
- Protected routes

### Vendor Dashboard
- Market stats: avg price, products tracked, supplier count, alerts
- Price trend charts (weekly/monthly) with Recharts
- Stock status breakdown with animated progress bars
- Live market feed table
- Supplier Discovery with search + filters
- Products marketplace with sort & filter
- Analytics: price trends, radar chart, best prices, low-stock alerts

### Supplier Dashboard
- Inventory stats: total products, value, active listings, alerts
- Price & stock bar charts
- Category breakdown with animated bars
- Full CRUD product management (add/edit/delete)
- Sortable, searchable product table
- Add Product form with emoji picker + live preview
- Analytics: stock levels, revenue trend, value breakdown

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 + custom CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | Firebase Google OAuth |
| Database | Firebase Firestore |
| Routing | React Router v6 |
| Notifications | React Hot Toast |

---

## 🚢 Deployment

```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or Firebase Hosting
```

**Vercel:** `vercel --prod`  
**Netlify:** Drag & drop the `dist/` folder  
**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

---

## 👥 Team — Coffee & Code ☕
Built at **Tutedude Web Development Hackathon 2025**

MIT License
