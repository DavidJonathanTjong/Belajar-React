import React from "react";
import { getInitialData } from "../utils/index";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import NoteSearch from "./NoteSearch";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchInput: "",
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onCariNoteHandler = this.onCariNoteHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveHandler(id) {
    const updateStatus = this.state.notes.map((note) => {
      if (note.id === id) {
        return { ...note, archived: !note.archived };
      }
      return note;
    });
    this.setState({ notes: updateStatus });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date(),
          },
        ],
      };
    });
  }

  onCariNoteHandler(searchInput) {
    this.setState({ searchInput: searchInput });
  }

  render() {
    const filterNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
    );

    const archiv = filterNotes.filter((note) => note.archived);
    const aktif = filterNotes.filter((note) => !note.archived);

    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Notes</h1>
          <NoteSearch cariNote={this.onCariNoteHandler} />
        </div>
        <div className="note-app__body">
          <div className="noteCreate">
            <h2>Buat Notes</h2>
          </div>
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Active Notes </h2>
          <NoteList
            notes={aktif}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
          <h2>Archive Notes </h2>
          <NoteList
            notes={archiv}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
