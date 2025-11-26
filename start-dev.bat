@echo off
echo Starting AI Prompt Stress Tester...
echo.

echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Dev Server...
start "Frontend Dev Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✓ Both servers starting...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
