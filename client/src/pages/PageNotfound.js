import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Link } from "react-router-dom";
export const PageNotfound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title text-center">404</h1>

        <h1 className="pnf-heading text-center">oops! Page Not Found!</h1>

        <Link className="pnf-btn" to="/">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};
