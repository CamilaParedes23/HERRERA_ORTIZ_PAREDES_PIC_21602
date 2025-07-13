#!/bin/bash

# Script para iniciar todo el proyecto de E-commerce
# Ejecuta tanto el backend como el frontend en modo desarrollo

echo "🚀 Iniciando Sistema E-Commerce..."
echo "======================================="

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org/"
    exit 1
fi

# Verificar que npm esté disponible
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está disponible. Por favor instala Node.js con npm."
    exit 1
fi

echo "✅ Node.js y npm están disponibles"

# Función para verificar si el puerto está en uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Puerto $1 está en uso"
        return 1
    else
        echo "✅ Puerto $1 está disponible"
        return 0
    fi
}

# Verificar puertos
echo "🔍 Verificando puertos..."
check_port 3000
check_port 3001

# Instalar dependencias del backend si no existen
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
    if [ $? -ne 0 ]; then
        echo "❌ Error instalando dependencias del backend"
        exit 1
    fi
else
    echo "✅ Dependencias del backend ya están instaladas"
fi

# Instalar dependencias del frontend si no existen
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    cd frontend && npm install && cd ..
    if [ $? -ne 0 ]; then
        echo "❌ Error instalando dependencias del frontend"
        exit 1
    fi
else
    echo "✅ Dependencias del frontend ya están instaladas"
fi

echo "======================================="
echo "🎯 Iniciando servicios..."

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Cerrando servicios..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Capturar Ctrl+C para limpiar procesos
trap cleanup SIGINT

# Iniciar backend en segundo plano
echo "🔧 Iniciando Backend (Puerto 3001)..."
cd backend && npm run dev &
BACKEND_PID=$!

# Esperar un momento para que el backend inicie
sleep 3

# Iniciar frontend en segundo plano
echo "🎨 Iniciando Frontend (Puerto 3000)..."
cd frontend && npm start &
FRONTEND_PID=$!

echo "======================================="
echo "✨ ¡Sistema E-Commerce iniciado exitosamente!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:3001"
echo "📡 API:      http://localhost:3001/api"
echo ""
echo "📋 Endpoints disponibles:"
echo "   • GET    /api/products"
echo "   • GET    /api/orders"
echo "   • GET    /api/order-details"
echo "   • GET    /api/health"
echo ""
echo "💡 Presiona Ctrl+C para detener todos los servicios"
echo "======================================="

# Esperar a que los procesos terminen
wait
