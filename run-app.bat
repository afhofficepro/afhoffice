@echo off
echo Starting AFH Office Application...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if .next build directory exists
if not exist ".next" (
    echo Building the application...
    call npm run build
    if errorlevel 1 (
        echo Build failed. Running in development mode instead...
        call npm run dev
        pause
        exit /b 0
    )
)

echo Starting the production server...
call npm start
if errorlevel 1 (
    echo Production server failed. Running in development mode...
    call npm run dev
)

pause 