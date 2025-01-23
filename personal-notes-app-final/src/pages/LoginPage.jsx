import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NoteLoginInput from "../components/NoteLoginInput";
import { login } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContexts";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="login-page">
            <h2>
              {locale === "id"
                ? "Silakan masuk untuk melanjutkan ..."
                : "Please Login to continue ..."}
            </h2>
            <NoteLoginInput login={onLogin} />
            <p>
              {locale === "id" ? "Belum punya akun?" : "Don't have account?"}{" "}
              <Link to="/register">
                {locale === "id" ? "Daftar di sini" : "Register here"}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
