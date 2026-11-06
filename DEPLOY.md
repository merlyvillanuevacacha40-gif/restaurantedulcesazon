# Despliegue Dulce Sazón — GitHub + Railway

Hecho con amor por **Merly Villanueva Cacha** ♥
WhatsApp 910 818 753 · merlyvillanuevacacha40@gmail.com · Recuay, Ancash, Perú

El proyecto ya está listo: `index.html`, `styles.css`, `script.js`, `logo-restaurant.png` (tu logo), `server.js` (para Railway) y `.github/workflows/pages.yml` (para GitHub Pages).

> ⚠️ Para publicar en TU GitHub y TU Railway necesito que inicies sesión con tus cuentas. No puedo entrar por ti. Son 3 pasos:

## 1) GitHub (gratis, GitHub Pages)
1. Inicia sesión en https://github.com
2. Crea un repo nuevo **público**: https://github.com/new → nombre sugerido `dulce-sazon-restaurante`
3. En PowerShell, dentro de `dulce-sazon`, ejecuta (reemplaza TU-USUARIO):
   ```powershell
   gh auth login
   gh repo create TU-USUARIO/dulce-sazon-restaurante --public --source=. --remote=origin --push
   ```
   O sin gh, con git:
   ```powershell
   git remote add origin https://github.com/TU-USUARIO/dulce-sazon-restaurante.git
   git push -u origin main
   ```
4. En GitHub: **Settings → Pages → Source: GitHub Actions**. El workflow `pages.yml` publicará solo.
   URL final: `https://TU-USUARIO.github.io/dulce-sazon-restaurante/`

## 2) Railway (URL pública rápida)
1. Inicia sesión en https://railway.app (puedes entrar con GitHub)
2. Opción fácil (web): **New Project → Deploy from GitHub repo →** elige `dulce-sazon-restaurante` → Railway detecta `railway.json` + `server.js` y publica solo.
3. Opción CLI:
   ```powershell
   railway.cmd login
   railway.cmd init
   railway.cmd up
   ```
   URL final: algo como `https://dulce-sazon-restaurante.up.railway.app`

## 3) Verificar
- Abre la URL de GitHub Pages y la de Railway: header con tu logo, WhatsApp 910 818 753, mapa de Recuay y footer *Hecho con amor por Merly Villanueva Cacha*.
- Actualizaciones: edita archivos, luego:
  ```powershell
  git add .; git commit -m "Actualización"; git push
  ```
  GitHub Pages y Railway se actualizan solos.

## Archivos de despliegue
- `server.js` — servidor estático sin dependencias para Railway (`PORT` automático)
- `package.json` — `npm start` → `node server.js`
- `railway.json` — startCommand `node server.js`
- `.github/workflows/pages.yml` — despliegue automático a GitHub Pages
