@echo off

echo Starting backend...
start cmd /k "cd server && npm start"

echo Starting frontend...
start cmd /k "cd "client\src" && npm start"

echo Both frontend and backend started.
