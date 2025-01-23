import React from "react";
import NoteItemBody from "./NoteItemBody";
import PropTypes from "prop-types";

function NoteItem({ title, createdAt, body, id }) {
  return (
    <div className="note-item">
      <NoteItemBody title={title} createdAt={createdAt} body={body} id={id} />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default NoteItem;
