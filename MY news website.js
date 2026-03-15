# Fullstack Breaking News Website for Maharashtra

# Backend: FastAPI (Python)
# Frontend: React.js

# --- backend/main.py ---
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

NEWS_API_KEY = "YOUR_NEWSAPI_KEY"  # Get from https://newsapi.org/
NEWS_API_URL = "https://newsapi.org/v2/everything"

@app.get("/api/news")
def get_maharashtra_news():
    today = datetime.now().strftime("%Y-%m-%d")
    params = {
        "q": "Maharashtra",
        "from": today,
        "to": today,
        "sortBy": "publishedAt",
        "apiKey": NEWS_API_KEY,
        "language": "en",
        "pageSize": 20
    }
    response = requests.get(NEWS_API_URL, params=params)
    return response.json()

# --- frontend/src/App.js ---
import React, { useEffect, useState } from "react";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Maharashtra Breaking News - {new Date().toLocaleDateString()}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        news.map((article, idx) => (
          <div key={idx} style={{ marginBottom: 30, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            <p style={{ fontSize: 12, color: "#888" }}>{new Date(article.publishedAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;

# --- frontend/package.json (partial) ---
{
  "name": "maharashtra-news",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}

# --- Instructions ---
# 1. Replace YOUR_NEWSAPI_KEY with your NewsAPI.org API key in backend/main.py.
# 2. Run backend: `uvicorn main:app --reload`
# 3. Run frontend: `npm start` inside frontend directory (after `npx create-react-app frontend`)
# 4. Visit http://localhost:3000 to see the news.