Write-Host "Starting AFH Office Application..." -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Try to run in development mode directly
Write-Host "Starting the development server..." -ForegroundColor Green
npm run dev

# If dev server fails, try other options
if ($LASTEXITCODE -ne 0) {
    Write-Host "Development server failed. Trying production build..." -ForegroundColor Yellow
    
    # Remove .next directory if it exists
    if (Test-Path ".next") {
        Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    # Try to build
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Starting production server..." -ForegroundColor Green
        npm start
    } else {
        Write-Host "All attempts failed. Please check the error messages above." -ForegroundColor Red
    }
}

Read-Host "Press Enter to exit" 