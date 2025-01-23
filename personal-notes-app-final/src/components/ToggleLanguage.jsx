import { LocaleConsumer } from "../contexts/LocaleContexts";

function ToggleLanguage() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <button onClick={toggleLocale} className="toggle-locale">
            {locale === "id" ? "en" : "id"}
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

export default ToggleLanguage;
