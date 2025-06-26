@echo off
echo.
echo ========================================
echo    Push AFH Office to GitHub
echo ========================================
echo.
echo IMPORTANT: Before running this script:
echo 1. Create a new repository on GitHub named "afhoffice"
echo 2. DO NOT initialize it with any files
echo 3. Replace YOUR_USERNAME in this script with your GitHub username
echo.
pause

REM Change branch name to main (modern standard)
git branch -M main

REM Add remote repository
REM Using your GitHub repository: https://github.com/afhofficepro/afh
git remote add origin https://github.com/afhofficepro/afh.git

REM Push to GitHub
git push -u origin main

echo.
echo ========================================
echo If you see an authentication error:
echo 1. You need to use a Personal Access Token (PAT) instead of password
echo 2. Go to: https://github.com/settings/tokens
echo 3. Generate a new token with 'repo' scope
echo 4. Use the token as your password
echo ========================================
echo.
pause 