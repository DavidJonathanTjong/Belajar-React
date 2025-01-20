import React from "react";
import { addNote } from "../utils/local-data";
import NoteAdd from "../components/NoteAdd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function addNotePageWrapper() {
  const navigate = useNavigate();
  return <AddNotePage navigate={navigate} />;
}

class AddNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleHandler = this.onTitleHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onInputHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    addNote({ title: this.state.title, body: this.state.body });

    this.props.navigate("/");
  }

  render() {
    return (
      <section>
        <NoteAdd
          titleInput={this.onTitleHandler}
          bodyInput={this.onInputHandler}
          submit={this.onSubmitHandler}
        />
      </section>
    );
  }
}

AddNotePage.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default addNotePageWrapper;
