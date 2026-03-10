## Digitek Sticker Studio & Marketplace

Full–stack print design marketplace with a Figma-like sticker editor, marketplace, and admin dashboard.

### Monorepo layout

- `backend` – Node.js / Express / MongoDB / Stripe / Socket.io API
- `frontend` – React + Vite + React-Konva single-page app

### Prerequisites

- Node.js 18+
- MongoDB running locally or in the cloud (e.g. Atlas)
- Stripe account + secret key
- Cloudinary account (or adapt uploads route)

### Backend setup

```bash
cd backend
cp .env.example .env              # fill in values
npm install
npm run dev                       # starts on http://localhost:5000
```

Seed sample stickers and orders:

```bash
cd backend
node src/seed/seed.js
```

Run backend tests:

```bash
cd backend
npm test
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev                       # http://localhost:5173
```

The Vite dev server proxies `/api` and `/socket.io` to the backend.

### Authentication

- Register at `/register`, then log in at `/login`.
- The seed script also creates:
  - Admin user: `admin@example.com` / `password123`
  - Regular user: `lis@example.com` / `password123`

### Stripe & payments

- Backend exposes `/api/orders/create-checkout-session`.
- Frontend includes a placeholder “Add to cart” button; wire it to that endpoint for full checkout.

### Exports & uploads

- The design canvas uses `react-konva`.
- “Export PNG” triggers `Stage.toDataURL()` and attempts to upload to `/api/uploads/image` (Cloudinary).
- If Cloudinary isn’t configured, the export still opens in a new tab so it can be saved manually.

### Admin dashboard

- Navigate to `/admin` while logged in as the admin user.
- Shows income summary, revenue/profit/expenses tiles, weekly chart placeholder, activity feed, and an orders table.
- Activity feed updates in real time via Socket.io when new designs or orders are created.

### Deployment

#### Backend (Render / Heroku-style)

1. Push the repo to GitHub (see commands below).
2. Create a new **Web Service** in Render (or Heroku) pointing to the `backend` folder.
3. Set build and start:
   - Build: `npm install`
   - Start: `npm start`
4. Add environment variables from `.env.example`:
   - `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
     `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLIENT_URL`, `PORT`
5. Once deployed, note the backend base URL, e.g. `https://digitek-api.onrender.com`.

#### Frontend (Vercel)

1. In Vercel, import the GitHub repo.
2. Configure project:
   - Framework: **Vite**
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add the following environment variable in Vercel so the frontend points at your hosted backend:
   - `VITE_API_BASE_URL=https://digitek-api.onrender.com` (then update `apiClient` to use it if desired).
4. Redeploy; your app will be live at `https://your-project.vercel.app`.

### Git & GitHub quick start

```bash
cd c:/Users/Admin/Desktop/Digitek
git init
git add .
git commit -m "Initial Digitek monorepo"
git branch -M main
git remote add origin https://github.com/<your-username>/digitek.git
git push -u origin main
```

After pushing, connect the repo in Vercel/Render as described above.

