import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="404-page">
      <h2>404</h2>
      <p>Page is not found</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}

export default Page404;
