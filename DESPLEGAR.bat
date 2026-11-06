@echo off
echo ==================================================
echo  Dulce Sazon Restaurante - Despliegue a GitHub
echo  Hecho con amor por Merly Villanueva Cacha
echo ==================================================
echo.
echo 1) Se abrira tu navegador para iniciar sesion en GitHub.
echo    Inicia sesion con tu cuenta merlyvillanuevacacha40-gif
echo.
pause
call gh auth login
echo.
echo 2) Subiendo tu web a GitHub...
git push -u origin main
echo.
echo 3) Listo! Ahora activa GitHub Pages:
echo    Entra a https://github.com/merlyvillanuevacacha40-gif/restaurantedulcesazon
echo    Settings -^> Pages -^> Source: GitHub Actions
echo    Tu web estara en: https://merlyvillanuevacacha40-gif.github.io/restaurantedulcesazon/
echo.
echo 4) Para Railway: entra a https://railway.app/new
echo    New Project -^> Deploy from GitHub repo -^> restaurantedulcesazon
echo.
pause
