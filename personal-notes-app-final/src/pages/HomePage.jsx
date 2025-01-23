import React from "react";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/network-data";
import { useSearchParams, Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContexts";
import SpinnerLoad from "../components/SpinnerLoad";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNotes: [],
      keyword: props.defaultKeyword || "",
      isLoading: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const { data } = await getActiveNotes();
      this.setState({ activeNotes: data, isLoading: false });
    } catch (error) {
      console.error("Error loading:", error);
      this.setState({ isLoading: false });
    }
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const { isLoading, activeNotes } = this.state;

    const FilteredNotes = activeNotes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section>
              <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
              <NoteSearch
                keyword={this.state.keyword}
                keywordChange={this.onKeywordChangeHandler}
              />
              {isLoading ? (
                <SpinnerLoad
                  loading={isLoading}
                  color="#00FF00"
                  text="Memuat data..."
                />
              ) : (
                <NoteList notes={FilteredNotes} />
              )}
              <div className="homepage__action">
                <button className="action">
                  <Link to={`/notes/new`} className="action">
                    <GrAdd />
                  </Link>
                </button>
              </div>
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
