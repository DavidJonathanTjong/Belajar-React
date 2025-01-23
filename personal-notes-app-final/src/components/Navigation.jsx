import React from "react";
import { Link } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContexts";

function Navigation() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/archives">
                  {locale === "id" ? "Arsip" : "Archive"}
                </Link>
              </li>
              <li>
                <button onClick={toggleLocale} className="toggle-locale">
                  {locale === "id" ? "en" : "id"}
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

export default Navigation;
