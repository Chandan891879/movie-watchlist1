# Backend (CineScope)

Express + Mongoose backend for the Movie Watchlist app.

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI`, `JWT_SECRET`, and `OMDB_API_KEY` if you use OMDB routes.
2. Install deps:

```powershell
cd 'backend'
npm install
```

3. Seed a demo user (optional):

```powershell
node seed.js
```

4. Start server:

```powershell
npm run dev
# or
npm start
```

API overview

- `POST /api/auth/signup` — body: `{ name, email, password }`
- `POST /api/auth/login` — body: `{ email, password }`
- `GET /api/omdb/search?q=...` — search OMDB (requires `OMDB_API_KEY`)
- `GET /api/omdb/movie?title=...` — get movie by title
- `POST /api/watchlist` — add (protected): `{ imdbID, title, poster, year }` (Authorization: Bearer <token>)
- `GET /api/watchlist` — list user's items (protected)
- `DELETE /api/watchlist/:id` — delete item by id (protected)

Notes
- The server connects to MongoDB using `MONGO_URI` from `.env`. Ensure the URI is correct and accessible from your machine.
- If you use MongoDB Atlas, whitelist your IP or enable access.
