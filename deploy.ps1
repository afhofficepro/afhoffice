# AFH Office Deployment Script for Windows PowerShell

Write-Host "AFH Office Deployment Script" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

# Check if Firebase CLI is installed
Write-Host "`nChecking Firebase CLI..." -ForegroundColor Yellow
try {
    $firebaseVersion = firebase --version
    Write-Host "Firebase CLI version: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "Firebase CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g firebase-tools" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in to Firebase
Write-Host "`nChecking Firebase authentication..." -ForegroundColor Yellow
$authCheck = firebase projects:list 2>&1
if ($authCheck -match "Error") {
    Write-Host "Not logged in to Firebase. Running firebase login..." -ForegroundColor Yellow
    firebase login
}

# Clean previous builds
Write-Host "`nCleaning previous builds..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}
if (Test-Path "out") {
    Remove-Item -Recurse -Force "out"
}

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
npm install

# Build the application
Write-Host "`nBuilding the application..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (!(Test-Path "out")) {
    Write-Host "Build failed - 'out' directory not found" -ForegroundColor Red
    exit 1
}

Write-Host "`nBuild successful!" -ForegroundColor Green

# Deploy to Firebase
Write-Host "`nDeploying to Firebase..." -ForegroundColor Yellow

# Ask what to deploy
Write-Host "`nWhat would you like to deploy?" -ForegroundColor Cyan
Write-Host "1. Everything (Hosting, Rules, Indexes)"
Write-Host "2. Hosting only"
Write-Host "3. Firestore Rules only"
Write-Host "4. Firestore Indexes only"
Write-Host "5. Cancel"

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "`nDeploying everything..." -ForegroundColor Yellow
        firebase deploy
    }
    "2" {
        Write-Host "`nDeploying hosting only..." -ForegroundColor Yellow
        firebase deploy --only hosting
    }
    "3" {
        Write-Host "`nDeploying Firestore rules only..." -ForegroundColor Yellow
        firebase deploy --only firestore:rules
    }
    "4" {
        Write-Host "`nDeploying Firestore indexes only..." -ForegroundColor Yellow
        firebase deploy --only firestore:indexes
    }
    "5" {
        Write-Host "`nDeployment cancelled" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "`nInvalid choice. Deployment cancelled" -ForegroundColor Red
        exit 1
    }
}

# Check deployment status
if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDeployment successful!" -ForegroundColor Green
    Write-Host "Your app should be available at your Firebase hosting URL" -ForegroundColor Green
    
    # Try to get the hosting URL
    $projectId = (Get-Content "firebase.json" | ConvertFrom-Json).project
    if ($projectId) {
        Write-Host "https://$projectId.web.app" -ForegroundColor Cyan
    }
} else {
    Write-Host "`nDeployment failed!" -ForegroundColor Red
    Write-Host "Check the error messages above for details" -ForegroundColor Yellow
}

Write-Host "`nDone!" -ForegroundColor Green 