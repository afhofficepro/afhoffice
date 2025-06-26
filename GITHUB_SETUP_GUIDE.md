# GitHub Setup Guide for AFH Office

This guide will help you connect your AFH Office project to GitHub.

## Prerequisites
- Git is already installed ✓
- Initial commit is already created ✓
- You need a GitHub account (create one at https://github.com if you don't have one)

## Option 1: Using GitHub CLI (Recommended)

### Step 1: Install GitHub CLI
1. Download GitHub CLI from: https://cli.github.com/
2. Run the installer for Windows
3. Restart your PowerShell terminal after installation

### Step 2: Authenticate with GitHub
```bash
gh auth login
```
Follow the prompts to authenticate with your GitHub account.

### Step 3: Create and Connect Repository
```bash
# Create a new repository on GitHub
gh repo create afhoffice --public --source=. --remote=origin --push

# Or for a private repository:
gh repo create afhoffice --private --source=. --remote=origin --push
```

## Option 2: Manual Setup (Using Web Browser)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `afhoffice`
3. Description: "Multi-tenant healthcare SaaS platform for Adult Family Homes"
4. Choose: Public or Private
5. DO NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Connect Local Repository to GitHub
After creating the repository, GitHub will show you commands. Use these in PowerShell:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/afhoffice.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enter Credentials
- If prompted for username: Enter your GitHub username
- If prompted for password: Use a Personal Access Token (PAT), not your password

#### Creating a Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "AFH Office Push"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again!)
7. Use this token as your password when Git asks

## Option 3: Using SSH (Advanced)

### Step 1: Generate SSH Key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Step 2: Add SSH Key to GitHub
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to https://github.com/settings/keys
3. Click "New SSH key"
4. Paste your key and save

### Step 3: Connect Using SSH
```bash
git remote add origin git@github.com:YOUR_USERNAME/afhoffice.git
git branch -M main
git push -u origin main
```

## Verify Connection

After connecting, verify with:
```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/afhoffice.git (fetch)
origin  https://github.com/YOUR_USERNAME/afhoffice.git (push)
```

## Next Steps

1. **Add a proper .gitignore**: Make sure sensitive files are not tracked
2. **Set up branch protection**: Protect your main branch on GitHub
3. **Enable GitHub Actions**: For CI/CD pipelines
4. **Add collaborators**: If working with a team

## Common Issues

### "Support for password authentication was removed"
- You must use a Personal Access Token instead of your password
- Follow the PAT creation steps above

### "Permission denied (publickey)"
- Your SSH key is not set up correctly
- Follow the SSH setup steps above

### "Repository not found"
- Check your GitHub username is correct
- Ensure the repository was created successfully
- Verify you have the right permissions

## Useful Commands

```bash
# Check current remote
git remote -v

# Change remote URL if needed
git remote set-url origin NEW_URL

# Push changes
git push

# Pull latest changes
git pull

# Check status
git status

# View commit history
git log --oneline
```

## GitHub Repository Settings

Once your repository is on GitHub, consider:

1. **Add a description**: Make it clear what your project does
2. **Add topics**: `healthcare`, `saas`, `multi-tenant`, `nextjs`, `typescript`
3. **Set up GitHub Pages**: For documentation
4. **Configure security alerts**: For dependency vulnerabilities
5. **Set up issue templates**: For bug reports and feature requests

---

Need help? Check the [GitHub Docs](https://docs.github.com/) or ask in the GitHub Community Forum. 