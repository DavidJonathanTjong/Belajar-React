import React from "react";
import { showFormattedDate } from "../utils/index";

function NoteItemBody({ title, date, isipesan }) {
  return (
    <div className="note-item__content">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__date">{showFormattedDate(date)}</p>
      <p className="note-item__body">{isipesan}</p>
    </div>
    // action button
  );
}

export default NoteItemBody;
