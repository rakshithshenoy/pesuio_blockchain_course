import React from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="mt-20"></div>
      {props.children}
    </div>
  );
};

export default Layout;
