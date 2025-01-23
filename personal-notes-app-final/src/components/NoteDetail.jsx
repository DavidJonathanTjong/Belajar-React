import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils/index";
import NoteDetailAction from "./NoteDetailAction";
import { useNavigate } from "react-router-dom";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/network-data";

function NoteDetail({ title, body, createdAt, id, archived }) {
  const navigate = useNavigate();

  async function onArchiveHandler() {
    if (archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }

    navigate("/");
  }

  async function onDeleteHandler() {
    await deleteNote(id);
    navigate("/");
  }

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{title}</h2>
      <p className="detail-page__createdAt"> {showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parser(body)}</div>
      <NoteDetailAction
        onArchive={onArchiveHandler}
        onDelete={onDeleteHandler}
      />
    </div>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteDetail;
