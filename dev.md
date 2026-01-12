# 🔒 Secure Notes Extension

A secure, local-only Chrome/Edge extension for managing notes with pinning and copy features. All data is stored locally on your disk with no server communication.

## ✨ Features

- **Create, Read, Update, Delete** notes
- **Pin important notes** to keep them at the top
- **Copy notes** to clipboard with one click
- **100% Local Storage** - all data stays on your computer
- **No Login Required** - instant access
- **Secure** - uses browser's encrypted storage API
- **Clean UI** - modern, intuitive interface

## 🔐 Security

- All data is stored using Chrome's `chrome.storage.local` API
- Data is stored in your browser's encrypted local storage
- No external servers or network requests
- Data never leaves your computer
- Each browser profile has isolated storage

## 📦 Installation

### Step 1: Create Extension Files

Create a new folder called `secure-notes-extension` and add these files:

1. **manifest.json** - Extension configuration
2. **popup.html** - Main UI
3. **styles.css** - Styling
4. **popup.js** - Functionality
5. Create placeholder icons (or use any 16x16, 48x48, 128x128 PNG images named `icon16.png`, `icon48.png`, `icon128.png`)

### Step 2: Load Extension in Chrome/Edge

#### For Chrome:
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select your `secure-notes-extension` folder
5. The extension icon will appear in your toolbar
6. **IMPORTANT**: Click **Details** on your extension
7. Enable **"Allow in Incognito"** toggle
8. The extension is now available everywhere!

#### For Edge:
1. Open Edge and go to `edge://extensions/`
2. Enable **Developer mode** (toggle in bottom-left)
3. Click **Load unpacked**
4. Select your `secure-notes-extension` folder
5. The extension icon will appear in your toolbar
6. **IMPORTANT**: Click **Details** on your extension
7. Enable **"Allow in InPrivate"** toggle
8. The extension is now available everywhere!

### Step 3: Create Icons (Optional)

You can create simple icon files or download any icon you like. Just name them:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

Or use this simple placeholder approach: create a 128x128 PNG with a lock emoji or text.

### Step 4: Pin Extension (Recommended)

To access your notes quickly from any page:
1. Click the **puzzle piece icon** (Extensions) in your browser toolbar
2. Find **Secure Notes**
3. Click the **pin icon** to keep it visible
4. Now you can access it with one click from any page!

## 🚀 Usage

### Adding a Note
1. Click the extension icon
2. Type your note in the text area
3. Click **Add Note** or press `Ctrl+Enter`

### Pinning a Note
- Click the **📌 Pin** button on any note
- Pinned notes appear at the top in a separate section
- Click **📌 Unpin** to remove the pin

### Copying a Note
- Click the **📋 Copy** button
- The note content is copied to your clipboard
- Button shows "✓ Copied!" confirmation

### Editing a Note
- Click the **✏️ Edit** button
- The note appears in the input field
- Make your changes
- Click **Update Note**

### Deleting a Note
- Click the **🗑️ Delete** button
- Confirm the deletion
- Note is permanently removed

## 💾 Data Storage Location

Your notes are stored in:
- **Chrome**: `%LocalAppData%\Google\Chrome\User Data\Default\Local Storage` (Windows)
- **Edge**: `%LocalAppData%\Microsoft\Edge\User Data\Default\Local Storage` (Windows)
- **Mac/Linux**: Similar paths in user data directories

The data is encrypted by the browser and tied to your user profile.

## 🔒 Privacy & Security Notes

### Storage Behavior

- **Normal Mode**: Notes saved in regular browser storage
- **Incognito/InPrivate Mode**: 
  - The extension works in incognito/InPrivate when enabled
  - With `"incognito": "split"` setting, incognito has **separate storage**
  - Notes created in incognito won't appear in normal mode and vice versa
  - Incognito notes are deleted when you close all incognito windows
  - This is a security feature to keep private browsing truly private

### Security Recommendations

- **Passwords**: While the extension uses browser encryption, it's recommended to use a dedicated password manager for sensitive passwords
- **Backup**: Export/backup your browser profile periodically if you store critical information
- **Profile Isolation**: Each browser profile has separate storage
- **Incognito Usage**: Remember that incognito notes are temporary and deleted after session ends

### How to Share Notes Between Normal and Incognito (Optional)

If you want notes to be shared between normal and incognito modes:
1. Change `"incognito": "split"` to `"incognito": "spanning"` in manifest.json
2. Reload the extension
3. **Warning**: This reduces privacy in incognito mode

## 🌐 Accessibility

The extension is now accessible:
- ✅ From **any website** (youtube.com, google.com, github.com, etc.)
- ✅ From **chrome://extensions/** and **edge://extensions/** pages
- ✅ From **new tab** pages
- ✅ In **incognito/InPrivate** windows (when enabled)
- ✅ While **offline** (no internet needed)
- ✅ Across **multiple windows** simultaneously

## 🛠️ Technical Details

- **Manifest Version**: 3 (latest standard)
- **Storage API**: `chrome.storage.local` (encrypted)
- **No Permissions**: Only requires storage permission
- **No Network**: Zero network requests
- **Compatible**: Chrome, Edge, Brave, and other Chromium browsers

## 📝 File Structure

```
secure-notes-extension/
├── manifest.json      # Extension configuration
├── popup.html         # Main UI structure
├── styles.css         # Visual styling
├── popup.js           # Core functionality
├── icon16.png         # Small icon
├── icon48.png         # Medium icon
└── icon128.png        # Large icon
```

## 🔄 Updates

To update the extension:
1. Modify the files in your extension folder
2. Go to `chrome://extensions/` or `edge://extensions/`
3. Click the **Reload** button on your extension

## ⚠️ Troubleshooting

**Extension not loading?**
- Make sure all files are in the same folder
- Check that manifest.json has no syntax errors
- Verify Developer mode is enabled

**Notes not saving?**
- Check browser console for errors (F12)
- Ensure you have storage permissions

**Icons not showing?**
- Icons are optional - extension works without them
- Use any PNG files with correct dimensions

## 📄 License

Free to use and modify for personal or commercial use.