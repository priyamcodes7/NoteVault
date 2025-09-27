import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export const NoteCard = ({ note, isSelected, onClick, onDelete }: NoteCardProps) => {
  const preview = note.content.slice(0, 120) + (note.content.length > 120 ? "..." : "");
  const timeAgo = formatDistanceToNow(note.updatedAt, { addSuffix: true });

  return (
    <div 
      className={`
        p-4 rounded-xl border cursor-pointer transition-all duration-200 animate-fade-in
        ${isSelected 
          ? 'bg-notes-primary/5 border-notes-primary shadow-notes-card' 
          : 'bg-notes-surface hover:bg-notes-surface-hover border-border hover:shadow-notes-sm'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-medium text-sm line-clamp-1 ${isSelected ? 'text-notes-primary' : 'text-foreground'}`}>
          {note.title}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-muted"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-destructive"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-xs text-muted-foreground mb-3 line-clamp-3 leading-relaxed">
        {preview}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          {note.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
              {tag}
            </Badge>
          ))}
          {note.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
              +{note.tags.length - 2}
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </div>
    </div>
  );
};