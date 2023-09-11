import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer} from 'react-toastify';




export const Layout = ({ children, title, author, description, keywords }) => {
  return (
    <div>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>

          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </Helmet>
        ...
      </div>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        
        <ToastContainer/>
        {children}</main>
      <Footer />
    </div>
  );



}

Layout.defaultProps={
  title:'Ecommerce app-Shop now',
  description:'mern stack project',
  keywords:'mern,react,node,mongodb',
  author:'MK'
  
  }
