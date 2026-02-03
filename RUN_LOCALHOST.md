# Run localhost — Ports

| Port | Flow |
|------|------|
| **3001** | Survey respondent flow (take survey) |
| **5172** | Survey editing flow (Survey Builder) |

---

## How to run

### Survey respondent flow → http://localhost:3001

```powershell
cd "respondent flow\enculture survey UI"
npm run dev
```

### Survey editing flow → http://localhost:5172

```powershell
cd "survey editing flow"
npm start
```

---

## If you see the wrong app on a port

1. Stop all dev servers (Ctrl+C in each terminal).
2. Start respondent flow only in one terminal → use **http://localhost:3001**.
3. Start survey editing flow only in another terminal → use **http://localhost:5172**.
