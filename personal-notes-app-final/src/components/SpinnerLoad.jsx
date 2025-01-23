import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";

function SpinnerLoad({ loading, color, text }) {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <ClipLoader
        color={color || "#00FF00"}
        loading={loading}
        size={150}
        cssOverride={override}
      />
      {text && <p>{text}</p>}
    </div>
  );
}

SpinnerLoad.propTypes = {
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
};

export default SpinnerLoad;
