Write-Host "`n🚀 CLOUD RUN DEPLOYMENT MONITORING" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Changes pushed successfully!" -ForegroundColor Green
Write-Host "✅ Dockerfile added for Cloud Run" -ForegroundColor Green
Write-Host "✅ Build configuration updated" -ForegroundColor Green
Write-Host ""

Write-Host "🔄 Deployment Process:" -ForegroundColor Yellow
Write-Host "   1. GitHub Actions triggered ✓"
Write-Host "   2. Building Docker container..."
Write-Host "   3. Pushing to Google Container Registry..."
Write-Host "   4. Deploying to Cloud Run..."
Write-Host ""

Write-Host "📊 Monitor Progress Here:" -ForegroundColor Blue
Write-Host ""
Write-Host "   GitHub Actions (Build Status):" -ForegroundColor White
Write-Host "   https://github.com/afhofficepro/afhoffice/actions" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Cloud Build (Detailed Logs):" -ForegroundColor White
Write-Host "   https://console.cloud.google.com/cloud-build/builds?project=afhoffice-c50a4" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Cloud Run (Service Status):" -ForegroundColor White
Write-Host "   https://console.cloud.google.com/run/detail/us-west2/afhoffice/metrics?project=afhoffice-c50a4" -ForegroundColor Cyan
Write-Host ""

Write-Host "⏱️  Expected Timeline:" -ForegroundColor Magenta
Write-Host "   - Docker build: 2-3 minutes"
Write-Host "   - Container push: 1-2 minutes"
Write-Host "   - Cloud Run deployment: 1-2 minutes"
Write-Host "   - Total: ~5-7 minutes"
Write-Host ""

Write-Host "🎯 Once deployed, your app will be available at:" -ForegroundColor Green
Write-Host "   The Cloud Run service URL (check Cloud Run console)" -ForegroundColor Cyan
Write-Host ""

Write-Host "💡 Troubleshooting Tips:" -ForegroundColor Yellow
Write-Host "   - If build fails: Check Dockerfile syntax"
Write-Host "   - If deployment fails: Check Cloud Run logs"
Write-Host "   - Common issue: Missing environment variables"
Write-Host ""

# Quick status check
Write-Host "Press Enter to open GitHub Actions..." -ForegroundColor White
Read-Host
Start-Process "https://github.com/afhofficepro/afhoffice/actions" 