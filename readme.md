# 🔒 Secure Notes - Browser Extension

A minimalistic, professional note-taking browser extension with markdown support, code syntax highlighting, and local-only storage. No login required, no cloud sync, just your notes stored securely on your device.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Edge-orange)

## ✨ Features

- 📝 **Three Note Types**: Text (with Markdown), Code (with syntax highlighting), Images
- 📌 **Pin Important Notes** - Keep critical notes at the top
- 📋 **One-Click Copy** - Instantly copy note content to clipboard
- 💾 **Local Storage Only** - All data stored on your device, never transmitted
- 🔄 **Export/Import** - Sync across browsers manually via JSON files
- 🎨 **Syntax Highlighting** - Support for 12+ programming languages
- 🌙 **Professional UI** - Clean, minimalist design with dark code themes
- 🔒 **Privacy First** - No tracking, no analytics, no external servers
- ⚡ **Lightweight** - Fast and efficient, minimal resource usage
- 🌐 **Works Everywhere** - Available on any website, including incognito mode

## 📸 Screenshots

### Main Interface
Clean, professional design with icon-only buttons for minimal clutter.

### Code Snippets
Full syntax highlighting with Atom One Dark theme and separate copy button.

### Markdown Support
Headers, lists, code blocks, links, and more - all rendered beautifully.

## 🚀 Quick Start

### Prerequisites

- Google Chrome, Microsoft Edge, Brave, or any Chromium-based browser
- No additional software required

### Installation

1. **Download or Clone This Repository**
   ```bash
   git clone https://github.com/yourusername/secure-notes-extension.git
   cd secure-notes-extension
   ```

2. **Download Required Libraries**
   
   Download these three files and place them in the extension folder:
   
   - [marked.min.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js) - Markdown parser
   - [highlight.min.js](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js) - Syntax highlighting
   - [purify.min.js](https://cdn.jsdelivr.net/npm/dompurify@3.0.8/dist/purify.min.js) - HTML sanitization

3. **Verify Folder Structure**
   ```
   secure-notes-extension/
   ├── manifest.json
   ├── popup.html
   ├── styles.css
   ├── popup.js
   ├── highlight.css
   ├── marked.min.js        ← Downloaded
   ├── highlight.min.js     ← Downloaded
   ├── purify.min.js        ← Downloaded
   ├── icon16.png           (optional)
   ├── icon48.png           (optional)
   ├── icon128.png          (optional)
   ├── README.md
   └── LICENSE
   ```

4. **Load in Browser**
   
   **Chrome:**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select the `secure-notes-extension` folder
   - Click "Details" → Enable "Allow in incognito"
   
   **Edge:**
   - Navigate to `edge://extensions/`
   - Enable "Developer mode" (bottom-left toggle)
   - Click "Load unpacked"
   - Select the `secure-notes-extension` folder
   - Click "Details" → Enable "Allow in InPrivate"

5. **Pin to Toolbar**
   - Click the extensions icon (puzzle piece) in your toolbar
   - Find "Secure Notes"
   - Click the pin icon to keep it visible

## 📖 Usage Guide

### Creating Notes

1. **Text Notes**
   - Click the text icon (T)
   - Write your note with full Markdown support
   - Click the save icon

2. **Code Snippets**
   - Click the code icon (</>)
   - Select programming language from dropdown
   - Paste or type your code
   - Click the save icon

3. **Images**
   - Click the image icon
   - Select an image file
   - Add optional caption (supports Markdown)
   - Click the save icon

### Managing Notes

- **Pin**: Click 📌 to pin important notes to the top
- **Copy**: Click 📋 to copy note content to clipboard
- **Edit**: Click ✏️ to modify an existing note
- **Delete**: Click 🗑️ to remove a note (with confirmation)

### Keyboard Shortcuts

- `Ctrl + Enter` - Save note while editing

### Export/Import

**Export Notes:**
1. Click the download icon in the header
2. JSON file downloads to your Downloads folder
3. Filename: `secure-notes-[timestamp].json`

**Import Notes:**
1. Click the upload icon in the header
2. Select a previously exported JSON file
3. Choose "Merge" (combine with existing) or "Replace" (overwrite all)

### Cross-Browser Sync

Since notes are stored locally, use Export/Import to sync:

```
Chrome (Computer A)
    ↓ Export
Downloads/secure-notes-123456.json
    ↓ Copy to cloud (Google Drive, Dropbox, etc.)
    ↓ Download on Computer B
Edge (Computer B)
    ↓ Import
Notes now synced!
```

## 🔐 Security & Privacy

### What's Secure

✅ **Local-Only Storage** - All notes stored on your device  
✅ **Browser Encryption** - Data encrypted by Chrome/Edge  
✅ **No Network Access** - Extension never transmits data  
✅ **No Tracking** - Zero analytics or telemetry  
✅ **Profile Isolation** - Each browser profile has separate notes  
✅ **Open Source** - Fully auditable code  

### What's NOT Secure

❌ **No Password Protection** - Anyone with access to your computer can read notes  
❌ **Not E2E Encrypted** - Uses browser's encryption, not your own password  
❌ **Plain Text Exports** - Exported JSON files are not encrypted  
❌ **Vulnerable to Malware** - Standard computer security still applies  

### Security Recommendations

- ✅ Use full disk encryption (BitLocker/FileVault)
- ✅ Lock your computer when away
- ✅ Don't store highly sensitive data (use password managers for that)
- ✅ Keep exported files in secure locations
- ✅ Use incognito mode for truly temporary notes

### Best Use Cases

**✅ Good For:**
- Code snippets and examples
- Markdown documentation
- Quick notes and reminders
- Project ideas and brainstorming
- Shopping lists and to-dos
- Non-sensitive personal information

**❌ NOT For:**
- Passwords (use 1Password, Bitworm, etc.)
- Credit card numbers
- Social Security numbers
- Private API keys
- Medical records
- Financial information

## 🛠️ Technology Stack

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Storage**: `chrome.storage.local` API (browser-encrypted)
- **Markdown**: Marked.js v11.1.1
- **Syntax Highlighting**: Highlight.js v11.9.0 (Atom One Dark theme)
- **Sanitization**: DOMPurify v3.0.8
- **UI**: Vanilla JavaScript, CSS3
- **Supported Languages**: JavaScript, Python, Java, C++, C#, TypeScript, HTML, CSS, SQL, Bash, JSON, XML

## 📁 Project Structure

```
secure-notes-extension/
│
├── manifest.json           # Extension configuration & permissions
├── popup.html              # Main UI structure
├── popup.js                # Core functionality & logic
├── styles.css              # Visual styling (minimalist design)
├── highlight.css           # Code syntax highlighting theme
│
├── marked.min.js           # Markdown parser library
├── highlight.min.js        # Syntax highlighting library
├── purify.min.js           # XSS protection library
│
├── icon16.png              # Toolbar icon (16x16)
├── icon48.png              # Extension management icon (48x48)
├── icon128.png             # Chrome Web Store icon (128x128)
│
├── README.md               # This file
└── LICENSE                 # MIT License
```

## 🎨 Customization

### Changing Code Theme

Edit `highlight.css` to use a different Highlight.js theme:
- [Browse Themes](https://highlightjs.org/static/demo/)
- Download theme CSS
- Replace `highlight.css` content

### Modifying Colors

Edit `styles.css`:
- Header background: `.header` → `background`
- Save button color: `.btn-primary` → `background`
- Note card borders: `.note-card` → `border-color`

### Adding Languages

Highlight.js supports 190+ languages. To add more:
1. Download language pack from [Highlight.js](https://highlightjs.org/download/)
2. Include in `highlight.min.js`
3. Add to dropdown in `popup.html`

## 🐛 Troubleshooting

### Extension Not Loading

**Error: Missing libraries**
- Ensure all 3 `.min.js` files are downloaded
- Check exact filenames match (case-sensitive)

**Error: CSP violation**
- Verify `manifest.json` has no `content_security_policy` section
- Remove any old cached versions

### Notes Not Saving

- Check browser console (F12) for errors
- Verify storage permission in `manifest.json`
- Try clearing browser cache and reloading extension

### Incognito Mode Not Working

- Go to `chrome://extensions/` or `edge://extensions/`
- Click "Details" on Secure Notes
- Enable "Allow in incognito/InPrivate"

### Syntax Highlighting Not Working

- Verify `highlight.min.js` is present and loaded
- Check browser console for JavaScript errors
- Ensure code language is selected from dropdown

### Export/Import Issues

- Exported files must be valid JSON format
- Check file isn't corrupted or manually edited
- Ensure file has `.json` extension

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/secure-notes-extension.git

# Download dependencies (see Installation section)
# Make your changes
# Test in browser with "Load unpacked"
```

### Code Style

- Use meaningful variable names
- Comment complex logic
- Follow existing code structure
- Test on both Chrome and Edge

## 📝 Changelog

### Version 1.0.0 (2024)

- Initial release
- Text notes with Markdown support
- Code snippets with syntax highlighting
- Image storage with captions
- Pin/Copy/Edit/Delete functionality
- Export/Import for cross-browser sync
- Incognito mode support
- Professional minimalist UI

## 🔮 Roadmap

Potential future features:

- [ ] Search functionality across all notes
- [ ] Tags and categories
- [ ] Password protection with encryption
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts customization
- [ ] Note templates
- [ ] Backup reminders
- [ ] Browser sync option (optional cloud)
- [ ] Rich text editor option
- [ ] Folder organization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Marked.js](https://marked.js.org/) - Markdown parser
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting
- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS sanitization
- [Feather Icons](https://feathericons.com/) - SVG icons (inspiration)

## ⭐ Show Your Support

If you find this project useful, please consider:
- Giving it a ⭐ on GitHub
- Sharing it with others
- Contributing improvements
- Reporting bugs

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Everlasting12/secure-notes-extension/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Everlasting12/secure-notes-extension/discussions)
- **Email**: sidheshparab34@gmail.com

---

**Made with ❤️ for privacy-conscious note-takers**