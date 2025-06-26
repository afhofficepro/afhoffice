@echo off
echo AFH Office Deployment Script
echo ============================
echo.

REM Check if Firebase CLI is installed
echo Checking Firebase CLI...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Firebase CLI not found. Please install it first:
    echo npm install -g firebase-tools
    pause
    exit /b 1
)

REM Clean previous builds
echo.
echo Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

REM Build the application
echo.
echo Building the application...
call npm run build

REM Check if build was successful
if not exist out (
    echo Build failed - 'out' directory not found
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

REM Deploy to Firebase
echo Deploying to Firebase...
echo.
echo What would you like to deploy?
echo 1. Everything (Hosting, Rules, Indexes)
echo 2. Hosting only
echo 3. Firestore Rules only
echo 4. Firestore Indexes only
echo 5. Cancel
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Deploying everything...
    call firebase deploy
) else if "%choice%"=="2" (
    echo.
    echo Deploying hosting only...
    call firebase deploy --only hosting
) else if "%choice%"=="3" (
    echo.
    echo Deploying Firestore rules only...
    call firebase deploy --only firestore:rules
) else if "%choice%"=="4" (
    echo.
    echo Deploying Firestore indexes only...
    call firebase deploy --only firestore:indexes
) else if "%choice%"=="5" (
    echo.
    echo Deployment cancelled
    pause
    exit /b 0
) else (
    echo.
    echo Invalid choice. Deployment cancelled
    pause
    exit /b 1
)

echo.
echo Deployment complete!
echo.
pause 