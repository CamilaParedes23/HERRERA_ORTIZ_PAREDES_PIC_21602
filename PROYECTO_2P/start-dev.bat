@echo off
REM Script para iniciar todo el proyecto de E-commerce en Windows
REM Ejecuta tanto el backend como el frontend en modo desarrollo

echo.
echo 🚀 Iniciando Sistema E-Commerce...
echo =======================================

REM Verificar que Node.js este instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no esta instalado. Por favor instalalo desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar que npm este disponible
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no esta disponible. Por favor instala Node.js con npm.
    pause
    exit /b 1
)

echo ✅ Node.js y npm estan disponibles

REM Verificar si las carpetas de node_modules existen
echo 🔍 Verificando dependencias...

if not exist "backend\node_modules" (
    echo 📦 Instalando dependencias del backend...
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Error instalando dependencias del backend
        pause
        exit /b 1
    )
    cd ..
) else (
    echo ✅ Dependencias del backend ya estan instaladas
)

if not exist "frontend\node_modules" (
    echo 📦 Instalando dependencias del frontend...
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Error instalando dependencias del frontend
        pause
        exit /b 1
    )
    cd ..
) else (
    echo ✅ Dependencias del frontend ya estan instaladas
)

echo =======================================
echo 🎯 Iniciando servicios...

REM Crear archivo temporal para procesos
set TEMP_DIR=%TEMP%\ecommerce-project
if not exist "%TEMP_DIR%" mkdir "%TEMP_DIR%"

echo 🔧 Iniciando Backend (Puerto 3001)...
cd backend
start /B "Backend" cmd /c "npm run dev > %TEMP_DIR%\backend.log 2>&1"
cd ..

REM Esperar un momento para que el backend inicie
timeout /t 3 /nobreak >nul

echo 🎨 Iniciando Frontend (Puerto 3000)...
cd frontend
start /B "Frontend" cmd /c "npm start > %TEMP_DIR%\frontend.log 2>&1"
cd ..

echo =======================================
echo ✨ ¡Sistema E-Commerce iniciado exitosamente!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:3001
echo 📡 API:      http://localhost:3001/api
echo.
echo 📋 Endpoints disponibles:
echo    • GET    /api/products
echo    • GET    /api/orders  
echo    • GET    /api/order-details
echo    • GET    /api/health
echo.
echo 💡 Los servicios se ejecutan en segundo plano
echo 📝 Logs disponibles en: %TEMP_DIR%
echo 🛑 Para detener los servicios, cierra las ventanas del navegador
echo    y ejecuta: taskkill /f /im node.exe
echo =======================================
echo.

REM Abrir el navegador automaticamente
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo ✅ Navegador abierto automaticamente
echo 💡 Presiona cualquier tecla para salir de este script...
pause >nul
