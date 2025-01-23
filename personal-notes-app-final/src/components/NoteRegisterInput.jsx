import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import useInput from "../hooks/useInput";

function NoteRegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [error, setError] = useState("");

  function onSubmitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Password & Confirm Password is different");
      return;
    }
    setError("");
    register({ name, email, password });
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label>Name</label>
      <input type="text" value={name} onChange={onNameChange} required />
      <label>Email</label>
      <input type="email" value={email} onChange={onEmailChange} required />
      <label>Password</label>
      <input
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <label>Confirm Password</label>
      <input
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
NoteRegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default NoteRegisterInput;
