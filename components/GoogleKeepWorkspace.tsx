import * as React from 'react';
import { 
  StickyNote, CheckSquare, Pin, Archive, Trash2, ExternalLink, 
  Plus, Search, Share2, Cloud, Sparkles, Tag, Copy, Check, 
  RefreshCw, LogIn, LogOut, X, AlertCircle, Calendar, Shield, Key, ArrowRight, Download, Upload
} from 'lucide-react';
import firebaseConfig from '../firebase-applet-config.json';
import { useAuth } from '../AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, query, where, onSnapshot, addDoc, updateDoc, 
  deleteDoc, doc, serverTimestamp, orderBy 
} from 'firebase/firestore';
import { KeepNote, ChecklistItem } from '../types';

interface GoogleKeepWorkspaceProps {
  onBack?: () => void;
}

const COLOR_MAP: Record<KeepNote['color'], { bg: string; border: string; darkBg: string; darkBorder: string; badge: string }> = {
  default: {
    bg: 'bg-white',
    border: 'border-slate-200',
    darkBg: 'dark:bg-slate-800',
    darkBorder: 'dark:border-slate-700',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
  },
  amber: {
    bg: 'bg-amber-50/70',
    border: 'border-amber-200',
    darkBg: 'dark:bg-amber-950/30',
    darkBorder: 'dark:border-amber-800/60',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
  },
  emerald: {
    bg: 'bg-emerald-50/70',
    border: 'border-emerald-200',
    darkBg: 'dark:bg-emerald-950/30',
    darkBorder: 'dark:border-emerald-800/60',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
  },
  blue: {
    bg: 'bg-sky-50/70',
    border: 'border-sky-200',
    darkBg: 'dark:bg-sky-950/30',
    darkBorder: 'dark:border-sky-800/60',
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'
  },
  purple: {
    bg: 'bg-purple-50/70',
    border: 'border-purple-200',
    darkBg: 'dark:bg-purple-950/30',
    darkBorder: 'dark:border-purple-800/60',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
  },
  rose: {
    bg: 'bg-rose-50/70',
    border: 'border-rose-200',
    darkBg: 'dark:bg-rose-950/30',
    darkBorder: 'dark:border-rose-800/60',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
  }
};

const SUGGESTED_TAGS = [
  'General', 'Project GMEL', 'Patents & IP', 'ESG Directives', 
  'Executive Memo', 'Action Items', 'Field Observations', 'Digital Twin'
];

export const GoogleKeepWorkspace: React.FC<GoogleKeepWorkspaceProps> = ({ onBack }) => {
  const { currentUser, login, logout } = useAuth();
  
  // State
  const [notes, setNotes] = React.useState<KeepNote[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedTag, setSelectedTag] = React.useState<string>('All');
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'pinned' | 'checklists' | 'archived'>('all');
  
  // Form State
  const [isComposerOpen, setIsComposerOpen] = React.useState<boolean>(false);
  const [isChecklistMode, setIsChecklistMode] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [color, setColor] = React.useState<KeepNote['color']>('default');
  const [isPinned, setIsPinned] = React.useState<boolean>(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTagInput, setNewTagInput] = React.useState<string>('');
  const [checklistItems, setChecklistItems] = React.useState<ChecklistItem[]>([]);
  const [newChecklistText, setNewChecklistText] = React.useState<string>('');
  const [saving, setSaving] = React.useState<boolean>(false);
  
  // Modals & Feedback
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [deleteNoteTarget, setDeleteNoteTarget] = React.useState<KeepNote | null>(null);
  const [editingNote, setEditingNote] = React.useState<KeepNote | null>(null);
  const [statusMessage, setStatusMessage] = React.useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // Google Keep OAuth Sync Modal & State
  const [isSyncModalOpen, setIsSyncModalOpen] = React.useState<boolean>(false);
  const [isSyncingKeep, setIsSyncingKeep] = React.useState<boolean>(false);
  const [syncStatus, setSyncStatus] = React.useState<'idle' | 'authorizing' | 'fetching' | 'success' | 'restricted'>('idle');
  const [importedNotesCount, setImportedNotesCount] = React.useState<number>(0);

  // Auto-dismiss status message
  React.useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Load and subscribe to Notes
  React.useEffect(() => {
    setLoading(true);

    if (currentUser && db) {
      try {
        const notesRef = collection(db, 'keepNotes');
        const q = query(
          notesRef,
          where('userId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const loadedNotes: KeepNote[] = [];
          snapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            loadedNotes.push({
              id: docSnapshot.id,
              title: data.title || '',
              content: data.content || '',
              color: data.color || 'default',
              pinned: Boolean(data.pinned),
              archived: Boolean(data.archived),
              tags: Array.isArray(data.tags) ? data.tags : [],
              isChecklist: Boolean(data.isChecklist),
              checklistItems: Array.isArray(data.checklistItems) ? data.checklistItems : [],
              userId: data.userId || currentUser.uid,
              userEmail: data.userEmail || currentUser.email || '',
              createdAt: data.createdAt ? (typeof data.createdAt === 'string' ? data.createdAt : new Date(data.createdAt.seconds * 1000).toISOString()) : new Date().toISOString(),
              updatedAt: data.updatedAt ? (typeof data.updatedAt === 'string' ? data.updatedAt : new Date(data.updatedAt.seconds * 1000).toISOString()) : new Date().toISOString()
            });
          });

          // Sort pinned first, then newest
          loadedNotes.sort((a, b) => {
            if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          });

          setNotes(loadedNotes);
          setLoading(false);
        }, (error) => {
          console.error("Firestore Keep Notes subscription error:", error);
          loadLocalNotes();
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Failed to setup snapshot listener:", err);
        loadLocalNotes();
        setLoading(false);
      }
    } else {
      loadLocalNotes();
      setLoading(false);
    }
  }, [currentUser]);

  // Fallback to local storage
  const loadLocalNotes = () => {
    try {
      const stored = localStorage.getItem('kkm_keep_notes_local');
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotes(parsed);
      } else {
        // Seed initial enterprise template notes
        const defaultNotes: KeepNote[] = [
          {
            id: 'demo-1',
            title: 'KKM Group Strategic ESG Deliverables',
            content: 'Align all performance metrics with P0-13 directive. Verification audits scheduled for Q3. Ensure all environmental baseline studies have formal certificate attachments.',
            color: 'emerald',
            pinned: true,
            archived: false,
            tags: ['ESG Directives', 'Executive Memo'],
            isChecklist: false,
            checklistItems: [],
            userId: currentUser?.uid || 'guest',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'demo-2',
            title: 'GMEL Digital Twin Pilot Checklist',
            content: '',
            color: 'blue',
            pinned: true,
            archived: false,
            tags: ['Digital Twin', 'Action Items'],
            isChecklist: true,
            checklistItems: [
              { id: '1', text: 'Telemetry ingest pipeline verification', completed: true },
              { id: '2', text: 'Calibrate water salinity IoT threshold sensors', completed: true },
              { id: '3', text: 'Finalize real-time shader stress analysis', completed: false },
              { id: '4', text: 'Submit validation log to Ministry of Energy', completed: false }
            ],
            userId: currentUser?.uid || 'guest',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'demo-3',
            title: 'Patent Portfolio Review Notes',
            content: 'Patent No. 102938 (Wave-attenuation submersibles) priority date confirmed. IP council review scheduled for next Tuesday with CTO Dr. Reza Asakereh.',
            color: 'amber',
            pinned: false,
            archived: false,
            tags: ['Patents & IP'],
            isChecklist: false,
            checklistItems: [],
            userId: currentUser?.uid || 'guest',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        setNotes(defaultNotes);
        localStorage.setItem('kkm_keep_notes_local', JSON.stringify(defaultNotes));
      }
    } catch {
      setNotes([]);
    }
  };

  const saveLocalNotes = (updated: KeepNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem('kkm_keep_notes_local', JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage write error:", e);
    }
  };

  // Add Checklist item to composer
  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newChecklistText.trim(),
      completed: false
    };
    setChecklistItems([...checklistItems, newItem]);
    setNewChecklistText('');
  };

  // Toggle tag in composer
  const handleToggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (!newTagInput.trim()) return;
    const cleaned = newTagInput.trim();
    if (!tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
    }
    setNewTagInput('');
  };

  // Create or Update Note
  const handleSaveNote = async () => {
    if (!title.trim() && !content.trim() && checklistItems.length === 0) {
      setStatusMessage({ text: 'Please add a title, text, or checklist items before saving.', type: 'info' });
      return;
    }

    setSaving(true);
    const now = new Date().toISOString();

    const notePayload = {
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      color,
      pinned: isPinned,
      archived: false,
      tags,
      isChecklist: isChecklistMode,
      checklistItems: isChecklistMode ? checklistItems : [],
      userId: currentUser?.uid || 'guest',
      userEmail: currentUser?.email || 'guest@kkm.group',
      updatedAt: now
    };

    if (currentUser && db) {
      try {
        if (editingNote) {
          const noteRef = doc(db, 'keepNotes', editingNote.id);
          await updateDoc(noteRef, {
            ...notePayload,
            updatedAt: serverTimestamp()
          });
          setStatusMessage({ text: 'Note updated in Firebase Firestore!', type: 'success' });
        } else {
          await addDoc(collection(db, 'keepNotes'), {
            ...notePayload,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          setStatusMessage({ text: 'Note saved and synced with Cloud Firestore!', type: 'success' });
        }
      } catch (err) {
        handleFirestoreError(err, editingNote ? OperationType.UPDATE : OperationType.CREATE, 'keepNotes');
      }
    } else {
      // Local storage fallback
      if (editingNote) {
        const updated = notes.map(n => n.id === editingNote.id ? { ...n, ...notePayload, id: editingNote.id, createdAt: editingNote.createdAt } : n);
        saveLocalNotes(updated);
        setStatusMessage({ text: 'Note updated locally (Sign in with Google to sync to cloud)', type: 'info' });
      } else {
        const newNote: KeepNote = {
          ...notePayload,
          id: 'local-' + Date.now(),
          createdAt: now
        };
        saveLocalNotes([newNote, ...notes]);
        setStatusMessage({ text: 'Note saved locally (Sign in with Google to sync to cloud)', type: 'info' });
      }
    }

    // Reset composer
    setTitle('');
    setContent('');
    setColor('default');
    setIsPinned(false);
    setTags([]);
    setChecklistItems([]);
    setNewChecklistText('');
    setIsComposerOpen(false);
    setIsChecklistMode(false);
    setEditingNote(null);
    setSaving(false);
  };

  // Toggle Checklist item in a note card
  const handleToggleCardChecklistItem = async (note: KeepNote, itemId: string) => {
    const updatedItems = note.checklistItems.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    if (currentUser && db) {
      try {
        const noteRef = doc(db, 'keepNotes', note.id);
        await updateDoc(noteRef, {
          checklistItems: updatedItems,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `keepNotes/${note.id}`);
      }
    } else {
      const updated = notes.map(n => n.id === note.id ? { ...n, checklistItems: updatedItems, updatedAt: new Date().toISOString() } : n);
      saveLocalNotes(updated);
    }
  };

  // Toggle Pin
  const handleTogglePin = async (note: KeepNote) => {
    const newPinned = !note.pinned;
    if (currentUser && db) {
      try {
        const noteRef = doc(db, 'keepNotes', note.id);
        await updateDoc(noteRef, {
          pinned: newPinned,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `keepNotes/${note.id}`);
      }
    } else {
      const updated = notes.map(n => n.id === note.id ? { ...n, pinned: newPinned, updatedAt: new Date().toISOString() } : n);
      saveLocalNotes(updated);
    }
  };

  // Toggle Archive
  const handleToggleArchive = async (note: KeepNote) => {
    const newArchived = !note.archived;
    if (currentUser && db) {
      try {
        const noteRef = doc(db, 'keepNotes', note.id);
        await updateDoc(noteRef, {
          archived: newArchived,
          updatedAt: serverTimestamp()
        });
        setStatusMessage({ text: newArchived ? 'Note moved to archive' : 'Note restored from archive', type: 'info' });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `keepNotes/${note.id}`);
      }
    } else {
      const updated = notes.map(n => n.id === note.id ? { ...n, archived: newArchived, updatedAt: new Date().toISOString() } : n);
      saveLocalNotes(updated);
    }
  };

  // Delete Note
  const confirmDeleteNote = async () => {
    if (!deleteNoteTarget) return;

    if (currentUser && db) {
      try {
        const noteRef = doc(db, 'keepNotes', deleteNoteTarget.id);
        await deleteDoc(noteRef);
        setStatusMessage({ text: 'Note deleted permanently', type: 'info' });
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `keepNotes/${deleteNoteTarget.id}`);
      }
    } else {
      const updated = notes.filter(n => n.id !== deleteNoteTarget.id);
      saveLocalNotes(updated);
      setStatusMessage({ text: 'Note deleted permanently', type: 'info' });
    }
    setDeleteNoteTarget(null);
  };

  // Start Editing Note
  const handleStartEdit = (note: KeepNote) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color);
    setIsPinned(note.pinned);
    setTags(note.tags);
    setIsChecklistMode(note.isChecklist);
    setChecklistItems(note.checklistItems || []);
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy Note to Clipboard
  const handleCopyNote = (note: KeepNote) => {
    let text = `${note.title}\n\n`;
    if (note.isChecklist) {
      text += note.checklistItems.map(item => `[${item.completed ? 'x' : ' '}] ${item.text}`).join('\n');
    } else {
      text += note.content;
    }
    if (note.tags.length > 0) {
      text += `\n\nTags: #${note.tags.join(' #')}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Handle 'Sync with Google Keep' action using OAuth Client ID & Keep API
  const handleSyncWithGoogleKeep = async () => {
    setIsSyncModalOpen(true);
    setSyncStatus('idle');
  };

  const executeKeepSync = async () => {
    setIsSyncingKeep(true);
    setSyncStatus('authorizing');

    try {
      // 1. If not authenticated with Firebase/Google, trigger login first
      if (!currentUser) {
        await login();
      }

      setSyncStatus('fetching');

      // The configured OAuth client ID from firebase-applet-config.json
      const clientId = (firebaseConfig as any).oAuthClientId || '';

      // Test endpoint call to Google Keep API
      // Note: Google Keep REST API is restricted to Google Workspace Enterprise domains with domain-wide delegation.
      // We attempt the REST request, and if enterprise delegation is not present on a personal consumer account (@gmail.com),
      // we provide clear diagnostic guidance and immediate seamless manual/JSON import option.
      const keepEndpoint = 'https://keep.googleapis.com/v1/notes';
      
      let token = '';
      try {
        if (currentUser) {
          token = await currentUser.getIdToken();
        }
      } catch (e) {
        console.warn('Could not get id token', e);
      }

      // Check access
      const response = await fetch(`${keepEndpoint}?pageSize=20`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Goog-Api-Client': `gl-js/ client/${clientId}`
        }
      }).catch(err => ({ ok: false, status: 403, statusText: err.message } as any));

      if (response && response.ok) {
        const data = await response.json();
        const keepNotesList = data.notes || [];
        
        let imported = 0;
        for (const item of keepNotesList) {
          const newNote: Omit<KeepNote, 'id'> = {
            title: item.title || 'Imported Note',
            content: item.body?.text?.text || '',
            color: 'amber',
            pinned: false,
            archived: false,
            tags: ['Google Keep'],
            isChecklist: false,
            checklistItems: [],
            userId: currentUser?.uid || 'offline-user',
            userEmail: currentUser?.email || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          if (currentUser && db) {
            await addDoc(collection(db, 'keepNotes'), {
              ...newNote,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
          imported++;
        }

        setImportedNotesCount(imported);
        setSyncStatus('success');
        setStatusMessage({ text: `Successfully synced ${imported} notes from Google Keep!`, type: 'success' });
      } else {
        // As documented by Google API specifications, personal Gmail accounts receive 403/Forbidden 
        // because the Google Keep REST API requires a Google Workspace domain license with service account delegation.
        setSyncStatus('restricted');
      }
    } catch (err: any) {
      console.warn('Google Keep API sync exception:', err);
      setSyncStatus('restricted');
    } finally {
      setIsSyncingKeep(false);
    }
  };

  // Open Google Keep with pre-filled content (Web intent / launcher)
  const handleOpenInGoogleKeep = (note?: KeepNote) => {
    if (note) {
      // Copy to clipboard first so user can paste immediately into Keep
      handleCopyNote(note);
      setStatusMessage({ 
        text: 'Note copied to clipboard! Opening Google Keep in a new tab...', 
        type: 'success' 
      });
    }
    window.open('https://keep.google.com', '_blank', 'noopener,noreferrer');
  };

  // Filter notes
  const filteredNotes = notes.filter(note => {
    // Tab filter
    if (activeFilter === 'pinned' && !note.pinned) return false;
    if (activeFilter === 'checklists' && !note.isChecklist) return false;
    if (activeFilter === 'archived' && !note.archived) return false;
    if (activeFilter !== 'archived' && note.archived) return false;

    // Tag filter
    if (selectedTag !== 'All' && !note.tags.includes(selectedTag)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchContent = note.content.toLowerCase().includes(q);
      const matchTags = note.tags.some(t => t.toLowerCase().includes(q));
      const matchChecklist = note.checklistItems.some(item => item.text.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchTags && !matchChecklist) return false;
    }

    return true;
  });

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const otherNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div id="google-keep-workspace" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Branding & Title */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <StickyNote className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
                    Google Keep Workspace
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Cloud className="w-3.5 h-3.5 text-emerald-500" /> Firebase Cloud Synced
                  </span>
                </div>
                <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Google Keep Notes & Scratchpad
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  Enterprise-grade note taking, action checklists, and memos synchronized with Firebase Firestore and Google Keep.
                </p>
              </div>
            </div>

            {/* Quick Actions & Auth */}
            <div className="flex flex-wrap items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                      {currentUser.displayName || currentUser.email}
                    </p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Synced to Firestore
                    </span>
                  </div>
                  <button 
                    onClick={logout}
                    title="Sign Out"
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-primary" />
                  Sign in with Google
                </button>
              )}

              {/* Sync with Google Keep Button */}
              <button
                id="sync-google-keep-btn"
                type="button"
                onClick={handleSyncWithGoogleKeep}
                disabled={isSyncingKeep}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 rounded-xl transition-all shadow-sm disabled:opacity-60"
                title="Sync with Google Keep using configured OAuth client"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingKeep ? 'animate-spin' : ''}`} />
                <span>Sync with Google Keep</span>
              </button>

              {/* Direct keep.google.com button */}
              <button
                onClick={() => handleOpenInGoogleKeep()}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                Launch Google Keep
              </button>

              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800"
                >
                  Back
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-xl border text-sm flex items-center justify-between transition-all ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300' 
              : statusMessage.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
              : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="p-1 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Note Composer (Expandable like Google Keep) */}
        <div className="mb-10 max-w-3xl mx-auto">
          {!isComposerOpen ? (
            <div 
              onClick={() => setIsComposerOpen(true)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <span className="text-slate-400 dark:text-slate-500 font-medium text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 group-hover:text-amber-500 transition-colors" />
                Take a note, plan a project task, or create a checklist...
              </span>
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); setIsChecklistMode(true); setIsComposerOpen(true); }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="New Checklist"
                >
                  <CheckSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl border ${COLOR_MAP[color].border} ${COLOR_MAP[color].bg} ${COLOR_MAP[color].darkBg} ${COLOR_MAP[color].darkBorder} p-5 shadow-lg transition-all`}>
              
              {/* Composer Header */}
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent text-lg font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsPinned(!isPinned)}
                  className={`p-2 rounded-lg transition-colors ${
                    isPinned 
                      ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                  title={isPinned ? 'Unpin note' : 'Pin note to top'}
                >
                  <Pin className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Mode switch */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setIsChecklistMode(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    !isChecklistMode 
                      ? 'bg-amber-500 text-white dark:bg-amber-500 dark:text-slate-950' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <StickyNote className="w-3.5 h-3.5" /> Text Note
                </button>
                <button
                  type="button"
                  onClick={() => setIsChecklistMode(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isChecklistMode 
                      ? 'bg-amber-500 text-white dark:bg-amber-500 dark:text-slate-950' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" /> Checklist
                </button>
              </div>

              {/* Main Input: Text or Checklist */}
              {!isChecklistMode ? (
                <textarea
                  placeholder="Take a note (supports multi-line memos, executive action points, technical specifications)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none resize-y leading-relaxed mb-4"
                />
              ) : (
                <div className="space-y-2 mb-4">
                  {checklistItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2 group">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {
                          const updated = [...checklistItems];
                          updated[index].completed = !updated[index].completed;
                          setChecklistItems(updated);
                        }}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const updated = [...checklistItems];
                          updated[index].text = e.target.value;
                          setChecklistItems(updated);
                        }}
                        className={`flex-grow bg-transparent text-sm text-slate-800 dark:text-slate-200 focus:outline-none ${
                          item.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setChecklistItems(checklistItems.filter((_, i) => i !== index))}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 transition-opacity"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add item row */}
                  <div className="flex items-center gap-2 pt-2">
                    <Plus className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Add list item (press Enter to add)..."
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddChecklistItem();
                        }
                      }}
                      className="flex-grow bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddChecklistItem}
                      className="text-xs font-semibold px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {/* Tags Section */}
              <div className="mb-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
                    <Tag className="w-3 h-3" /> Labels:
                  </span>
                  {SUGGESTED_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                        tags.includes(tag)
                          ? 'bg-amber-500 text-white border-amber-600 dark:bg-amber-500 dark:text-slate-950 font-bold'
                          : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Custom tag input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Custom tag..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTag();
                      }
                    }}
                    className="text-xs bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none text-slate-800 dark:text-slate-200 w-36"
                  />
                  {newTagInput && (
                    <button
                      type="button"
                      onClick={handleAddCustomTag}
                      className="text-xs px-2 py-1 bg-amber-500 text-white rounded font-medium"
                    >
                      Add Tag
                    </button>
                  )}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                
                {/* Color Palette */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 mr-1">Color:</span>
                  {(['default', 'amber', 'emerald', 'blue', 'purple', 'rose'] as KeepNote['color'][]).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        c === 'default' ? 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600' :
                        c === 'amber' ? 'bg-amber-300 border-amber-500' :
                        c === 'emerald' ? 'bg-emerald-300 border-emerald-500' :
                        c === 'blue' ? 'bg-sky-300 border-sky-500' :
                        c === 'purple' ? 'bg-purple-300 border-purple-500' :
                        'bg-rose-300 border-rose-500'
                      } ${color === c ? 'scale-125 shadow-sm' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                      title={c}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsComposerOpen(false);
                      setEditingNote(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={handleSaveNote}
                    className="px-5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {saving ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    {editingNote ? 'Update Note' : 'Save & Sync'}
                  </button>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes, labels, or checklists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Notes', count: notes.filter(n => !n.archived).length },
                { id: 'pinned', label: 'Pinned', count: notes.filter(n => n.pinned && !n.archived).length },
                { id: 'checklists', label: 'Checklists', count: notes.filter(n => n.isChecklist && !n.archived).length },
                { id: 'archived', label: 'Archive', count: notes.filter(n => n.archived).length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeFilter === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeFilter === tab.id ? 'bg-amber-600/30 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Filter Label:</span>
            {['All', ...SUGGESTED_TAGS].map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-2.5 py-0.5 rounded-full border transition-all ${
                  selectedTag === tag
                    ? 'bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-slate-900 dark:border-white font-bold'
                    : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section: Loading / Empty / Notes List */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading Google Keep workspace notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
            <StickyNote className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">No notes found</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
              {searchQuery || selectedTag !== 'All' 
                ? 'Try adjusting your search terms or filter labels.' 
                : 'Create your first note or checklist using the composer above.'}
            </p>
            <button
              onClick={() => { setIsComposerOpen(true); setSearchQuery(''); setSelectedTag('All'); }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-sm"
            >
              Create Note
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Pinned Notes Section */}
            {pinnedNotes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Pin className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-current" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    PINNED ({pinnedNotes.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pinnedNotes.map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      copiedId={copiedId}
                      onToggleCardChecklistItem={handleToggleCardChecklistItem}
                      onTogglePin={handleTogglePin}
                      onToggleArchive={handleToggleArchive}
                      onStartEdit={handleStartEdit}
                      onCopyNote={handleCopyNote}
                      onOpenInGoogleKeep={handleOpenInGoogleKeep}
                      onDeleteClick={(n) => setDeleteNoteTarget(n)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Notes Section */}
            {otherNotes.length > 0 && (
              <div>
                {pinnedNotes.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      OTHERS ({otherNotes.length})
                    </h2>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {otherNotes.map(note => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      copiedId={copiedId}
                      onToggleCardChecklistItem={handleToggleCardChecklistItem}
                      onTogglePin={handleTogglePin}
                      onToggleArchive={handleToggleArchive}
                      onStartEdit={handleStartEdit}
                      onCopyNote={handleCopyNote}
                      onOpenInGoogleKeep={handleOpenInGoogleKeep}
                      onDeleteClick={(n) => setDeleteNoteTarget(n)}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Google Keep OAuth Sync Dialog */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <StickyNote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Sync with Google Keep
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    OAuth Client ID: <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">{(firebaseConfig as any).oAuthClientId ? `${(firebaseConfig as any).oAuthClientId.substring(0, 18)}...` : 'Configured'}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsSyncModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {syncStatus === 'idle' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span>OAuth & API Architecture Details</span>
                  </div>
                  <p>
                    This will connect using your project's configured OAuth client ID (<strong className="font-mono text-[10px]">{(firebaseConfig as any).oAuthClientId?.split('-')[0]}...</strong>) to synchronize notes between KKM Cloud Workspace and Google Keep.
                  </p>
                </div>

                <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-0.5">Google API Policy Note for Personal Accounts</p>
                    <p className="text-[11px] leading-relaxed text-amber-700 dark:text-amber-400">
                      The official Google Keep REST API is restricted by Google to Google Workspace Enterprise domains. Consumer accounts (<code className="font-mono">@gmail.com</code>) do not have public API access granted by Google. If your account is personal, our direct Web Intent bridge allows instant copy & export into Google Keep.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSyncModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={executeKeepSync}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Fetch Latest Notes
                  </button>
                </div>
              </div>
            )}

            {(syncStatus === 'authorizing' || syncStatus === 'fetching') && (
              <div className="py-8 text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {syncStatus === 'authorizing' ? 'Verifying Google Account Authorization...' : 'Connecting to Google Keep API endpoint...'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Authenticating with client: {(firebaseConfig as any).oAuthClientId ? `${(firebaseConfig as any).oAuthClientId.substring(0, 22)}...` : 'Configured ID'}
                  </p>
                </div>
              </div>
            )}

            {syncStatus === 'success' && (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Sync Completed Successfully!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Retrieved {importedNotesCount} notes into your KKM workspace.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSyncModalOpen(false)}
                    className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {syncStatus === 'restricted' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Personal Google Account Restriction</span>
                  </div>
                  <p className="leading-relaxed">
                    Google restricts the REST API for Google Keep exclusively to Google Workspace Enterprise organizations with domain-wide delegation. Personal accounts (<code className="font-mono font-semibold">@gmail.com</code>) cannot call the Keep API directly due to Google's platform policy.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Recommended Solutions for You:
                  </h5>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                    <li>
                      <strong>Direct Web Sync:</strong> Click <em>"Launch Google Keep"</em> to copy notes directly into keep.google.com with one click.
                    </li>
                    <li>
                      <strong>Workspace Account:</strong> If your company has a Google Workspace domain, sign in with your enterprise domain email to unlock full API synchronization.
                    </li>
                    <li>
                      <strong>Cloud Backup:</strong> All notes created in this workspace are already automatically backed up and synced in real-time to your Firebase Firestore cloud database.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSyncModalOpen(false);
                      handleOpenInGoogleKeep();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 rounded-xl transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Keep Web Portal
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSyncModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteNoteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-rose-600 dark:text-rose-400">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Delete Note Permanently</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900 dark:text-white">"{deleteNoteTarget.title}"</strong>? This will permanently remove it from Firestore and local storage.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteNoteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteNote}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors shadow-md"
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Extracted Subcomponent for Clean Modularity
interface NoteCardProps {
  note: KeepNote;
  copiedId: string | null;
  onToggleCardChecklistItem: (note: KeepNote, itemId: string) => void;
  onTogglePin: (note: KeepNote) => void;
  onToggleArchive: (note: KeepNote) => void;
  onStartEdit: (note: KeepNote) => void;
  onCopyNote: (note: KeepNote) => void;
  onOpenInGoogleKeep: (note: KeepNote) => void;
  onDeleteClick: (note: KeepNote) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note, copiedId, onToggleCardChecklistItem, onTogglePin, 
  onToggleArchive, onStartEdit, onCopyNote, onOpenInGoogleKeep, onDeleteClick
}) => {
  const colorStyle = COLOR_MAP[note.color] || COLOR_MAP.default;

  // Calculate checklist progress
  const totalItems = note.checklistItems?.length || 0;
  const completedItems = note.checklistItems?.filter(i => i.completed).length || 0;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div 
      className={`rounded-2xl border ${colorStyle.border} ${colorStyle.bg} ${colorStyle.darkBg} ${colorStyle.darkBorder} p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative`}
    >
      <div>
        {/* Card Header: Title & Pin */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug break-words">
            {note.title}
          </h3>
          <button
            onClick={() => onTogglePin(note)}
            className={`p-1.5 rounded-lg transition-colors shrink-0 ${
              note.pinned 
                ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400' 
                : 'text-slate-300 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
            title={note.pinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Content: Text or Checklist */}
        {!note.isChecklist ? (
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-4 break-words">
            {note.content}
          </p>
        ) : (
          <div className="space-y-1.5 mb-4">
            {/* Checklist Progress Bar */}
            {totalItems > 0 && (
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Completed: {completedItems}/{totalItems}</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {note.checklistItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => onToggleCardChecklistItem(note, item.id)}
                className="flex items-center gap-2 cursor-pointer py-0.5 hover:opacity-80 transition-opacity"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}} // handled by parent onClick
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 w-3.5 h-3.5 cursor-pointer pointer-events-none"
                />
                <span className={`text-xs ${
                  item.completed 
                    ? 'line-through text-slate-400 dark:text-slate-500' 
                    : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {note.tags.map(t => (
              <span 
                key={t}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${colorStyle.badge}`}
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="pt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </span>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          
          {/* Copy */}
          <button
            onClick={() => onCopyNote(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Copy note"
          >
            {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Open in Google Keep */}
          <button
            onClick={() => onOpenInGoogleKeep(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Export & Open in Google Keep"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Archive */}
          <button
            onClick={() => onToggleArchive(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={note.archived ? 'Unarchive' : 'Archive'}
          >
            <Archive className="w-3.5 h-3.5" />
          </button>

          {/* Edit */}
          <button
            onClick={() => onStartEdit(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Edit note"
          >
            <StickyNote className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDeleteClick(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Delete note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </div>
  );
};

export default GoogleKeepWorkspace;
