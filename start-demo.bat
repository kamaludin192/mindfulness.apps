@echo off
title Mindfulness Intervention App - Demo Launcher
cls
echo ========================================================
echo    MINDFULNESSINTERVENTION.ID - DEMO LAUNCHER
echo ========================================================
echo.
echo  Pilih opsi yang ingin dijalankan:
echo.
echo  [1] Jalankan Server Aplikasi Lokal (npm run dev)
echo  [2] Jalankan Ngrok Tunnel Publik (ngrok http 3000)
echo  [3] Jalankan SSH Tunnel Publik Cepat (localhost.run)
echo  [4] Jalankan Keduanya (Server + SSH Tunnel)
echo  [5] Keluar
echo.
echo ========================================================
set /p opt="Masukkan pilihan [1-5]: "

if "%opt%"=="1" goto start_dev
if "%opt%"=="2" goto start_ngrok
if "%opt%"=="3" goto start_tunnel
if "%opt%"=="4" goto start_all
if "%opt%"=="5" exit

:start_dev
echo.
echo Menjalankan Next.js Server di http://localhost:3000 ...
cd /d "e:\mindfulness.id"
npm run dev
pause
exit

:start_ngrok
echo.
echo Menjalankan Ngrok Tunnel di port 3000 ...
ngrok http 3000
pause
exit

:start_tunnel
echo.
echo Menjalankan SSH Tunnel Publik ...
ssh -R 80:localhost:3000 -o StrictHostKeyChecking=no -o ServerAliveInterval=15 nokey@localhost.run
pause
exit

:start_all
echo.
echo Membuka Server Aplikasi dan SSH Tunnel di jendela terpisah...
start "Mindfulness Dev Server" cmd /k "cd /d e:\mindfulness.id && npm run dev"
timeout /t 3
start "Mindfulness Public Tunnel" cmd /k "ssh -R 80:localhost:3000 -o StrictHostKeyChecking=no -o ServerAliveInterval=15 nokey@localhost.run"
exit
