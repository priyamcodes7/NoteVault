import { useState } from "react";
import { Plus, Search, Tag, Settings, FileText, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";
import { AuthScreen } from "./AuthScreen";

// Mock data for demonstration
const mockNotes = [
  {
    id: 1,
    title: "Welcome to Your Notes App",
    content: "This is your first note! Start writing your thoughts, ideas, and important information here. You can organize your notes with tags and search through them easily.",
    tags: ["welcome", "tutorial"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Project Ideas",
    content: "1. Build a personal website\n2. Learn React advanced patterns\n3. Create a mobile app\n4. Write technical blog posts\n5. Contribute to open source",
    tags: ["projects", "goals", "development"],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: 3,
    title: "Meeting Notes - Q1 Planning",
    content: "Key points from today's meeting:\n- Focus on user experience improvements\n- Implement new feature requests\n- Review performance metrics\n- Plan team training sessions",
    tags: ["meeting", "planning", "work"],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: 4,
    title: "Reading List",
    content: "Books to read this year:\n📚 The Pragmatic Programmer\n📚 Clean Code\n📚 Design Patterns\n📚 System Design Interview",
    tags: ["books", "learning", "reading"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-14"),
  },
];

export const NotesApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState(mockNotes);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();

  // Filter notes based on search and tags
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => note.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreating(true);
  };

  const handleSelectNote = (noteId: number) => {
    setSelectedNote(noteId);
    setIsCreating(false);
  };

  const handleSaveNote = (noteData: any) => {
    if (isCreating) {
      const newNote = {
        id: Date.now(),
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([newNote, ...notes]);
    } else if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote 
          ? { ...note, ...noteData, updatedAt: new Date() }
          : note
      ));
    }
    setIsCreating(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote === noteId) {
      setSelectedNote(null);
      setIsCreating(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const currentNote = selectedNote ? notes.find(n => n.id === selectedNote) : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-notes-surface border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold">Notes App</h1>
            </div>
            
            <Button 
              onClick={handleCreateNote}
              className="w-full bg-gradient-primary hover:bg-notes-primary-light border-0 shadow-notes-card"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="p-4 border-b border-border space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {allTags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Tag className="w-3 h-3" />
                  Tags
                </div>
                <div className="flex flex-wrap gap-1">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer text-xs"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                isSelected={selectedNote === note.id}
                onClick={() => handleSelectNote(note.id)}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
            {filteredNotes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notes found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* User Settings */}
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setIsAuthenticated(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {(selectedNote && currentNote) || isCreating ? (
            <NoteEditor
              note={currentNote}
              isCreating={isCreating}
              onSave={handleSaveNote}
              onCancel={() => {
                setSelectedNote(null);
                setIsCreating(false);
              }}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-surface">
              <div className="text-center animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-notes-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Welcome to Your Notes</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Select a note from the sidebar to start reading, or create a new note to capture your thoughts.
                </p>
                <Button onClick={handleCreateNote} size="lg" className="bg-gradient-primary hover:bg-notes-primary-light">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Note
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};