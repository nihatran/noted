"use client";

import { useState, useEffect } from "react";
import Header from "@/components/ui/header";
import NotesSidebar from "@/components/ui/notes-sidebar";
import { Note } from "@/lib/types";
import NoteView from "@/components/ui/note-view";
import NoteEditor from "@/components/ui/note-editor";
import EmptyState from "@/components/ui/empty-state";
import { loadNotes, saveNotes } from "@/lib/storage";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setIsEditing(true);
  };

  const selectNote = (note: Note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const renderNoteContent = () => {
    if (!activeNote && notes.length === 0) {
      return (
        <EmptyState
          message="Write your first note"
          buttonText="New Note"
          onButtonClick={createNewNote}
        />
      );
    }

    if (activeNote && isEditing) {
      return (
        <NoteEditor note={activeNote} onCancel={cancelEdit} onSave={saveNote} />
      );
    }

    if (activeNote) {
      return (
        <NoteView
          note={activeNote}
          onEdit={() => setIsEditing(true)}
        ></NoteView>
      );
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setActiveNote(updatedNote);
    setIsEditing(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white-50">
      <Header onNewNote={createNewNote} />
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="md:col-span-1">
          <NotesSidebar
            notes={notes}
            onSelectNote={selectNote}
            createNewNote={createNewNote}
            onDeleteNote={deleteNote}
            activeNoteId={activeNote?.id}
          ></NotesSidebar>
        </div>
        <div className="md: col-span-2">{renderNoteContent()}</div>
      </main>
    </div>
  );
}
