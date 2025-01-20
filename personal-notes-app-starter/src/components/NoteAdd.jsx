import React from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa6";

function NoteAdd({ titleInput, bodyInput, submit }) {
  return (
    <form onSubmit={submit}>
      <div className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="Judul catatan ..."
          onInput={titleInput}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Isi Catatan ...."
          contentEditable
          onInput={bodyInput}
        ></div>
        <div className="add-new-page__action">
          <button type="submit" className="action">
            <FaCheck />
          </button>
        </div>
      </div>
    </form>
  );
}

NoteAdd.propTypes = {
  titleInput: PropTypes.func.isRequired,
  bodyInput: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default NoteAdd;
