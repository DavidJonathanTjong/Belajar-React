import React from "react";
import NoteItemBody from "./NoteItemBody";
import NoteItemAction from "./NoteItemAction";

function NoteItem({
  title,
  createdAt,
  body,
  id,
  onDelete,
  onArchive,
  statusNote,
}) {
  return (
    <div className="note-item">
      <NoteItemBody title={title} date={createdAt} isipesan={body} />
      <NoteItemAction
        id={id}
        onDelete={onDelete}
        onArchive={onArchive}
        statusNote={statusNote}
      />
    </div>
  );
}

export default NoteItem;
