import React from "react";
import { Link } from "react-router-dom";
import NoteRegisterInput from "../components/NoteRegisterInput";
import { register } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContexts";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section>
            <h2>
              {locale === "id"
                ? "Isi form untuk mendaftarkan akun"
                : "Fill the form to register account"}
            </h2>
            <NoteRegisterInput register={onRegisterHandler} />
            <p>
              {locale === "id"
                ? "Sudah punya akun?"
                : "Already have an account?"}
              <Link to="/">
                {locale === "id" ? "Login disini" : "Login here"}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
