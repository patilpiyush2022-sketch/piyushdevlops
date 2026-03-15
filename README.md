# Maharashtra News Website (FastAPI + React)

## Setup steps

### 1) Backend

1. Create a `.env` file in `backend` folder with:

```env
NEWS_API_KEY=your_real_newsapi_org_key
```

2. Install dependencies:

```bash
cd "c:\Users\patil\OneDrive\Desktop\gameminiproject\backend"
python -m pip install -r requirements.txt
```

3. Start backend server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

4. Validate endpoint:

- `http://localhost:8000/api/news`

---

### 2) Frontend

1. Install dependencies:

```bash
cd "c:\Users\patil\OneDrive\Desktop\gameminiproject\frontend"
npm install
```

2. Start frontend dev server:

```bash
npm start
```

3. Open browser:

- `http://localhost:3000`

---

## Notes

- Backend fetches Maharashtra news from NewsAPI (today's articles).
- CORS is enabled for local dev.
- If `NEWS_API_KEY` is missing, backend startup will fail with clear message.
- Use the same `api/news` path in frontend fetch call.
