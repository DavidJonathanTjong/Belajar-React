import React from "react";

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };

    this.onSearchChangeEventHandler =
      this.onSearchChangeEventHandler.bind(this);
  }

  onSearchChangeEventHandler(event) {
    this.setState(
      () => {
        return {
          title: event.target.value,
        };
      },
      () => {
        this.props.cariNote(this.state.title);
      }
    );
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Cari catatan"
        value={this.state.title}
        onChange={this.onSearchChangeEventHandler}
        className="note-input__title"
      />
    );
  }
}

export default NoteSearch;
