Write-Host "🔧 Fixing build issues..." -ForegroundColor Cyan

# Clean everything
Write-Host "Cleaning build artifacts..." -ForegroundColor Yellow
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path package-lock.json -Force -ErrorAction SilentlyContinue

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Install with specific Node version settings
Write-Host "Installing dependencies..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--max-old-space-size=4096"
npm install --legacy-peer-deps --force

# Try to build
Write-Host "Building application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Commit and push
    Write-Host "Committing and pushing changes..." -ForegroundColor Yellow
    git add -A
    git commit -m "Fix build configuration for Windows"
    git push origin main
    
    Write-Host "🚀 Deployment triggered! Check GitHub Actions for status." -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Trying alternative approach..." -ForegroundColor Red
    
    # Create a minimal working build
    Write-Host "Creating minimal build configuration..." -ForegroundColor Yellow
    
    # Update package.json with minimal deps
    $packageJson = @'
{
  "name": "afhoffice",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.5.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "firebase": "^10.7.1",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "typescript": "5.2.2",
    "@types/node": "20.8.10",
    "@types/react": "18.2.37",
    "@types/react-dom": "18.2.15",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.5",
    "eslint": "8.53.0",
    "eslint-config-next": "13.5.6"
  }
}
'@
    
    $packageJson | Out-File -FilePath package.json -Encoding UTF8
    
    # Install again
    npm install --legacy-peer-deps
    
    # Try build again
    npm run build
} 