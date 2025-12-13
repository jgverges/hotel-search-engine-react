# 📦 Guide to Upload Project to GitHub

## ✅ Step 1: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button (top right) → **"New repository"**
3. Fill out the form:
   - **Repository name**: `hotel-search-engine-react` (or your preferred name)
   - **Description**: "Hotel search engine developed with React, TypeScript and Tailwind CSS"
   - **Visibility**: Choose **Public** or **Private** as preferred
   - ⚠️ **DO NOT check** "Initialize this repository with a README" (we already have one)
4. Click **"Create repository"**

## ✅ Step 2: Connect Local Repository with GitHub

After creating the repository on GitHub, you'll see a page with instructions. Run these commands in your terminal (in the project folder):

**IMPORTANT**: Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username!

```bash
# Remove the old remote (if it exists)
git remote remove origin

# Add the remote repository (replace YOUR_GITHUB_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/hotel-search-engine-react.git

# Verify it was added correctly
git remote -v

# Push code to GitHub
git branch -M main
git push -u origin main
```

## 🔐 If GitHub asks for authentication:

### Option A: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. When Git asks for password, use the token instead of your password

### Option B: GitHub CLI
```bash
# Install GitHub CLI if you don't have it
# Then authenticate:
gh auth login
```

## ✅ Step 3: Verify

1. Go to your repository on GitHub
2. You should see all project files
3. The README.md will automatically display on the main page

## 📝 Useful Commands for the Future

```bash
# Check file status
git status

# Add changes
git add .

# Make commit
git commit -m "Description of changes"

# Push changes to GitHub
git push

# View commit history
git log

# Create a new branch
git checkout -b branch-name

# Switch to main branch
git checkout main
```

## 🎉 Done!

Your project is now on GitHub and you can share it, collaborate, or use it as a portfolio.

## ⚠️ Troubleshooting

### Error: "Repository not found"
- Make sure the repository exists on GitHub
- Verify your GitHub username is correct
- Check that the repository name matches exactly

### Error: "Authentication failed"
- Use a Personal Access Token instead of password
- Make sure the token has `repo` permissions
