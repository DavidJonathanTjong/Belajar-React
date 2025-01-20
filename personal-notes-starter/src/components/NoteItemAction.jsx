import React from "react";

function NoteItemAction({ onDelete, onArchive, id, statusNote }) {
  return (
    <div className="note-item__action">
      <button className="note-item__delete-button" onClick={() => onDelete(id)}>
        Hapus
      </button>
      <button
        className="note-item__archive-button"
        onClick={() => onArchive(id)}
      >
        {statusNote ? "Pindahkan" : "Arsipkan"}
      </button>
    </div>
  );
}

export default NoteItemAction;
