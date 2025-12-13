# 🚀 Cursor Optimization Guide

## Performance Issues - Solutions

### 1. **File Ignore Configuration**

Already configured in `.vscode/settings.json`:

- `node_modules` - Not indexed
- `dist` - Not indexed
- `.vite` - Not indexed

### 2. **Extensions that Slow Down**

Disable unnecessary extensions:

- Heavy Git extensions
- Multiple code analysis extensions
- Duplicate formatting extensions

### 3. **TypeScript Memory**

Already configured: `maxTsServerMemory: 4096`
If you have 8GB+ RAM, you can increase to 6144

### 4. **Close Unused Files**

- Close tabs you don't use
- Use `Ctrl+K W` to close all tabs

### 5. **Restart Cursor**

If it's still slow:

- `Ctrl+Shift+P` → "Reload Window"
- Or close and reopen Cursor

### 6. **Disable Heavy Features**

In Settings:

- Disable "Editor: Semantic Highlighting" if you don't need it
- Disable "Editor: Inlay Hints" (already disabled)

### 7. **Use Workspace Settings**

Configurations are in `.vscode/settings.json` - only affects this project

## ⚡ Applied Improvements

✅ Files ignored in search/indexing
✅ TypeScript memory optimized
✅ Suggestions optimized
✅ File watchers optimized

## 🔧 If It's Still Slow

1. **Check your PC:**

   - Minimum: 8GB RAM, SSD recommended
   - Cursor works well with 4GB RAM, but 8GB+ is ideal

2. **Close other applications:**

   - Browsers with many tabs
   - Other IDEs open
   - Heavy applications

3. **Restart Cursor completely**

4. **Check extensions:**
   - Disable all extensions
   - Enable one by one to find the problematic one
