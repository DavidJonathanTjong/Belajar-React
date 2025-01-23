import React from "react";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import { getArchivedNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContexts";
import SpinnerLoad from "../components/SpinnerLoad";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archiveNotes: [],
      keyword: props.defaultKeyword || "",
      isLoading: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const { data } = await getArchivedNotes();
      this.setState({ archiveNotes: data, isLoading: false });
    } catch (error) {
      console.error("Error loading arsip:", error);
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
    const { isLoading, archiveNotes } = this.state;

    const FilteredArchive = archiveNotes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section>
              <h2>{locale === "id" ? "Catatan Arsip" : "Archive Note"}</h2>
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
                <NoteList notes={FilteredArchive} />
              )}
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;
