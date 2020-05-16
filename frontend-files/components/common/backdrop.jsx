import React from "react";

import classes from "./backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div
      onClick={props.clicked}
      className={
        props.isMobile
          ? [classes.backdrop, classes.open].join(" ")
          : classes.backdrop
      }
    ></div>
  );
};

export default Backdrop;
