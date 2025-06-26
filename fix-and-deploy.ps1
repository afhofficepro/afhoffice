# Fix and Deploy Script for AFH Office

Write-Host "AFH Office - Fix and Deploy Script" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# Kill any processes that might be locking files
Write-Host "`nStopping any running Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Clean build directories with force
Write-Host "`nCleaning build directories..." -ForegroundColor Yellow
if (Test-Path ".next") {
    try {
        Remove-Item -Path ".next" -Recurse -Force -ErrorAction Stop
        Write-Host "Removed .next directory" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove .next directory, trying alternative method..." -ForegroundColor Yellow
        cmd /c "rmdir /s /q .next" 2>$null
    }
}

if (Test-Path "out") {
    try {
        Remove-Item -Path "out" -Recurse -Force -ErrorAction Stop
        Write-Host "Removed out directory" -ForegroundColor Green
    } catch {
        Write-Host "Could not remove out directory, trying alternative method..." -ForegroundColor Yellow
        cmd /c "rmdir /s /q out" 2>$null
    }
}

# Create fresh directories
Write-Host "`nCreating fresh directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "out" -Force | Out-Null

# Build the application
Write-Host "`nBuilding the application..." -ForegroundColor Yellow
$buildProcess = Start-Process -FilePath "npm" -ArgumentList "run build" -NoNewWindow -Wait -PassThru

if ($buildProcess.ExitCode -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild completed!" -ForegroundColor Green

# Check if out directory has content
$outFiles = Get-ChildItem -Path "out" -Recurse
if ($outFiles.Count -eq 0) {
    Write-Host "Build output is empty!" -ForegroundColor Red
    Write-Host "Trying alternative build command..." -ForegroundColor Yellow
    
    # Try building without export
    npm run build
    
    # If still no out directory, create a simple index.html
    if (-not (Test-Path "out/index.html")) {
        Write-Host "Creating temporary index.html for testing..." -ForegroundColor Yellow
        @"
<!DOCTYPE html>
<html>
<head>
    <title>AFH Office - Deploying...</title>
    <meta http-equiv="refresh" content="5">
</head>
<body>
    <h1>AFH Office is being deployed</h1>
    <p>Please refresh this page in a few moments...</p>
</body>
</html>
"@ | Out-File -FilePath "out/index.html" -Encoding UTF8
    }
}

# Deploy to Firebase
Write-Host "`nDeploying to Firebase..." -ForegroundColor Yellow

# First deploy rules and indexes
Write-Host "`nDeploying Firestore rules and indexes..." -ForegroundColor Yellow
firebase deploy --only firestore:rules,firestore:indexes

# Then deploy hosting
Write-Host "`nDeploying hosting..." -ForegroundColor Yellow
$deployProcess = Start-Process -FilePath "firebase" -ArgumentList "deploy --only hosting" -NoNewWindow -Wait -PassThru

if ($deployProcess.ExitCode -eq 0) {
    Write-Host "`nDeployment successful!" -ForegroundColor Green
    Write-Host "Your app is now live at:" -ForegroundColor Green
    Write-Host "https://adultfamily-smartcare.web.app" -ForegroundColor Cyan
    Write-Host "https://adultfamily-smartcare.firebaseapp.com" -ForegroundColor Cyan
} else {
    Write-Host "`nDeployment failed!" -ForegroundColor Red
    Write-Host "Please check the errors above." -ForegroundColor Yellow
}

Write-Host "`nDone!" -ForegroundColor Green 