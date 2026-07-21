# Deploy — Where? no Render

## URLs

| O quê | URL |
|-------|-----|
| App online | https://geo-doido.onrender.com |
| Dashboard Render | https://dashboard.render.com |
| Deploy hook | `https://api.render.com/deploy/srv-d949hc5ckfvc739j2gq0?key=jb3dzcUN3hE` |

---

## Dar deploy manual

### Opção 1 — Push no GitHub
Dê push na branch `main` que o Render faz deploy automático.

### Opção 2 — Deploy Hook (via curl, terminal ou script)
```powershell
Invoke-RestMethod -Uri "https://api.render.com/deploy/srv-d949hc5ckfvc739j2gq0?key=jb3dzcUN3hE" -Method Post
```

```bash
curl -X POST "https://api.render.com/deploy/srv-d949hc5ckfvc739j2gq0?key=jb3dzcUN3hE"
```

---

## Blueprint (`render.yaml`)

```yaml
databases:
  - name: geo-doido-db
    plan: free
    region: oregon
    postgresMajorVersion: 16

services:
  - type: web
    name: geo-doido
    runtime: node
    repo: https://github.com/DevPublishComunicacao/geo-doido
    plan: free
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /
    envVars:
      - key: NODE_VERSION
        value: "22"
      - key: FRONTEND_URL
        value: https://geo-doido.onrender.com
      - key: SESSION_SECRET
        generateValue: true
      - key: GOOGLE_CLIENT_ID
        sync: false               # preencher manualmente no dashboard
      - key: GOOGLE_CLIENT_SECRET
        sync: false               # preencher manualmente no dashboard
      - key: JWT_SECRET
        generateValue: true
      - key: DATABASE_URL
        fromDatabase:
          name: geo-doido-db
          property: connectionString
      - key: DB_HOST
        fromDatabase:
          name: geo-doido-db
          property: host
      - key: DB_PORT
        fromDatabase:
          name: geo-doido-db
          property: port
      - key: DB_NAME
        fromDatabase:
          name: geo-doido-db
          property: database
      - key: DB_USER
        fromDatabase:
          name: geo-doido-db
          property: user
      - key: DB_PASSWORD
        fromDatabase:
          name: geo-doido-db
          property: password
```

---

## Variáveis de ambiente (Google OAuth)

No **Dashboard Render > geo-doido > Environment**, preencher as credenciais do Google OAuth.

---

## Recursos provisionados

### Web Service
- **Nome:** `geo-doido`
- **Plano:** Free
- **Região:** Oregon
- **Runtime:** Node.js 22
- **Porta:** Render define `PORT` automaticamente

### PostgreSQL
- **Nome:** `geo-doido-db`
- **Plano:** Free (1 GB storage, 256 MB RAM)
- **Região:** Oregon
- **Conexão:** injetada automaticamente via `DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

---

## Comandos úteis (dev local)

```powershell
# iniciar banco local
docker compose up -d

# iniciar app
npm run dev

# .env de dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=where
DB_USER=where
DB_PASSWORD=where123
JWT_SECRET=where-jwt-secret-dev
SESSION_SECRET=where-session-secret
FRONTEND_URL=http://localhost:3000
```

---

## Observações

- O banco **PostgreSQL** é provisionado pelo próprio blueprint ao fazer deploy
- **SQLite/JSON local** não é usado em produção — apenas como fallback em dev
- Migrações rodam automáticas no `startup` (dentro do `server.js`)
- O deploy hook permite acionar deploy sem precisar abrir o dashboard
