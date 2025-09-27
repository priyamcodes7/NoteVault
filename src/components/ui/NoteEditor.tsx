import { useState, useEffect } from "react";
import { Save, X, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NoteEditorProps {
  note?: Note | null;
  isCreating: boolean;
  onSave: (noteData: { title: string; content: string; tags: string[] }) => void;
  onCancel: () => void;
}

export const NoteEditor = ({ note, isCreating, onSave, onCancel }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    } else if (isCreating) {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [note, isCreating]);

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      content: content.trim(),
      tags: tags.filter(tag => tag.trim()),
    });
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-notes-surface">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">
              {isCreating ? "Create New Note" : "Edit Note"}
            </h2>
            {note && !isCreating && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Updated {formatDistanceToNow(note.updatedAt, { addSuffix: true })}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
              className="h-9"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!title.trim()}
              className="h-9 bg-gradient-primary hover:bg-notes-primary-light"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          </div>
        </div>

        {/* Title Input */}
        <Input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          className="text-lg font-medium border-0 shadow-none px-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/60"
          style={{ fontSize: "18px" }}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 space-y-4">
        {/* Tags Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Tags</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="w-32 h-7 text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddTag}
                disabled={!newTag.trim() || tags.includes(newTag.trim().toLowerCase())}
                className="h-7 px-2 text-xs"
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">Content</span>
          <Textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[400px] border-0 shadow-none p-0 focus-visible:ring-0 bg-transparent resize-none text-sm leading-relaxed"
            style={{ fontSize: "14px", lineHeight: "1.6" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
          </span>
          <span>
            Press Ctrl+Enter (⌘+Enter on Mac) to save quickly
          </span>
        </div>
      </div>
    </div>
  );
};