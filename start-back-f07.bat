@echo off
:waitforconnection
ping 8.8.8.8 -n 1 > nul
if errorlevel 1 (
    timeout /t 5
    goto waitforconnection
)
cd C:\Users\elipi\OneDrive\Escritorio\f07_salon\api
git pull
npm install
npm start