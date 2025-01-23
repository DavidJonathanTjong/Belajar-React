import React from "react";
import PropTypes from "prop-types";
import { FaTrash, FaArchive } from "react-icons/fa";

function NoteDetailAction({ onArchive, onDelete }) {
  return (
    <div className="detail-page__action">
      <button className="action" onClick={onArchive} aria-label="Archive Note">
        <FaArchive />
      </button>
      <button className="action" onClick={onDelete} aria-label="Delete Note">
        <FaTrash />
      </button>
    </div>
  );
}

NoteDetailAction.propTypes = {
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetailAction;
