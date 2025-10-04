import React from "react";
import { Note } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/storage";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NoteViewProps {
  note: Note;
  onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDate(note.createdAt)}
        </p>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-350px)]">
        <CardContent>{note.content}</CardContent>
      </ScrollArea>
      <CardFooter className="flex justify-end">
        <Button onClick={onEdit} className="cursor-pointer">
          Edit Note
        </Button>
      </CardFooter>
    </Card>
  );
}
