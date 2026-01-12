// Storage key for notes
const STORAGE_KEY = 'secureNotes';

// Current editing state
let editingNoteId = null;
let currentNoteType = 'text';
let currentImageData = null;

// DOM Elements
const noteInput = document.getElementById('noteInput');
const codeArea = document.getElementById('codeArea');
const imageCaption = document.getElementById('imageCaption');
const languageSelect = document.getElementById('languageSelect');
const addNoteBtn = document.getElementById('addNoteBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const pinnedNotesContainer = document.getElementById('pinnedNotes');
const allNotesContainer = document.getElementById('allNotes');
const emptyState = document.getElementById('emptyState');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');
const imageFile = document.getElementById('imageFile');
const selectImageBtn = document.getElementById('selectImageBtn');
const imagePreview = document.getElementById('imagePreview');

const textInput = document.getElementById('textInput');
const codeInput = document.getElementById('codeInput');
const imageInput = document.getElementById('imageInput');

// Configure marked
if (typeof marked !== 'undefined') {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  
  addNoteBtn.addEventListener('click', handleAddOrUpdateNote);
  cancelEditBtn.addEventListener('click', cancelEdit);
  exportBtn.addEventListener('click', exportNotes);
  importBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', importNotes);
  
  selectImageBtn.addEventListener('click', () => imageFile.click());
  imageFile.addEventListener('change', handleImageSelect);
  
  // Note type selector
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentNoteType = e.currentTarget.dataset.type;
      showInputForType(currentNoteType);
    });
  });
  
  // Allow Ctrl+Enter to add note
  [noteInput, codeArea].forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleAddOrUpdateNote();
      }
    });
  });
});

// Show input for selected type
function showInputForType(type) {
  textInput.style.display = 'none';
  codeInput.style.display = 'none';
  imageInput.style.display = 'none';
  
  if (type === 'text') textInput.style.display = 'block';
  else if (type === 'code') codeInput.style.display = 'block';
  else if (type === 'image') imageInput.style.display = 'block';
}

// Handle image selection
function handleImageSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    currentImageData = event.target.result;
    imagePreview.innerHTML = `<img src="${currentImageData}" alt="Preview">`;
    imagePreview.classList.add('active');
    imageCaption.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// Load notes from storage
async function loadNotes() {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  const notes = data[STORAGE_KEY] || [];
  renderNotes(notes);
}

// Save notes to storage
async function saveNotes(notes) {
  await chrome.storage.local.set({ [STORAGE_KEY]: notes });
}

// Render all notes
function renderNotes(notes) {
  const pinnedNotes = notes.filter(note => note.pinned);
  const unpinnedNotes = notes.filter(note => !note.pinned);
  
  pinnedNotesContainer.innerHTML = '';
  allNotesContainer.innerHTML = '';
  
  if (notes.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    
    pinnedNotes.forEach(note => {
      pinnedNotesContainer.appendChild(createNoteCard(note));
    });
    
    unpinnedNotes.forEach(note => {
      allNotesContainer.appendChild(createNoteCard(note));
    });
  }
}

// Create note card element
function createNoteCard(note) {
  const card = document.createElement('div');
  card.className = `note-card ${note.pinned ? 'pinned' : ''}`;
  
  // Main content area
  const noteMain = document.createElement('div');
  noteMain.className = 'note-main';
  
  // Header with type badge
  const header = document.createElement('div');
  header.className = 'note-header';
  
  const badge = document.createElement('span');
  badge.className = `note-type-badge ${note.type || 'text'}`;
  badge.textContent = note.type || 'text';
  header.appendChild(badge);
  
  noteMain.appendChild(header);
  
  // Content based on type
  const content = document.createElement('div');
  content.className = 'note-content';
  
  if (note.type === 'code') {
    const codeBlock = document.createElement('div');
    codeBlock.className = 'code-block';
    
    const codeHeader = document.createElement('div');
    codeHeader.className = 'code-header';
    codeHeader.innerHTML = `
      <span>${note.language || 'plaintext'}</span>
      <button class="copy-code-btn">Copy</button>
    `;
    
    const codeContent = document.createElement('div');
    codeContent.className = 'code-content';
    const codeEl = document.createElement('code');
    codeEl.className = `language-${note.language || 'plaintext'}`;
    codeEl.textContent = note.content;
    codeContent.appendChild(codeEl);
    
    // Highlight code if hljs is available
    if (typeof hljs !== 'undefined') {
      hljs.highlightElement(codeEl);
    }
    
    codeBlock.appendChild(codeHeader);
    codeBlock.appendChild(codeContent);
    content.appendChild(codeBlock);
    
    // Copy code button handler
    const copyCodeBtn = codeHeader.querySelector('.copy-code-btn');
    copyCodeBtn.addEventListener('click', function() {
      copyToClipboard(note.content, this);
    });
    
  } else if (note.type === 'image') {
    const img = document.createElement('img');
    img.src = note.imageData;
    img.className = 'note-image';
    content.appendChild(img);
    
    if (note.caption) {
      const caption = document.createElement('div');
      caption.className = 'markdown';
      if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        caption.innerHTML = DOMPurify.sanitize(marked.parse(note.caption));
      } else {
        caption.textContent = note.caption;
      }
      content.appendChild(caption);
    }
  } else {
    // Text/Markdown
    content.className = 'note-content markdown';
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
      content.innerHTML = DOMPurify.sanitize(marked.parse(note.content));
    } else {
      content.textContent = note.content;
    }
  }
  
  noteMain.appendChild(content);
  
  // Timestamp
  const timestamp = document.createElement('div');
  timestamp.className = 'note-timestamp';
  timestamp.textContent = formatDate(note.createdAt);
  noteMain.appendChild(timestamp);
  
  card.appendChild(noteMain);
  
  // Actions (vertically stacked on the right)
  const actions = document.createElement('div');
  actions.className = 'note-actions';
  
  const pinBtn = document.createElement('button');
  pinBtn.className = 'action-btn pin';
  pinBtn.title = note.pinned ? 'Unpin' : 'Pin';
  pinBtn.innerHTML = note.pinned ? '📌' : '📍';
  pinBtn.onclick = () => togglePin(note.id);
  
  const copyBtn = document.createElement('button');
  copyBtn.className = 'action-btn copy';
  copyBtn.title = 'Copy';
  copyBtn.innerHTML = '📋';
  copyBtn.onclick = () => copyToClipboard(note.content, copyBtn);
  
  const editBtn = document.createElement('button');
  editBtn.className = 'action-btn edit';
  editBtn.title = 'Edit';
  editBtn.innerHTML = '✏️';
  editBtn.onclick = () => editNote(note);
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.title = 'Delete';
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.onclick = () => deleteNote(note.id);
  
  actions.appendChild(pinBtn);
  if (note.type !== 'image') actions.appendChild(copyBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  
  card.appendChild(actions);
  
  return card;
}

// Handle add or update note
async function handleAddOrUpdateNote() {
  let content, noteData;
  
  if (currentNoteType === 'text') {
    content = noteInput.value.trim();
    if (!content) {
      noteInput.focus();
      return;
    }
    noteData = { content, type: 'text' };
  } else if (currentNoteType === 'code') {
    content = codeArea.value.trim();
    if (!content) {
      codeArea.focus();
      return;
    }
    noteData = { 
      content, 
      type: 'code', 
      language: languageSelect.value 
    };
  } else if (currentNoteType === 'image') {
    if (!currentImageData) {
      alert('Please select an image');
      return;
    }
    noteData = { 
      imageData: currentImageData,
      caption: imageCaption.value.trim(),
      content: imageCaption.value.trim() || 'Image',
      type: 'image' 
    };
  }
  
  const data = await chrome.storage.local.get(STORAGE_KEY);
  let notes = data[STORAGE_KEY] || [];
  
  if (editingNoteId) {
    notes = notes.map(note => 
      note.id === editingNoteId 
        ? { ...note, ...noteData, updatedAt: Date.now() }
        : note
    );
  } else {
    const newNote = {
      id: generateId(),
      ...noteData,
      pinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    notes.unshift(newNote);
  }
  
  await saveNotes(notes);
  clearInputs();
  editingNoteId = null;
  updateButtonState();
  loadNotes();
}

// Clear all inputs
function clearInputs() {
  noteInput.value = '';
  codeArea.value = '';
  imageCaption.value = '';
  currentImageData = null;
  imagePreview.innerHTML = '';
  imagePreview.classList.remove('active');
  imageCaption.style.display = 'none';
  imageFile.value = '';
}

// Edit note
function editNote(note) {
  currentNoteType = note.type || 'text';
  
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.type === currentNoteType) {
      btn.classList.add('active');
    }
  });
  
  showInputForType(currentNoteType);
  
  if (note.type === 'code') {
    codeArea.value = note.content;
    languageSelect.value = note.language || 'plaintext';
    codeArea.focus();
  } else if (note.type === 'image') {
    currentImageData = note.imageData;
    imagePreview.innerHTML = `<img src="${currentImageData}" alt="Preview">`;
    imagePreview.classList.add('active');
    imageCaption.value = note.caption || '';
    imageCaption.style.display = 'block';
  } else {
    noteInput.value = note.content;
    noteInput.focus();
  }
  
  editingNoteId = note.id;
  updateButtonState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cancel edit
function cancelEdit() {
  clearInputs();
  editingNoteId = null;
  updateButtonState();
}

// Update button state for edit mode
function updateButtonState() {
  if (editingNoteId) {
    addNoteBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>';
    addNoteBtn.title = 'Update note';
    cancelEditBtn.style.display = 'inline-flex';
  } else {
    addNoteBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>';
    addNoteBtn.title = 'Save note';
    cancelEditBtn.style.display = 'none';
  }
}

// Toggle pin status
async function togglePin(noteId) {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  let notes = data[STORAGE_KEY] || [];
  
  notes = notes.map(note => 
    note.id === noteId 
      ? { ...note, pinned: !note.pinned, updatedAt: Date.now() }
      : note
  );
  
  notes.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt - a.updatedAt;
  });
  
  await saveNotes(notes);
  loadNotes();
}

// Copy to clipboard
async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    
    const originalHTML = button.innerHTML;
    button.innerHTML = '✓';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

// Delete note
async function deleteNote(noteId) {
  if (!confirm('Delete this note?')) return;
  
  const data = await chrome.storage.local.get(STORAGE_KEY);
  let notes = data[STORAGE_KEY] || [];
  notes = notes.filter(note => note.id !== noteId);
  
  await saveNotes(notes);
  loadNotes();
  
  if (editingNoteId === noteId) {
    cancelEdit();
  }
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Export notes to JSON file
async function exportNotes() {
  try {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    const notes = data[STORAGE_KEY] || [];
    
    if (notes.length === 0) {
      alert('No notes to export!');
      return;
    }
    
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      notesCount: notes.length,
      notes: notes
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `secure-notes-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    exportBtn.style.color = '#10b981';
    setTimeout(() => {
      exportBtn.style.color = '';
    }, 1500);
    
  } catch (err) {
    console.error('Export failed:', err);
    alert('Failed to export notes.');
  }
}

// Import notes from JSON file
async function importNotes(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const text = await file.text();
    const importData = JSON.parse(text);
    
    if (!importData.notes || !Array.isArray(importData.notes)) {
      throw new Error('Invalid file format');
    }
    
    const data = await chrome.storage.local.get(STORAGE_KEY);
    const existingNotes = data[STORAGE_KEY] || [];
    
    let finalNotes;
    
    if (existingNotes.length > 0) {
      const choice = confirm(
        `You have ${existingNotes.length} existing note(s).\n\n` +
        `OK = Merge (combine)\nCancel = Replace (overwrite)`
      );
      
      if (choice) {
        const combined = [...existingNotes, ...importData.notes];
        const uniqueMap = new Map();
        
        combined.forEach(note => {
          const key = note.content.trim().toLowerCase();
          if (!uniqueMap.has(key) || note.updatedAt > uniqueMap.get(key).updatedAt) {
            uniqueMap.set(key, note);
          }
        });
        
        finalNotes = Array.from(uniqueMap.values());
      } else {
        finalNotes = importData.notes;
      }
    } else {
      finalNotes = importData.notes;
    }
    
    finalNotes.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.updatedAt - a.updatedAt;
    });
    
    await saveNotes(finalNotes);
    loadNotes();
    
    importBtn.style.color = '#10b981';
    setTimeout(() => {
      importBtn.style.color = '';
    }, 1500);
    
  } catch (err) {
    console.error('Import failed:', err);
    alert('Failed to import notes. Check file format.');
  }
  
  fileInput.value = '';
}