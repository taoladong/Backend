# Frontend Vercel Deploy Guide

## Muc tieu
Deploy frontend React (Vite) trong thu muc `frontend/` len Vercel, backend Railway giu nguyen.

## Trang thai hien tai
- Frontend da deploy thanh cong:
  - `https://frontend-blush-nine-38.vercel.app`
- Backend API:
  - `https://backend-production-cea0a.up.railway.app`

## Cau hinh can co
Trong frontend, su dung bien moi truong:

```env
VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app
```

File lien quan:
- `frontend/vercel.json`
- `frontend/.env.example`

## Deploy lan dau (CLI)
```powershell
cd d:\CNLTTH\CONGNGHEWEB\VolunteerHub\frontend
vercel whoami
vercel --prod --yes --build-env VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app
```

## Redeploy cac lan sau
```powershell
cd d:\CNLTTH\CONGNGHEWEB\VolunteerHub\frontend
vercel --prod
```

Neu can doi API URL khi build:
```powershell
vercel --prod --build-env VITE_API_BASE_URL=https://<your-api-domain>
```

## Kiem tra sau deploy
1. Mo frontend URL tren trinh duyet.
2. Mo `Swagger` link tren UI de kiem tra ket noi backend.
3. Neu can test nhanh:
```powershell
(Invoke-WebRequest -Uri "https://frontend-blush-nine-38.vercel.app" -UseBasicParsing).StatusCode
```

## Loi thuong gap
- Frontend khong goi duoc API:
  - Kiem tra `VITE_API_BASE_URL`.
  - Kiem tra CORS backend neu goi khac domain.
- Build fail:
  - Chay local: `npm install && npm run build` trong `frontend/`.
