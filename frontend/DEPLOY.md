# Frontend Deploy Guide (Vite + React)

## 1) Local run
```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

## 2) API base URL
Set in `.env`:
```env
VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app
```

Frontend g?i API d?ng:
- `${VITE_API_BASE_URL}/api/...`

## 3) Deploy to Vercel
- Import folder `frontend` vào Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Env var: `VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app`

## 4) Deploy to Netlify
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Env var: `VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app`

## 5) Deploy to Railway (static)
- Create new Railway service for frontend only
- Root directory: `frontend`
- Railway s? dùng `frontend/Dockerfile`
- Add env var: `VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app`

## Notes
- Backend Railway gi? nguyên, không c?n redeploy backend cho bu?c này.
- N?u trình duy?t báo CORS khi g?i API tr?c ti?p khác domain, c?n b?t CORS ? backend ho?c dùng reverse proxy ? frontend host.
