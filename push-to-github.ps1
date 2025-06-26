Write-Host ""
Write-Host "========================================"
Write-Host "   Push AFH Office to GitHub"
Write-Host "========================================"
Write-Host ""
Write-Host "IMPORTANT: Before running this script:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub named 'afhoffice'"
Write-Host "2. DO NOT initialize it with any files"
Write-Host "3. Replace YOUR_USERNAME with your GitHub username (caregivespot)"
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Your GitHub username
$githubUsername = "afhofficepro"  # Your actual GitHub username

Write-Host ""
Write-Host "Setting up GitHub remote for user: $githubUsername" -ForegroundColor Cyan

# Change branch name to main (modern standard)
Write-Host "Renaming branch to 'main'..." -ForegroundColor Green
git branch -M main

# Check if remote already exists
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "Remote 'origin' already exists. Removing it..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote repository
Write-Host "Adding GitHub remote..." -ForegroundColor Green
git remote add origin "https://github.com/$githubUsername/afh.git"

# Show the remote URL
Write-Host ""
Write-Host "Remote URL set to:" -ForegroundColor Cyan
git remote -v

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Your repository is now available at: https://github.com/$githubUsername/afh" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "If you see an authentication error:" -ForegroundColor Yellow
    Write-Host "1. You need to use a Personal Access Token (PAT) instead of password"
    Write-Host "2. Go to: https://github.com/settings/tokens"
    Write-Host "3. Generate a new token with 'repo' scope"
    Write-Host "4. Use the token as your password when prompted"
    Write-Host "========================================"
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 