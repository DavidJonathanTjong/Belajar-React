import React from "react";
import NoteDetail from "../components/NoteDetail";
import { getNote } from "../utils/local-data";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id) || null,
    };
  }

  render() {
    if (this.state.note === null) {
      return (
        <div>
          <h2>404</h2>
          <p>Page is not found</p>
        </div>
      );
    }

    return (
      <section>
        <NoteDetail {...this.state.note} />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
