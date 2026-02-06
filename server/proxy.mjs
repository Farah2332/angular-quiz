import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // allow browser to call this server

const REQRES_BASE = "https://reqres.in/api";

// small helper to forward requests safely
async function forward(url) {
  const res = await fetch(url, {
    headers: {
      // These headers help avoid some anti-bot / CDN weirdness
      "User-Agent": "Mozilla/5.0 (Angular Test Proxy)",
      "Accept": "application/json",
    },
  });

  const text = await res.text();
  return { status: res.status, text };
}

// GET /api/users?page=1
app.get("/api/users", async (req, res) => {
  const page = req.query.page ?? "1";
  const url = `${REQRES_BASE}/users?page=${encodeURIComponent(page)}`;

  try {
    const { status, text } = await forward(url);
    res.status(status).type("json").send(text);
  } catch (e) {
    res.status(500).json({ error: "Proxy failed", details: String(e) });
  }
});

// GET /api/users/:id
app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const url = `${REQRES_BASE}/users/${encodeURIComponent(id)}`;

  try {
    const { status, text } = await forward(url);
    res.status(status).type("json").send(text);
  } catch (e) {
    res.status(500).json({ error: "Proxy failed", details: String(e) });
  }
});

app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Proxy running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/users?page=1`);
});
