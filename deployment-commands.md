# GitHub & Netlify Deployment Commands

## Initial Setup (One-time only)
```bash
# Configure Git (if not done)
git config --global user.email "nixo.zderic@gmail.com"
git config --global user.name "Nandino Zderic"

# Initialize Git (if not done)
git init
git remote add origin https://github.com/nandinozderic/eusignal-demo.git
```

## Regular Development Workflow
```bash
# 1. Check status of your changes
git status

# 2. Add all changes to staging
git add .

# 3. Commit your changes
git commit -m "Your descriptive commit message"

# 4. Push to GitHub
git push origin main
```

## If You're Working on a New Branch
```bash
# 1. Create and switch to new branch
git checkout -b branch-name

# 2. Make your changes, then:
git add .
git commit -m "Your commit message"
git push origin branch-name
```

## If You Get "Updates were rejected" Error
```bash
# 1. Pull remote changes first
git pull origin main --allow-unrelated-histories

# 2. Resolve any conflicts, then:
git add .
git commit -m "Merge remote changes"
git push origin main
```

## Netlify Deployment
- Automatic: Any push to main branch will trigger deployment
- Manual: Go to Netlify dashboard and click "Trigger deploy"

## Useful Git Commands
```bash
# Check which branch you're on
git branch

# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# See commit history
git log

# Discard all local changes
git reset --hard
```

## Netlify Configuration (in netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Remember:
- Always pull before pushing if working in a team
- Write clear commit messages
- Test locally before pushing
- Check Netlify deployment logs if build fails