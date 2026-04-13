# Deployment Guide - APEX Magazine

This project is a full-stack React + Express application using Firebase for database and authentication.

## Prerequisites
- Node.js 18+
- Firebase Project (already set up)
- Google Cloud Project (for hosting)

## Local Development
1. `npm install`
2. `npm run dev` (Starts Express server + Vite)

## Production Build
1. `npm run build`
   - This generates static files in `dist/`.
2. The Express server (`server.ts`) is configured to serve these static files when `NODE_ENV=production`.

## Deploying to Cloud Run (Recommended)
1. Ensure your environment variables are set in the Cloud Run configuration:
   - `FIREBASE_CONFIG` (or use the existing `firebase-applet-config.json`)
2. Deploy the container:
   - The system uses the `start` script: `node server.ts` (Note: `tsx` is for dev, use compiled JS or `node --loader ts-node/esm` for prod if not pre-compiled).
   - *Recommendation*: Compile `server.ts` to JS for production.

## VPS Deployment (Ubuntu/Debian)

### 1. Server Setup
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
```

### 2. Process Management (PM2)
```bash
sudo npm install -g pm2
pm2 start tsx -- server.ts --name "apex-magazine"
# Or if compiled to JS:
# pm2 start dist/server.js --name "apex-magazine"
```

### 3. Nginx Reverse Proxy
Create `/etc/nginx/sites-available/apex`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static uploads directly for performance
    location /uploads/ {
        alias /path/to/your/app/public/uploads/;
    }
}
```
`sudo ln -s /etc/nginx/sites-available/apex /etc/nginx/sites-enabled/`
`sudo nginx -t && sudo systemctl restart nginx`

### 4. SSL (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## Firebase Rules
- Always deploy rules after changes:
  - `npx firebase deploy --only firestore:rules` (or use the provided tool).

## SEO & Sitemap
- `robots.txt` is in `public/`.
- Sitemap should be generated dynamically or manually updated in `public/sitemap.xml`.
