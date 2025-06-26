Write-Host ""
Write-Host "========================================"
Write-Host "   Quick GitHub Fix for AFH Office"
Write-Host "========================================"
Write-Host ""

# Check current status
Write-Host "Checking current Git status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "Current remote configuration:" -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "========================================"
Write-Host "   IMPORTANT: Create Repository First!"
Write-Host "========================================"
Write-Host ""
Write-Host "1. Open your browser and go to:" -ForegroundColor Cyan
Write-Host "   https://github.com/new" -ForegroundColor Green
Write-Host ""
Write-Host "2. Create a new repository with these settings:" -ForegroundColor Cyan
Write-Host "   - Owner: afhofficepro" -ForegroundColor White
Write-Host "   - Repository name: afh (or afhoffice if taken)" -ForegroundColor White
Write-Host "   - Description: Multi-tenant healthcare SaaS platform" -ForegroundColor White
Write-Host "   - Public or Private: Your choice" -ForegroundColor White
Write-Host "   - DO NOT initialize with README, .gitignore, or license!" -ForegroundColor Red
Write-Host ""
Write-Host "3. Click 'Create repository'" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key when you've created the repository..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "What is the repository name you created? (default: afh)" -ForegroundColor Yellow
$repoName = Read-Host "Repository name"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "afh"
}

# Update remote URL
$githubUrl = "https://github.com/afhofficepro/$repoName.git"
Write-Host ""
Write-Host "Setting remote URL to: $githubUrl" -ForegroundColor Cyan

# Remove existing remote if it exists
git remote remove origin 2>$null

# Add new remote
git remote add origin $githubUrl

Write-Host "Remote URL updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "New remote configuration:" -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "========================================"
Write-Host "   Ready to Push!"
Write-Host "========================================"
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "You will be prompted for:" -ForegroundColor Yellow
Write-Host "  - Username: afhofficepro" -ForegroundColor White
Write-Host "  - Password: Your Personal Access Token (NOT your password!)" -ForegroundColor White
Write-Host ""
Write-Host "If you don't have a token:" -ForegroundColor Red
Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Generate new token (classic)" -ForegroundColor White
Write-Host "3. Select 'repo' scope" -ForegroundColor White
Write-Host "4. Copy the token and use it as password" -ForegroundColor White
Write-Host ""

# Push to GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "   Success! 🎉"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Your code is now on GitHub at:" -ForegroundColor Green
    Write-Host "https://github.com/afhofficepro/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "- Add a README.md file" -ForegroundColor White
    Write-Host "- Set up GitHub Actions for CI/CD" -ForegroundColor White
    Write-Host "- Configure branch protection rules" -ForegroundColor White
    Write-Host "- Add collaborators if needed" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Push failed. Common issues:" -ForegroundColor Red
    Write-Host "- Repository doesn't exist (create it first)" -ForegroundColor Yellow
    Write-Host "- Wrong credentials (use Personal Access Token)" -ForegroundColor Yellow
    Write-Host "- Repository name mismatch" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Try running this script again after fixing the issue." -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 