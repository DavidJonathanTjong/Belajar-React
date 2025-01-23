import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import { ThemeProvider } from "./contexts/ThemeContexts";
import ToggleTheme from "./components/ToggleTheme";
import { LocaleProvider } from "./contexts/LocaleContexts";
import ToggleLanguage from "./components/ToggleLanguage";
import { FiLogOut } from "react-icons/fi";
import Page404 from "./components/Page404";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  componentDidUpdate(prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <div className="app-container">
              <header>
                <h1>
                  <Link to="/">
                    {this.state.localeContext.locale === "id"
                      ? "Aplikasi Catatan"
                      : "Notes App"}
                  </Link>
                </h1>
                <ToggleTheme />
                <ToggleLanguage />
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {this.state.localeContext.locale === "id"
                    ? "Aplikasi Catatan"
                    : "Notes App"}
                </Link>
              </h1>
              <Navigation />
              <ToggleTheme />
              <button className="button-logout" onClick={this.onLogout}>
                <FiLogOut />
                {this.state.authedUser.name}
              </button>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/notes/new" element={<AddNotePage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default App;
