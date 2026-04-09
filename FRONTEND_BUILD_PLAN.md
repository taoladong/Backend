# Frontend Build Plan from `Website Volunteer Hub.docx`

## 1) Pham vi va muc tieu
Xay dung frontend tach biet (Vite + React) cho Volunteer Hub, su dung backend Railway hien tai qua API `/api/...`.

Muc tieu kinh doanh theo tai lieu:
- Ket noi dung tinh nguyen vien voi su kien theo ky nang + vi tri.
- Minh bach uy tin to chuc qua rating 2 chieu.
- So hoa dong gop: passport gio tinh nguyen, certificate, badge.

## 2) Doi tuong nguoi dung va luong chinh
- Volunteer: tim su kien, nop don, theo doi gio, xem chung chi.
- Organizer: tao su kien, duyet ung vien, quan ly ca, diem danh, danh gia.
- Sponsor: theo doi tien do, dong gop tai tro.
- Admin: duyet to chuc, quan ly danh muc, xu ly khiu nai, bao cao.

## 3) Kien truc frontend de xuat
- Framework: React + Vite.
- Routing: React Router.
- Data layer: TanStack Query (cache, retry, stale-time).
- State nhe: Zustand hoac Context cho auth/session.
- Form: React Hook Form + Zod.
- UI: component-based, mobile-first, role-based navigation.
- HTTP client: Axios instance + interceptor (token/refresh, xu ly 401).

## 4) Cau truc thu muc de xuat
```txt
frontend/
  src/
    app/
      router/
      providers/
      layouts/
    features/
      auth/
      volunteer/
      organizer/
      sponsor/
      admin/
      events/
      certificates/
      ratings/
      notifications/
    shared/
      components/
      ui/
      hooks/
      api/
      utils/
      types/
    pages/
    styles/
```

## 5) Mapping yeu cau DOCX -> module UI
### 5.1 Portfolio
- Volunteer Profile page: ky nang, nhom mau, ngon ngu, so thich.
- Volunteer Passport page: timeline du an da tham gia + tong gio.

### 5.2 Event Management
- Event Listing + Search + Filter.
- Event Detail + Apply flow.
- Organizer Event CRUD + danh sach ung vien + trang thai duyet.
- Ban do su kien gan vi tri user.

### 5.3 Operations
- Shift board (phan ca theo khung gio/vi tri).
- Attendance check-in (QR/GPS UX flow).

### 5.4 Reward/Certification
- Certificate list + detail + verify QR.
- Badge gallery + progress.

### 5.5 Cross-cutting
- Rating 2 chieu sau su kien.
- Notification center.
- Public trust pages (thong tin to chuc/su kien cong khai).

## 6) Lo trinh trien khai (8-10 tuan)
## Phase 0 (Tuan 1): Foundation
- Setup architecture, router, layout, auth shell, env, API client.
- Setup lint/format, error boundary, loading skeleton, toast.
- Deliverable: khung app chay duoc tren Vercel.

## Phase 1 (Tuan 2-3): Volunteer MVP
- Auth pages (login/register/logout/me).
- Event list/detail/apply + my applications.
- Volunteer profile + passport page.
- Deliverable: volunteer hoan thanh luong tu tim su kien -> nop don -> theo doi trang thai.

## Phase 2 (Tuan 4-5): Organizer MVP
- Organizer dashboard.
- Event CRUD + candidate review + approve/reject.
- Shift planning UI co filter theo vai tro/khung gio.
- Deliverable: organizer tao va van hanh duoc 1 su kien.

## Phase 3 (Tuan 6): Operations
- Attendance UX (QR/GPS), thao tac check-in/check-out.
- Event operations board realtime-lite (polling).
- Deliverable: diem danh va theo doi hien dien su kien.

## Phase 4 (Tuan 7): Certificate, Badge, Rating
- Certificate list/download/verify.
- Badge wall.
- Rating flow 2 chieu sau event.
- Deliverable: so hoa dong gop + feedback loop day du.

## Phase 5 (Tuan 8-9): Sponsor + Admin
- Sponsor pages: contribution tracking, event request overview.
- Admin pages: duyet organizer/sponsor, complaints, taxonomy.
- Deliverable: governance va quality control.

## Phase 6 (Tuan 10): Hardening & Release
- Mobile UX polish, accessibility audit, performance tuning.
- Security review (auth, sensitive data handling).
- UAT + docs + release checklist.

## 7) Ke hoach UI/UX
- Design system tuan 1: token mau, typo, spacing, component states.
- Mobile-first cho cac flow tai hien truong (check-in, shift).
- A11y: keyboard nav, focus visible, contrast, reduced motion.
- Empty/loading/error states day du cho tung module.

## 8) Ke hoach tich hop API
- API base url: `VITE_API_BASE_URL=https://backend-production-cea0a.up.railway.app`.
- Chuan hoa response handler va error mapping.
- Retry strategy cho endpoint read; khong retry endpoint mutate nhieu lan.
- CORS: neu co loi cross-domain, uu tien cau hinh backend cho origin frontend.

## 9) Tieu chi nghiem thu (Acceptance Criteria)
- Volunteer hoan thanh end-to-end apply flow duoc.
- Organizer tao event, duyet thanh vien, tao shift, diem danh duoc.
- Certificate/Badge hien thi dung theo du lieu backend.
- P95 page load trang chinh < 2.5s (4G gia lap).
- Lighthouse mobile >= 80 cho Performance/Best Practices/Accessibility.

## 10) RUI RO & giai phap
- RUI RO: API chua day du endpoint cho map/attendance.
  - Giai phap: mock adapter tam thoi + RFC bo sung API.
- RUI RO: CORS/cookie auth khac domain.
  - Giai phap: token strategy ro rang, env theo tung moi truong.
- RUI RO: scope qua lon cho 1 release.
  - Giai phap: chia release MVP theo role (Volunteer -> Organizer -> Others).

## 11) Next step ngay
1. Chot scope MVP (Volunteer + Organizer) cho milestone 1.
2. Chot bo man hinh can wireframe truoc (10-12 screens).
3. Tao issue backlog theo phase, estimate theo sprint.
4. Bat dau implement Phase 0 tren nhanh `frontend-foundation`.
