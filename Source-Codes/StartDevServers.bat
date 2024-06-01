@echo off

echo Starting backend...
start cmd /k "cd server && npm start"

echo Starting frontend...
start cmd /k "cd client && npm start"

echo Starting FastAPI...
cd server\scripts\Helpers
call .\env\Scripts\activate.bat
start cmd /k "uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload"

echo Frontend, Backend and FastAPI, All 3 servers are running
