import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      titleLimit: 50,
    };

    this.onJudulChangeEventHandler = this.onJudulChangeEventHandler.bind(this);
    this.onDeskripsiChangeEventHandler =
      this.onDeskripsiChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onJudulChangeEventHandler(event) {
    const inputJudul = event.target.value;
    if (inputJudul.length <= this.state.titleLimit) {
      this.setState(() => {
        return {
          title: inputJudul,
        };
      });
    }
  }

  onDeskripsiChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState({
      title: "",
      body: "",
    });
  }

  render() {
    const char = this.state.titleLimit - this.state.title.length;
    return (
      <form className="note-input" onSubmit={this.onSubmitEventHandler}>
        <p className="note-input__title__char-limit">Sisa karakter: {char}</p>
        <input
          type="text"
          placeholder="Judul"
          value={this.state.title}
          onChange={this.onJudulChangeEventHandler}
          className="note-input__title"
        />
        <textarea
          placeholder="Deskripsi"
          value={this.state.body}
          onChange={this.onDeskripsiChangeEventHandler}
          className="note-input__body"
        />
        <button type="submit">Tambah Catatan</button>
      </form>
    );
  }
}

export default NoteInput;
