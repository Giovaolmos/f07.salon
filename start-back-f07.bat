@echo off
:waitforconnection
ping 8.8.8.8 -n 1 > nul
if errorlevel 1 (
    timeout /t 5
    goto waitforconnection
)
cd c:\Users\axel-\Desktop\proytectos-personales\f07_salon\v1_f07.salon\api
git pull
npm install
npm run start